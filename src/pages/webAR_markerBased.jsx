import "./index.css"
import {reShape} from  "./marker.js"
import Navbar from "../components/navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import DropDown from "../components/dropdown/Dropdown.jsx";

function MarkerBased() {

    let navigate = useNavigate();
    const options = ["Auswahl","Sphere", "Herz", "3D"];
    const [selected, setSelected] = useState(options[0]);
    const [select, setSelect] = useState(false);

    const [soundSettings, setSoundSettings] = useState(false);

    console.log(soundSettings)
    return (
        <>
            <div className={"marker"} id={"marker"}>
            </div>
            <button className={"backbutton"} onClick={() => navigate("/dwebtech/start")}>
                <FontAwesomeIcon
                icon={faArrowLeft}
                size={"lg"}
                style={{color: "blue"}}
            /></button>
            {soundSettings && <div  id={"audioButtons"}>
                <DropDown  />
            </div>}
            {select &&  <select
                value={selected}
                onChange={(e) => reShape(e.target.value)} id={"dropdown"} >
                {options.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                ))}
            </select>}
            <Navbar setName={setSelect} setSoundSettings={setSoundSettings} />
        </>

    )
}

export default MarkerBased
