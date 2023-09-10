import * as THREE from "three";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

    let canvas = document.getElementById('canvas1');
    let scene ;
    let camera;
    let renderer;
    let deviceOrientationControls
    let cam;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    const arjs = new THREEx.LocationBased(scene, camera);
    cam = new THREEx.WebcamRenderer(renderer);

    const geom = new THREE.BoxGeometry(200, 200, 200);
    const mtl = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    const box = new THREE.Mesh(geom, mtl);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);
    let positions = {
        lat: 0,
        lng: 0
    }
    navigator.geolocation.getCurrentPosition((positions) => {
        //getCoordinates(positions.coords)
        arjs.add(box, positions.coords.longitude, positions.coords.latitude + 0.005);
        arjs.startGps()
    })

    const successCallback = (position) => {
        positions.lat = position.coords.latitude;
        positions.lng = position.coords.longitude;
    };
    const errorCallback = (error) => {
        console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)


    export function render() {
      if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
          renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
          const aspect = canvas.clientWidth / canvas.clientHeight;
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
      }
      deviceOrientationControls.update();
      cam.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);

    }