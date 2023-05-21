import './style.css'
import {useNavigate} from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    return (
        <main>
            <div className={"container landing"}>
                <video id={"backgroundVideoLanding"} aria-label={"Natur Video ARLebnispfade"} autoPlay muted loop>
                    <source src={"../../../../public/videos/landing_page.mp4"}/>
                </video>
                <h1>Willkommen bei ARLebnispfade.</h1>
                <button type={"button"} className={"btn btn-outline-light"} onClick={() => navigate("/home")} >Anwendung Starten</button>
            </div>
        </main>
    )
}

export default Landing
