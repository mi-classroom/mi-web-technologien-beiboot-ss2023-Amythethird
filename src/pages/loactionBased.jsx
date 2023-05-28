import "./index.css"
import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect} from "react";
import Navbar from "../components/navbar/Navbar.jsx";
function LocationBased(){
    useEffect(() => {
        function main() {
            const canvas = document.getElementById('canvas1');

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
            const renderer = new THREE.WebGLRenderer({canvas: canvas});

            const arjs = new THREEx.LocationBased(scene, camera);
            const cam = new THREEx.WebcamRenderer(renderer);

            const geom = new THREE.BoxGeometry(200, 200, 200);
            const mtl = new THREE.MeshNormalMaterial({
                transparent: true,
                opacity:0.7,
                side: THREE.DoubleSide
            });
            const box = new THREE.Mesh(geom, mtl);
            const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);


            navigator.geolocation.getCurrentPosition((position) => {
                arjs.add(box,position.coords.longitude, position.coords.latitude + 0.005);
                arjs.startGps()
            })

            requestAnimationFrame(render);
            function render() {
                if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
                    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
                    const aspect = canvas.clientWidth/canvas.clientHeight;
                    camera.aspect = aspect;
                    camera.updateProjectionMatrix();
                }
                deviceOrientationControls.update();
                cam.update();
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }
        }

        main();
    })

    return(
        <main className={"container"}>
            <canvas id='canvas1' style={{backgroundColor: "black", height: "100vh", width: "100%"}}></canvas>
            <Navbar/>
        </main>
    )
}

export default LocationBased