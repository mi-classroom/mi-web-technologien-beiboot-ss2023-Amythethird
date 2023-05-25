/* Marker Based */

import * as THREE from "three";
import {ArMarkerControls, ArToolkitContext, ArToolkitSource} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";


const scene = new THREE.Scene();
const camera = new THREE.Camera();
const sound = playAudio();


scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true
});


renderer.setSize( window.innerWidth, window.innerHeight );


window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("marker").appendChild( renderer.domElement );
});

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

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial( {
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide

});
const cube = new THREE.Mesh( geometry, material );
cube.position.y = geometry.parameters.height / 2 ;

scene.add( cube );


function animate() {
    requestAnimationFrame( animate );
    arToolkitContext.update(arToolkitSource.domElement);
    scene.visible = camera.visible;
    renderer.render( scene, camera );
    if(!scene.visible){
        sound.pause();
    }else
    {
        sound.play()
    }
}

animate();


function playAudio(){
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