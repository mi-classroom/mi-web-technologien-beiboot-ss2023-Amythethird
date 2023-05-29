import "./index.css"
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPenNib, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Navbar from "../components/navbar/Navbar.jsx";

function OverView() {
    const navigate = useNavigate();

    return (
        <main className={"overview"}>
            <h1>Hi</h1>
            <FontAwesomeIcon icon={faPenNib} />
            <FontAwesomeIcon icon={faEnvelope} />
            <Navbar/>
        </main>
    )
}

export default OverView
