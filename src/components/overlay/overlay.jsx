import {useNavigate} from "react-router-dom";

function Overlay(props) {
    let navigate = useNavigate();

    const routeChange = () =>{
        navigate(-1);
    }
    return (
        <>
            <div className={"overlay"}>
                <button className={"backButton"} aria-label={"zurück"} onClick={routeChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M655-80 255-480l400-400 56 57-343 343 343 343-56 57Z"/></svg>
                </button>
                <p>{props.text}</p>
            </div>
        </>

    )
}

export default Overlay