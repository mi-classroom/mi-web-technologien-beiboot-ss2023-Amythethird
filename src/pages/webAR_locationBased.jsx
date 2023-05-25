import './index.css'
import AR from "./location.js";
import {useState} from "react";

function WebARLocation() {
    const [state, setState] = useState({longitute: 0, latitude: 0})
    const [click, setClick] = useState(false);

    function init(){
        setClick(current => !current);
        setTimeout(()=>{
            AR();
        },500)
    }

    return (
        <>
            <button onClick={init}>Start</button>
            {click && <canvas id='canvas1'/>}
            {`latitude:` + state.latitude + `  lng: ` + state.longitute }
        </>
    )

}

export default WebARLocation
