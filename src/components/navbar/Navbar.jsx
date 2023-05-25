import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCameraRotate, faCubes, faLocationDot, faQrcode} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

function Navbar() {

    return (
        <div className={"wrapper navbar"}>
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
