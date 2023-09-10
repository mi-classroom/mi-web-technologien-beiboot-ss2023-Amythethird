import "./index.css"
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import locationJSON from "../data/map.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCirclePlay, faCube, faLocationCrosshairs, faLocationPinLock} from "@fortawesome/free-solid-svg-icons";
import * as THREE from "three";
import {marker} from "./marker.js";


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
    const [close, setClose] = useState(false)
    const [locationBased, setLocationBased] = useState(true)
    const closeSidebar = () => {
        setClose(current => !current)
    }
    marker()

    return(
        <main className={"location_based"}>
            {
                targetLocation.lng[0] === targetLocation.lng[0] ?
                    <>
                        {
                            close ?
                                <div className={"sideNav"}>
                                    <button type="button" className={"btn "} onClick={closeSidebar} >
                                        <FontAwesomeIcon icon={faBars} size={"lg"} style={{color: "#0080c0"}} />
                                    </button>
                                    <ul>
                                        <li>
                                            <a href={"#"} aria-label={"Start"} >
                                                <FontAwesomeIcon
                                                    icon={faCirclePlay}
                                                    size={"lg"}
                                                    style={{color: "#0080c0"}}
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"#"} aria-label={"Models"} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" >
                                                <FontAwesomeIcon
                                                    icon={faCube}
                                                    size={"lg"}
                                                    style={{color: "#0080c0"}}
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"#"} aria-label={"Models"} onClick={() => setLocationBased(true)}  >
                                                <FontAwesomeIcon
                                                    icon={faLocationCrosshairs}
                                                    size={"lg"}
                                                    style={{color: "#0080c0"}}
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"#"} aria-label={"Models"} onClick={() => setLocationBased(false)}  >
                                                <FontAwesomeIcon
                                                    icon={faLocationPinLock}
                                                    size={"lg"}
                                                    style={{color: "#0080c0"}}
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div> :
                                <button type="button" onClick={closeSidebar} className={"btn  position-absolute left-0"}><FontAwesomeIcon icon={faBars} size={"lg"} style={{color: "#0080c0"}} /></button>
                        }
                        {locationBased ?
                            <canvas id='canvas1' style={{backgroundColor: "black", height: "100vh", width: "100%"}}></canvas> :
                            <div className={"container marker"}></div>
                        }
                        <div style={{minHeight: "120px", position: "absolute", left: "20%", top: "12%"}}>
                            <div className={"collapse collapse-horizontal"} id={"collapseWidthExample"}>
                                <div className={"card card-body"} style={{width: "300px"}}>
                                    <div className="list-group">
                                        <a href="#" className="list-group-item list-group-item-action "
                                           aria-current="false" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                                            The current link item
                                        </a>
                                        <a href="#" className="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">A second link
                                            item</a>
                                        <a href="#" className="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">A third link
                                            item</a>
                                        <a href="#" className="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">A fourth link
                                            item</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <button onClick={openGoogleMaps}>Zu Google Maps</button>
            }


        </main>
    )
}

export default LocationBased