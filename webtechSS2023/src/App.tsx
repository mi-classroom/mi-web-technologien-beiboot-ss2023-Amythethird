import './App.css'
// @ts-ignore
import { ArToolkitSource, ArToolkitContext, ArMarkerControls} from '@ar-js-org/ar.js/three.js/build/ar-threex.js';
// @ts-ignore
import * as THREE from 'three';
import {useEffect} from "react";

function App() {
    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    // @ts-ignore
    let renderer = null
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity:0.5,
        side: THREE.DoubleSide
    });

    const cube = new THREE.Mesh(geometry, material);
    const arToolkitSrc = new ArToolkitSource({
        sourceType: 'webcam'
    })
    const arToolkitCtx = new ArToolkitContext({
        cameraParametersUrl: 'src/assets/data/camera_para.dat',
        detectionMode: 'color_and_matrix',
    })
    new ArMarkerControls(arToolkitCtx,camera,{
        type:'pattern',
        patternUrl:'src/assets/data/marker.patt',
        changeMatrixMode:'cameraTransformMatrix'
    })

    function animate() {
        requestAnimationFrame(animate);
        arToolkitCtx.update(arToolkitSrc.domElement)
        scene.visible = camera.visible
        // @ts-ignore
        renderer.render(scene,camera);
    }

    useEffect(() => {
        renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:true
        });
        cube.position.y = geometry.parameters.height / 2
        scene.visible = false
        arToolkitSrc.init(() => {
            setTimeout(() => {
                arToolkitSrc.onResizeElement()
                // @ts-ignore
                arToolkitSrc.copyElementSizeTo(renderer.domElement)
            },2000)
        })
        arToolkitCtx.init(function onCompleted() {
            camera.projectionMatrix.copy(arToolkitCtx.getProjectionMatrix());
        });
        scene.add(camera)
        scene.add(cube);
        animate()
    })

    return (
       <div>

       </div>
    )
}
export default App
