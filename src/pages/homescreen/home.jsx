
import { useNavigate } from "react-router-dom";
function Home() {
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/dwebtech/overview`;
        navigate(path);
    }
    return (
        <>
            <main>
                <div className={"landing"}>
                    <video id={"backgroundVideoLanding"} aria-label={"Natur Video ARLebnispfade"} autoPlay muted loop>
                        <source src={"./intro-video.mp4"}/>
                    </video>
                    <h2 className={"intro_text"} aria-label={"ARlebnispfade Oberbergischer Kreis"}><span>AR</span>lebnispfade Oberbergischer Kreis</h2>
                    <button onClick={routeChange} className={"scrollDown"}><svg  xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M655-80 255-480l400-400 56 57-343 343 343 343-56 57Z"/></svg></button>
                </div>
            </main>
        </>

    )
}

export default Home
