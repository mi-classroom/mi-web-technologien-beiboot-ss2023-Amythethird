import "./test.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faQrcode, faCirclePlay, faGear} from '@fortawesome/free-solid-svg-icons'
import {faPause, faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

function Test(){
    const [select, setSelect] = useState(false)
    const [dropDown, setDropdown] = useState(true)

    const links = [
            {Icon: <FontAwesomeIcon key={1} icon={faLocationDot} type={"location"} aria-label={"Location"} size={"lg"} color={"black"}/>, Name: "Location", State: false},
            {Icon: <FontAwesomeIcon key={2} icon={faQrcode} type={"marker"} aria-label={"Marker Based"} size={"lg"} color={"black"}/>, Name: "Marker", State: "false"},
            {Icon: <FontAwesomeIcon key={3} icon={faCirclePlay} type={"audio settings"} aria-label={"Audio Settings"} size={"lg"} color={"black"}/>, Name: "Audio Settings", DropDown:
                    <ol className="sub-menu hide">
                        <li className="menu-item"><a href="#0"><FontAwesomeIcon icon={faPlay}/></a></li>
                        <li className="menu-item"><a href="#0"><FontAwesomeIcon icon={faPause}/></a></li>
                        <li className="menu-item"><a href="#0"><FontAwesomeIcon icon={faStop}/></a></li>
                    </ol>, State: "true"},
            {Icon: <FontAwesomeIcon key={4} icon={faGear} type={"settings"} aria-label={"Basic settings"} size={"lg"} color={"black"}/>, Name: "Basic Settings", State: "false"}
        ]



    return(
        <nav className={"navbar"}>
            {links.map((value) => (
                <li value={value.type} key={value.key} aria-label={value.Name}  >
                    {value.Icon}
                    {value.DropDown}
                </li>

            ))}
        </nav>
    )
}

export default Test;