import  { useEffect, useRef } from "react";
import * as THREE from "three";
import {ArMarkerControls, ArToolkitContext, ArToolkitSource} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function Renderer(){

    const markerBased = (containerRef) =>{
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            1.33,
            0.1,
            10000
        );
        scene.add(camera)
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            canvas: containerRef,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        var arToolkitSource = new ArToolkitSource({
            sourceType: "webcam",
        });
        arToolkitSource.init(function () {
            setTimeout(function () {
                arToolkitSource.onResizeElement();
                arToolkitSource.copyElementSizeTo(renderer.domElement)
            }, 2000)
        });
        var arToolkitContext = new ArToolkitContext({
            cameraParametersUrl: "/models/camera_para.dat",
            detectionMode: "color_and_matrix",
            debug: true,
            matrixCodeType: '3x3',
            // Pattern ratio for custom markers
            patternRatio: 0.5,
            // Labeling mode for markers - ['black_region', 'white_region']
            // black_region: Black bordered markers on a white background, white_region: White bordered markers on a black background
            labelingMode: 'black_region',
            // tune the maximum rate of pose detection in the source image
            maxDetectionRate: 60,
            // resolution of at which we detect pose in the source image
            canvasWidth: 640,
            canvasHeight: 480,

            // enable image smoothing or not for canvas copy - default to true
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
            imageSmoothingEnabled : true,
        });
        arToolkitContext.init(function () {
            camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        });

        var arMarkerControls = new ArMarkerControls(arToolkitContext, camera,
            {
                type: "pattern",
                patternUrl: "/models/pattern-marker.patt",
                changeMatrixMode: "cameraTransformMatrix",
                size: 1,
                // turn on/off camera smoothing
                smooth: true,
                // number of matrices to smooth tracking over, more = smoother but slower follow
                smoothCount: 5,
                // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
                smoothTolerance: 0.01,
                // threshold for smoothing, will keep still unless enough matrices are over tolerance
                smoothThreshold: 2
            });

        scene.visible = false;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide

        });
        const cube = new THREE.Mesh(geometry, material);
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enabled = false; // Deaktiviere OrbitControls für AR-Szene

        cube.position.y = geometry.parameters.height / 2;

        scene.add(cube);
        const animate = () => {
            arToolkitContext.update(arToolkitSource.domElement);
            scene.visible = camera.visible;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }
    useEffect(() => {
        const containerRef = document.querySelector('.marker');
        markerBased(containerRef)

    }, []);

    return(
        <canvas className={"marker"} ></canvas>
    )
}

export default Renderer