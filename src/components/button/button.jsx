import {useNavigate} from "react-router-dom";
import Radar from "../../icons/radar.jsx"
import Help from "../../icons/help.jsx"
import QR from "../../icons/qr.jsx"


function Button(props) {
    const navigate = useNavigate();
    let icon;
    const routeChange = () =>{
        let path = `${props.path}`;
        navigate(path);
    }
    if(props.icon === "radar") icon = <Radar color={props.colorIcon}/>
    else if(props.icon === "help") icon = <Help color={props.colorIcon}/>
    else if(props.icon === "qr") icon = <QR color={props.colorIcon}/>
    return(
        <button className={`${props.className} ${props.size} d-flex flex-column align-items-center justify-content-center`} style={{backgroundColor: `${props.color}`, color: props.fontColor}} onClick={routeChange}>
            <span> {icon}</span>
            {props.text} <span>{props.option}</span>
        </button>
    )
}

export default Button