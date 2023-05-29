import "./index.css"
import {useNavigate} from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
function Home() {
    const navigate = useNavigate();
    return (
        <>
            <main>
                <div className={" landing"}>
                    <video id={"backgroundVideoLanding"} aria-label={"Natur Video ARLebnispfade"} autoPlay muted loop>
                        <source src={"./landing_page.mp4"}/>
                    </video>
                    <h2>Willkommen bei ARLebnispfade.</h2>
                    <button type={"button"} className={"btn btn-outline-light"} onClick={() => navigate("/dwebtech/start")} >Anwendung Starten</button>
                </div>
            </main>
        </>

    )
}

export default Home
