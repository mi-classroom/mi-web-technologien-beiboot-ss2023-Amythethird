import './App.css'
import { Box, Text, Scene, MarkerCamera } from "react-aframe-ar";


function App() {

    return (
        <a-scene embedded arjs>
            <a-marker preset="hiro">
                <a-entity
                    position="0 0 0"
                    scale="0.05 0.05 0.05"
                    gltf-model="your-server/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
                ></a-entity>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>
    )
}

export default App
