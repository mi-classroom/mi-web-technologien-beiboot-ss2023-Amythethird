import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlay, faCubes, faLocationDot, faQrcode} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Navbar({setName, setSoundSettings}) {
    const [select, setSelect] = useState(true)
    const [soundSettings, setSoundSetting] = useState(true)
   function handleClick(){
        setSelect(current => !current)
        setName(select);
    }
    function handleSoundSettings(){
        setSoundSetting(current => !current)
        setSoundSettings(soundSettings);
    }

    return (
        <div className={"navbarT"}>
            <nav>
                <li>
                    <Link to={"/dwebtech/location"} aria-label={"location based Webar"}>
                        <FontAwesomeIcon
                        icon={faLocationDot}
                        size={"lg"}
                        style={{color: "black"}}
                        />
                    </Link>
                </li>
                <li>
                    <Link to={"/dwebtech/marker"} aria-label={"Marker based Webar"}>
                        <FontAwesomeIcon
                            icon={faQrcode}
                            size={"lg"}
                            style={{color: "black"}}
                        />
                    </Link>

                </li>
                <li onClick={handleSoundSettings}>
                    <a href={"#"} aria-label={"Kamera Wechseln"} >
                        <FontAwesomeIcon
                            icon={faCirclePlay}
                            size={"lg"}
                            style={{color: "black"}}
                        />
                    </a>
                </li>
                <li  onClick={handleClick}>
                    <a href={"#"} aria-label={"Models"}>
                        <FontAwesomeIcon
                            icon={faCubes}
                            size={"lg"}
                            style={{color: "black"}}
                        />
                    </a>
                </li>
            </nav>
        </div>
    )

}

export default Navbar
