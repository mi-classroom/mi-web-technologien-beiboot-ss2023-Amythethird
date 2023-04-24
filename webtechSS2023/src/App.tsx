import './App.css'
import React, {useState} from "react";
import { ArToolkitProfile, ArToolkitSource, ArToolkitContext, ArMarkerControls} from 'arjs/three.js/build/ar-threex.js';
import * as THREE from 'three';

function App() {
    const [cameraOn, setCameraOn] = useState(false);
    function openCamera(){
        setCameraOn(current => !current)
    }


    return (
       <main className={"container-lg"}>
           <a-scene
               vr-mode-ui="enabled: false"
               embedded
               arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
               <a-entity gltf-model="assets/magnemite/magnemite/scene.gltf" rotation="0 180 0" scale="0.15 0.15 0.15" gps-entity-place="longitude: 12.489820; latitude: 41.892590;" animation-mixer/>
               <a-camera gps-camera rotation-reader></a-camera>
           </a-scene>
           {/*<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
               Close
           </button>

           <div className="offcanvas offcanvas-start show" tabIndex="1" id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel">
               <div className="offcanvas-header">
                   <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                   <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
               </div>
               <div className="offcanvas-body">
                   <div>
                       Some text as placeholder. In real life you can have the elements you have chosen. Like, text,
                       images, lists, etc.
                   </div>
                   <div className="dropdown mt-3">
                       <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                           Dropdown button
                       </button>
                       <ul className="dropdown-menu">
                           <li><a className="dropdown-item" href="#">Action</a></li>
                           <li><a className="dropdown-item" href="#">Another action</a></li>
                           <li><a className="dropdown-item" href="#">Something else here</a></li>
                       </ul>
                   </div>
               </div>
           </div>*/}
           <button className="btn btn-primary" type="button" data-bs-toggle=""
                   data-bs-target="" aria-controls="">
               Open Kamera
           </button>



       </main>
    )
}
export default App
