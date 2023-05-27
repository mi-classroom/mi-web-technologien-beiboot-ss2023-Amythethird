import './index.css'
import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import Navbar from "../components/navbar/Navbar.jsx";
import {useEffect, useState} from "react";



function WebARLocation() {
    const [canvasEL, setCanvas] = useState(null);
    const [hasLoaded, setLoaded] = useState(false)
    const [gpsPlace, setGPS] = useState({lon:0, lat:0})
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);
    const geometry = new THREE.BoxGeometry(100,100,100);
    const material = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity:0.7,
        side: THREE.DoubleSide
    });
    const box = new THREE.Mesh(geometry, material);
    let cam = null
    const [renderer, setRenderer] = useState(null)
    //const [sound, setSound] = useState(getSound('audio1.mp3'))
    const arjs = new THREEx.LocationBased(scene, camera);
    let [visible, setVisible] = useState(false)

    arjs.on('gpsupdate',position => {
        updatePosition(position)
    })

    useEffect(() => {
       setCanvas(document.getElementById('canvas1'));
        const fetchData = async()=> {
            setLoaded(current => !current)
            setRenderer(new THREE.WebGLRenderer({canvas: canvasEL}))
            cam = new THREEx.WebcamRenderer(renderer);
            await handlePermission()
            requestAnimationFrame(render);
            setLoaded(current => !current)
        }
        fetchData()
    }, []);

    async function handlePermission(){
        const result = await navigator.permissions.query({name:'geolocation'})
        if(result.state === 'prompt' || result.state === 'granted') {
            navigator.geolocation.getCurrentPosition((position) => {
                updatePosition(position)
                arjs.add(box,gpsPlace.longitute, gpsPlace.latitude + 0.005);
                arjs.startGps()
            })
        }
        else console.log('DENIED');
    }

    function updatePosition(position){
        const {longitude,latitude} = position.coords
        setGPS({lon: longitude, lat: latitude})
    }

    function render() {
        const canvas = canvasEL;
        const {clientWidth,clientHeight} = document.body
        if(!!canvas && (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight)) {
            canvas.width = clientWidth
            canvas.height = clientHeight
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        deviceOrientationControls.update();
        cam.update();
        renderer.render(scene, camera);
        setVisible(box.visible)  ;
        //onSceneChange(sound.value,false)
        requestAnimationFrame(render);
    }

    return (
        <>
            <div className={"marker"} id={"marker"}>
                <canvas id='canvas1' style={{backgroundColor: "black", height: "100vh", width: "100%"}}></canvas>
            </div>
            <Navbar/>
        </>
    )
}

export default WebARLocation
