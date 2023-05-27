import "./index.css"
import "./marker.js"
import Navbar from "../components/navbar/Navbar.jsx";
import React from "react";


function MarkerBased() {
    return (
        <>
            <div className={"marker"} id={"marker"}>
            </div>
            <Navbar/>
        </>

    )
}

export default MarkerBased
