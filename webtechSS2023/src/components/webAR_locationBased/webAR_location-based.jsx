import './style.css'
import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect, useState} from "react";

function WebARLocation() {
    const [state, setState] = useState({longitute: 0, latitude: 0})
    const [click, setClick] = useState(false);

    function main() {
        navigator.geolocation.getCurrentPosition((position) => {
            const {longitude,latitude} = position.coords
            setState({longitute: longitude, latitude: latitude});
        });


        const canvas = document.getElementById('canvas1');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
        const renderer = new THREE.WebGLRenderer({canvas: canvas});


        const arjs = new THREEx.LocationBased(scene, camera);
        const cam = new THREEx.WebcamRenderer(renderer);

        const geom = new THREE.BoxGeometry(20, 20, 20);
        const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
        const box = new THREE.Mesh(geom, mtl);

        const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

        arjs.add(box, state.latitude, state.longitute - 0.05);

        arjs.startGps();

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
        const rotationStep = THREE.MathUtils.degToRad(2);


    }

    function init(){
        setClick(current => !current);
        setTimeout(()=>{
            main()
        },500)
    }

    return (
            <>
                <button onClick={init}>Start</button>
                {click && <canvas id='canvas1'/>}
                {`latitude:` + state.latitude + `  lng: ` + state.longitute }
            </>
    )

}

export default WebARLocation
