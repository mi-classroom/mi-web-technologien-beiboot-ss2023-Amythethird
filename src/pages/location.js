import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
const fov = 45
const aspect = 2 // the canvas default
const near = 5
const far = 100

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far);


const arjs = new THREEx.LocationBased(scene, camera);


const geom = new THREE.BoxGeometry(100, 100, 100);
const mtl = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity:0.7,
    side: THREE.DoubleSide
});
const box = new THREE.Mesh(geom, mtl);

 function main(latitude, longitute) {
    const canvas = document.getElementById('canvas1');
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    const cam = new THREEx.WebcamRenderer(renderer);
    // Change this to a location 0.001 degrees of latitude north of you, so that you will face it
    console.log(latitude, longitute)
    arjs.add(box, longitute, latitude -0.005);
    // Start the GPS
    arjs.startGps();
    console.log(scene)
    requestAnimationFrame(render);

    function render() {
        if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            const aspect = canvas.clientWidth/canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }
        cam.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

}


