import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCameraRotate, faCubes, faLocationDot, faQrcode} from '@fortawesome/free-solid-svg-icons'

function Navbar() {

    return (
        <div className={"wrapper navbar"}>
            <nav>
                <li>
                    <a
                        href={"#"} aria-label={"location based WebAR"}
                    >
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            size={"lg"}
                            style={{color: "black"}}
                        />
                    </a>
                </li>
                <li>
                    <a href={"#"} aria-label={"Marker based WebAR"}>
                        <FontAwesomeIcon
                            icon={faQrcode}
                            size={"lg"}
                            style={{color: "black"}}
                        />
                    </a>
                </li>
                <li>
                    <a href={"#"} aria-label={"Kamera Wechseln"}>
                        <FontAwesomeIcon
                            icon={faCameraRotate}
                            size={"lg"}
                            style={{color: "black"}}
                        />
                    </a>
                </li>
                <li>
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
