import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect} from "react";

function main() {
    const gpsPlace = {longitute: 0, latitude: 0};
    navigator.geolocation.getCurrentPosition((position) => {
        const {longitude,latitude} = position.coords
        gpsPlace.longitute = longitude
        gpsPlace.latitude = latitude
    });

    const canvas = document.getElementById('canvas1');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    console.log(canvas)

    const arjs = new THREEx.LocationBased(scene, camera);
    const cam = new THREEx.WebcamRenderer(renderer);

    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
    const box = new THREE.Mesh(geom, mtl);

    const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

    arjs.add(box, gpsPlace.latitude, gpsPlace.longitute -0.005);


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

main();


