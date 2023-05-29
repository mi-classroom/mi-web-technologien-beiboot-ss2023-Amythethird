import "./dropdown.css"
import {pause, play, stop} from "../../pages/marker.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faStop} from "@fortawesome/free-solid-svg-icons";

function DropDown() {


    return (
        <>
            <div className={"audio-buttons"} >
                <button onClick={pause}>
                    <FontAwesomeIcon
                        icon={faPause}
                        size={"lg"}
                        style={{color: "black"}}/></button>
                <button onClick={play} >
                    <FontAwesomeIcon
                        icon={faPlay}
                        size={"lg"}
                        style={{color: "black"}}/></button>
                <button onClick={stop} >
                    <FontAwesomeIcon
                        icon={faStop}
                        size={"lg"}
                        style={{color: "black"}}/></button>
            </div>
        </>

    )
}

export default DropDown
