import "./index.css"
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import locationJSON from "../data/map.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCirclePlay, faCube, faLocationCrosshairs, faLocationPinLock} from "@fortawesome/free-solid-svg-icons";
import * as THREE from "three";
import {marker} from "./marker.js"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {ArMarkerControls, ArToolkitContext, ArToolkitSource} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";



function LocationBased(){
    let { location_name } = useParams();
    const desiredLocationName = location_name;
    let geoDataForLocationName;
    let location;
    let events;
    let positions = {
        lat: 0,
        lng: 0
    }
    const [event, setEvent] = useState("")
    const [close, setClose] = useState(false)
    const [locationBased, setLocationBased] = useState(true)
    for (const data of locationJSON) {
        location = data.locations.find(location => location.LocationName === desiredLocationName);
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
    let videoEvent = () =>{
        if(event === "video") {
            const videoElement = document.createElement('video');
            videoElement.src = 'pfad/zum/deinem/video.mp4';
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true;

            const videoTexture = new THREE.VideoTexture(videoElement);
            const geometry = new THREE.PlaneGeometry(2, 1.5); // Ändere die Größe nach Bedarf
            const material = new THREE.MeshBasicMaterial({map: videoTexture});
            const plane = new THREE.Mesh(geometry, material);

            return plane
        }else if(event === "audio"){
            const geom = new THREE.BoxGeometry(200, 200, 200);
            const mtl = new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            });

            // Meshe´s
            const box = new THREE.Mesh(geom, mtl);
            return box
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


            const orbitControls = new OrbitControls(camera, renderer.domElement);
            const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

            navigator.geolocation.getCurrentPosition((positions) => {
                //getCoordinates(positions.coords)
                arjs.add(videoEvent(), positions.coords.longitude, positions.coords.latitude + 0.005);
                arjs.startGps()
            })
            // eslint-disable-next-line no-inner-declarations

            requestAnimationFrame(render);
                canvas.addEventListener("touchstart", () => {
            })
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
    useEffect(() => {
        if(!locationBased) marker()
        main();
    })
    const closeSidebar = () => {
        setClose(current => !current)
    }

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
                                            <a  aria-label={"Models"} onClick={() => setLocationBased(true)}  >
                                                <FontAwesomeIcon
                                                    icon={faLocationCrosshairs}
                                                    size={"lg"}
                                                    style={{color: "#0080c0"}}
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a aria-label={"Models"} onClick={() => setLocationBased(false)}  >
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
                            <>
                                <canvas id='canvas1' style={{backgroundColor: "black", height: "100vh", width: "100%"}}></canvas>

                            </>
                            :
                            <div className={"container marker"}></div>
                        }
                        <div style={{minHeight: "120px", position: "absolute", left: "20%", top: "12%"}}>
                            <div className={"collapse collapse-horizontal"} id={"collapseWidthExample"}>
                                <div className={"card card-body"} style={{width: "300px", textAlign: "left"}}>
                                    <div className="list-group">
                                        {location.map((location, locationIndex) => (
                                            <div key={locationIndex}>
                                                <h2>{location.LocationName}</h2>

                                                {/* Video */}
                                                {location.event && location.event.video && (
                                                    <video controls>
                                                        <source src={location.event.video.src} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}

                                                {/* Audio */}
                                                {location.event && location.event.audio && (
                                                    <audio controls>
                                                        <source src={location.event.audio.src} type="audio/mpeg" />
                                                        Your browser does not support the audio tag.
                                                    </audio>
                                                )}

                                                {/* Images */}
                                                {location.event && location.event.images && location.event.images.src.length > 0 && (
                                                    <div>
                                                        {location.event.images.src.map((imageSrc, imgIndex) => (
                                                            <img key={imgIndex} src={imageSrc} alt={`Image ${imgIndex}`} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {/*<a key={i} href="#" className="list-group-item list-group-item-action "
                                            aria-current="false" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" >
                                            {e.video}
                                        </a>*/}
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