import './index.css'
import Navbar from "../components/navbar/Navbar.jsx";
import "./location.js"
import {useEffect} from "react";
import AR from "./location.js"

function WebARLocation() {
    useEffect(()=>{
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.geolocation) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const { latitude, longitude } = position.coords;
                        AR(latitude, longitude)
                    }, function(error) {
                        console.error('Fehler bei der Standortabfrage:', error);
                    });
                })
                .catch(function(error) {
                    console.error('Fehler bei der Berechtigungsabfrage für die Kamera:', error);
                });

        } else {
            console.error('Der Browser unterstützt keine Berechtigungsabfragen für die Kamera oder Geolocation.');
        }
    })
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
