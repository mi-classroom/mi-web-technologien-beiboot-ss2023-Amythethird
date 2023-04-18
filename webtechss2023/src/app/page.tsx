"use client";
import styles from './page.module.css'
import VisionCamera from "./components/camera_module/camera_module";
export * from "./components/camera_module/camera_module";
import {useState} from "react";


export default function Home() {

    const [state, setState] = useState(false);
    function handleClick() {

        setState(current => !current);
        console.log(state)
    }

    return (
            <main>
                <div className={"bg-dark text-secondary px-4 py-5 text-center"}>
                    <div className={"py-5"}>
                        <h1 className={"display-5 fw-bold text-white"}>Herzlich Willkommen, auf ARlebnispfade Oberbergischer Kreis</h1>
                        <div className={"col-lg-6 mx-auto"}>
                            <p className={"fs-5 mb-4"}>Hier können Sie aktuell ein Objekt mit Ihrer Kamera anvisieren und Geometrische Objekte darauf Projezieren.
                                Mit einem Click auf den Button startet Ihre Smartphone-Kamera und analysiert das Object. Danach können Sie über das Auswahlmenü einfache Objekte projezieren.
                            </p>
                            <div className={"d-grid gap-2 d-sm-flex justify-content-sm-center"}>
                                <button type="button"
                                        className={"btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"} onClick={handleClick}>{state ? "Kamera schließen" : "Kamera starten"}
                                </button>
                                <button type="button" className={"btn btn-outline-light btn-lg px-4"}>weitere Informationen</button>
                            </div>
                        </div>
                    </div>
                    <>
                        {state && <VisionCamera/>}
                    </>
                </div>
            </main>

    )

}
