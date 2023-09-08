import "./index.css"
import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect} from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import {useParams} from "react-router-dom";
import locationJSON from "../data/map.json";
function LocationBased(){
    let { location_name } = useParams();
    const desiredLocationName = location_name;
    let geoDataForLocationName;
    let positions = {
        lat: 0,
        lng: 0
    }
    for (const data of locationJSON) {
        const location = data.locations.find(location => location.LocationName === desiredLocationName);
        if (location) {
            geoDataForLocationName = location.geoData;
            break;
        }
    }
    const targetLocation = { lat: geoDataForLocationName.map(latlng => latlng.lat), lng: geoDataForLocationName.map(latlng => latlng.lng) }; // Beispielkoordinaten
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${targetLocation.lat},${targetLocation.lng}`;
        window.open(url, '_blank');
    };



    useEffect(() => {
        function getCoordinates(coords){
            if(coords) {
                console.log("hier",coords)
                return coords
            }
            else{
                const {lng,lat} = positions;
                const amount = 0.005
                return {lat: lat - amount,lng}
            }
        }
        function main() {
            const canvas = document.getElementById('canvas1');
            if(canvas != null){


            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
            const renderer = new THREE.WebGLRenderer({canvas: canvas});

            const arjs = new THREEx.LocationBased(scene, camera);
            const cam = new THREEx.WebcamRenderer(renderer);

            const geom = new THREE.BoxGeometry(200, 200, 200);
            const mtl = new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            });
            const box = new THREE.Mesh(geom, mtl);
            const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

            navigator.geolocation.getCurrentPosition((positions) => {
                getCoordinates(positions.coords)
                arjs.add(box, positions.coords.longitude, positions.coords.latitude - 0.005);
                arjs.startGps()
            })

            requestAnimationFrame(render);

            function render() {
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
            }

            const successCallback = (position) => {
                positions.lat = position.coords.latitude;
                positions.lng = position.coords.longitude;
            };


            const errorCallback = (error) => {
                console.log(error);
            };
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

        }


        main();
    })

    return(
        <main className={"container"}>
            {
                targetLocation.lng[0] === targetLocation.lng[0] ? <>  <canvas id='canvas1' style={{backgroundColor: "black", height: "100vh", width: "100%"}}></canvas>
                    <Navbar/></>: <button onClick={openGoogleMaps}>Zu Google Maps</button>
            }


        </main>
    )
}

export default LocationBased