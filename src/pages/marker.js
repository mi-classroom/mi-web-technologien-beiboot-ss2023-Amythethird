/* Marker Based */
import * as THREE from "three";
import {ArMarkerControls, ArToolkitContext, ArToolkitSource} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const sound = playAudio();
scene.add(camera)

// Initialisere den renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true
});

//platziere den renderer
document.body.appendChild( renderer.domElement );
// bestimme die größe der Canvas
renderer.setSize( window.innerWidth, window.innerHeight );

var arToolkitSource = new ArToolkitSource({
    sourceType: "webcam",
});

arToolkitSource.init(function (){
    setTimeout(function (){
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement)
    }, 2000)
});

var arToolkitContext = new ArToolkitContext({
    cameraParametersUrl: "camera_para.dat",
    detectionMode: "color_and_matrix",
});
arToolkitContext.init(function (){
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

var arMarkerControls = new ArMarkerControls(arToolkitContext, camera,
    {
        type: "pattern",
        patternUrl: "pattern-marker.patt",
        changeMatrixMode: "cameraTransformMatrix",
    });


scene.visible = false;

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshNormalMaterial( {
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide

});
const cube = new THREE.Mesh( geometry, material );

const canvas = renderer.domElement;

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enabled = false; // Deaktiviere OrbitControls für AR-Szene

cube.position.y = geometry.parameters.height / 2 ;
scene.add( cube );

canvas.addEventListener("touchstart", function (event) {
    event.preventDefault();
    let dropdown = document.getElementById("dropdown")
    if (event.touches.length === 1) {
        if(scene.visible){
            dropdown.classList.remove("hide")
        }else {
            dropdown.classList.add("hide")
        }
    } else if (event.touches.length === 2) {
        console.log("twofinger")
    }
}, false);

function animate() {
    requestAnimationFrame( animate );
    arToolkitContext.update(arToolkitSource.domElement);
    scene.visible = camera.visible;
    renderer.render( scene, camera );

}
export function stop(){
    sound.stop()
}
export function pause(){
    sound.pause()
}
export function play(){
    sound.play()
}
export function volumeDown(){
    sound.setVolume(0.00);
}

animate();
export function playAudio(){
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./sound.mp3", function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
    });
    return sound
}

export function reShape(type){
    let model;
    cube.geometry.dispose();
    const loader = new GLTFLoader();
    if(type === "Sphere"){
        scene.remove(model)
       cube.geometry = new THREE.SphereGeometry();
   }
    else if (type === "Auswahl"){
        scene.remove(model)
        cube.geometry =  new THREE.BoxGeometry( 2, 2, 2 );
    }
   else if(type === "Herz"){
        scene.remove(model)
       const heartShape = new THREE.Shape();
       const x = 0, y = 0;
       const scaleFactor = 0.1; // Skalierungsfaktor für die Verkleinerung
       heartShape.moveTo( x + 5 * scaleFactor, -1 * (y + 5 * scaleFactor) );
       heartShape.bezierCurveTo( x + 5 * scaleFactor, -1 * (y + 5 * scaleFactor), x + 4 * scaleFactor, -1 * y, x, -1 * y );
       heartShape.bezierCurveTo( x - 6 * scaleFactor, -1 * y, x - 6 * scaleFactor, -1 * (y + 7 * scaleFactor), x - 6 * scaleFactor, -1 * (y + 7 * scaleFactor) );
       heartShape.bezierCurveTo( x - 6 * scaleFactor, -1 * (y + 11 * scaleFactor), x - 3 * scaleFactor, -1 * (y + 15.4 * scaleFactor), x + 5 * scaleFactor, -1 * (y + 19 * scaleFactor) );
       heartShape.bezierCurveTo( x + 12 * scaleFactor, -1 * (y + 15.4 * scaleFactor), x + 16 * scaleFactor, -1 * (y + 11 * scaleFactor), x + 16 * scaleFactor, -1 * (y + 7 * scaleFactor) );
       heartShape.bezierCurveTo( x + 16 * scaleFactor, -1 * (y + 7 * scaleFactor), x + 16 * scaleFactor, -1 * y, x + 10 * scaleFactor, -1 * y );
       heartShape.bezierCurveTo( x + 7 * scaleFactor, -1 * y, x + 5 * scaleFactor, -1 * (y + 5 * scaleFactor), x + 5 * scaleFactor, -1 * (y + 5 * scaleFactor) );
       cube.geometry = new THREE.ShapeGeometry( heartShape );
   }
   else if (type === "3D"){
        if (cube.parent === scene) {
            scene.remove(cube);
        } else {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
        }
        loader.load(
            './magnemite/SheenChair.glb',
            function (gltf) {
                model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5); // Skalierung anpassen (hier: halbe Größe)
                scene.add(model);
                orbitControls.target.copy(model.position); // Setze das Orbit-Steuerungsziel auf die Position des Modells
                orbitControls.update();
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened', error);
            }
        );
   }
}
