import "./index.css"
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import locationJSON from "../data/map.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCirclePlay,
    faCube,
    faLocationCrosshairs,
    faLocationPinLock,
    faCode
} from "@fortawesome/free-solid-svg-icons";
import * as THREE from "three";
import playAlpha from "/icons/playAlpha.png"
import pauseAlpha from "/icons/pauseAlpha.png"
import Arlebnis from "./ARLebnis/arlebnis.jsx";

function LocationBased() {
    let {location_name} = useParams();
    let canvas;
    let scene;
    let camera;
    let renderer;
    let arjs;
    let playButton;
    let setup;

    const desiredLocationName = location_name;
    let geoDataForLocationName;
    let location;
    let mesh;
    let cam;
    let deviceOrientationControls;
    let positions = {
        lat: 0,
        lng: 0
    }
    const [close, setClose] = useState(false)
    const [locationBased, setLocationBased] = useState(true)
    const [development, setDev] = useState(false)
    const RAYCASTER = new THREE.Raycaster();
    const MOUSE = new THREE.Vector2();
    let videoElement;
    let audioElement;

    for (const data of locationJSON) {
        location = data.locations.find(location => location.LocationName === desiredLocationName);
        if (location) {
            geoDataForLocationName = location.geoData;
            break;
        }
    }
    const targetLocation = {
        lat: geoDataForLocationName.map(latlng => latlng.lat),
        lng: geoDataForLocationName.map(latlng => latlng.lng)
    }; // Beispielkoordinaten
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${targetLocation.lat},${targetLocation.lng}`;
        window.open(url, '_blank');
    };

    let getBtnTexture = (isPlaying) => {
        return new THREE.MeshBasicMaterial({
            color: 0xffffff,
            alphaMap: new THREE.TextureLoader().load(isPlaying ? pauseAlpha : playAlpha),
            alphaTest: 0.3,
            side: THREE.DoubleSide
        })
    }
    let canvasClick = (clickEvent) => {
        clickEvent.preventDefault();
        MOUSE.x = (clickEvent.clientX / renderer.domElement.clientWidth) * 2 - 1;
        MOUSE.y = -(clickEvent.clientY / renderer.domElement.clientHeight) * 2 + 1;
        RAYCASTER.setFromCamera(MOUSE, camera);
        const intersects = RAYCASTER.intersectObjects(scene.children);
        if (intersects.length > 0 && 'callback' in intersects[0].object) {
            intersects[0].object.callback()
        }
    }
    let canPlay = () => {
        playButton = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), getBtnTexture(false));
        mesh.add(playButton)
        mesh.renderOrder = 0;
        playButton.renderOrder = 1;
        playButton.isPlaying = false

        playButton.callback = () => {
            [videoElement, audioElement].forEach(el => {
                if (el) {
                    if (playButton.isPlaying) el.pause()
                    else el.play()
                }
            })
            playButton.isPlaying = !playButton.isPlaying
            playButton.material = getBtnTexture(playButton.isPlaying)
        }

        playButton.scale.multiply(new THREE.Vector3(-1, -1, -1))
        playButton.position.y = -200
        playButton.position.z = -1
        main()
    }
    let setMesh = (event) => {
        if ("video" in event) {
            videoElement = document.createElement('video');
            videoElement.src = event.video;
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true;
            document.querySelector('.video').appendChild(videoElement);
            videoElement.setAttribute("crossOrigin", "anonymous")

            videoElement.oncanplay = () => {
                const videoTexture = new THREE.VideoTexture(videoElement);
                videoTexture.minFilter = THREE.LinearFilter
                videoTexture.magFilter = THREE.LinearFilter
                videoTexture.colorSpace = THREE.SRGBColorSpace;

                const width = videoElement.videoWidth
                const height = videoElement.videoHeight

                const aspectRatio = width / height
                const size = 250;
                const mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: videoTexture});
                const geometry = new THREE.PlaneGeometry(size * aspectRatio, size, 1.0)

                mat.side = THREE.DoubleSide
                const video = new THREE.Mesh(geometry, mat);
                mesh = video
                canPlay()
            };
        }
        if ("audio" in event) {
            audioElement = document.createElement('audio');
            audioElement.src = event.audio;
            audioElement.preload = "auto";
            audioElement.loop = true;
            document.querySelector('.video').appendChild(audioElement);
            audioElement.setAttribute("crossOrigin", "anonymous")

            audioElement.oncanplay = () => {
                const size = 250;
                const mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
                const geometry = new THREE.PlaneGeometry(size, size, 1.0)
                mesh = new THREE.Mesh(geometry, mat);
                canPlay()
            };
        }
    }
    function main() {
        canvas = document.getElementById('canvas1');
        canvas.addEventListener("click", canvasClick)
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
        renderer = new THREE.WebGLRenderer({canvas: canvas});
        arjs = new THREEx.LocationBased(scene, camera);
        cam = new THREEx.WebcamRenderer(renderer);
        deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);
        arjs.add(mesh, positions.lng, positions.lat + 0.005);
        arjs.startGps()
        requestAnimationFrame(render);
    }

    useEffect(() => {
            const successCallback = (position) => {
                positions.lat = position.coords.latitude;
                positions.lng = position.coords.longitude;
            };
            const errorCallback = (error) => {
                console.error(error);
            };
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            console.log(positions)
    }, )

    function render() {
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
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
    return (
        <main className={"location_based container-fluid d-flex flex-row"}>
            <div className={"col-2"}>
                {
                    close ?
                        <div className={`sideNav ${close ? "close" : ""}`}>
                            <button type="button" className={"btn "} onClick={() => setClose(current => !current)}>
                                <FontAwesomeIcon icon={faBars} size={"lg"} style={{color: "#0080c0"}}/>
                            </button>
                            <ul>
                                <li>
                                    <a href={"#"} aria-label={"Start"}>
                                        <FontAwesomeIcon
                                            icon={faCirclePlay}
                                            size={"lg"}
                                            style={{color: "#0080c0"}}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href={"#"} aria-label={"Models"} data-bs-toggle="collapse"
                                       data-bs-target="#collapseWidthExample" aria-expanded="false"
                                       aria-controls="collapseWidthExample">
                                        <FontAwesomeIcon
                                            icon={faCube}
                                            size={"lg"}
                                            style={{color: "#0080c0"}}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a aria-label={"Models"} onClick={() => setLocationBased(true)}>
                                        <FontAwesomeIcon
                                            icon={faLocationCrosshairs}
                                            size={"lg"}
                                            style={{color: "#0080c0"}}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a aria-label={"Models"} onClick={() => setLocationBased(false)}>
                                        <FontAwesomeIcon
                                            icon={faLocationPinLock}
                                            size={"lg"}
                                            style={{color: "#0080c0"}}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a aria-label={"Models"} onClick={() => setDev(current => !current)}>
                                        {
                                            development ? <FontAwesomeIcon icon={faCirclePlay}
                                                                           size={"lg"}
                                                                           style={{color: "#0080c0"}}
                                                /> :
                                                <>
                                                    <FontAwesomeIcon icon={faCode}
                                                                     size={"lg"}
                                                                     style={{color: "#0080c0"}}
                                                    />
                                                </>

                                        }

                                    </a>
                                </li>
                            </ul>
                        </div> :
                        <button type="button" onClick={() => setClose(current => !current)}
                                className={"btn align-self-start"}><FontAwesomeIcon icon={faBars}
                                                                                    size={"lg"}
                                                                                    style={{color: "#0080c0"}}/>
                        </button>
                }
            </div>
            <div id="liveAlertPlaceholder"></div>
            <div className={"col-10 align-self-center"}>
                {
                    development ?
                        <>
                            {locationBased ?
                                <>
                                    <canvas id='canvas1' style={{backgroundColor: "black", height: "100vh", width: "100%"}}></canvas>
                                    <div className={"d-none video"}>
                                    </div>
                                </>
                                : <h1></h1>
                            }
                            <div style={{minHeight: "120px", position: "absolute", left: "20%", top: "12%"}}>
                                <div className={"collapse collapse-horizontal"} id={"collapseWidthExample"}>
                                    <div className={"card card-body"} style={{width: "300px", textAlign: "left"}}>
                                        <div className="list-group">
                                            {
                                                location.event.map((e, i) => (
                                                    <a key={i} href="#"
                                                       className="list-group-item list-group-item-action "
                                                       aria-current="false" data-bs-toggle="collapse"
                                                       data-bs-target="#collapseWidthExample" aria-expanded="false"
                                                       aria-controls="collapseWidthExample"
                                                       onClick={() => setMesh(e.media)}>
                                                        {e.name}
                                                    </a>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <button type="button" onClick={openGoogleMaps} className="btn btn-secondary btn-sm">Öffne Maps</button>
                        </>
                }
            </div>
        </main>
    )
}


export default LocationBased