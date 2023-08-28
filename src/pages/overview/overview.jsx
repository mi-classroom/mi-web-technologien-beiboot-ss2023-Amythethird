import "../index.css"
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPenNib, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Navbar from "../../components/navbar/Navbar.jsx";
import Overlay from "../../components/overlay/overlay.jsx";
import Button from "../../components/button/button.jsx";

function OverView({ onBackClick }) {
    return (
        <>
            <main className={"overview"}>
                {/*<button onClick={onBackClick}>Zurück</button>*/}
                <Button text={`Ich will nur ein bisschen`} option={"stöbern"} className={"big"} size={"xl"} path={"/dwebtech/stöbern"}/>
                <Button text={`Ich will die ARlebnisse`} option={"nutzen"} className={"big orange"} size={"xl"} path={"/dwebtech/nutzen"}/>
            </main>
        </>

    )
}

export default OverView
