import { ArToolkitSource, ArToolkitContext, ArMarkerControls} from '@ar-js-org/ar.js/three.js/build/ar-threex.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.Camera();

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true
});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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
    opacity: 0.5,
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
}
animate();