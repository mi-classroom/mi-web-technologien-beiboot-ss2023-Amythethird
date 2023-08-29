import {useNavigate} from "react-router-dom";
import icon from "../../data/icons.json";

function Button(props) {
    const navigate = useNavigate();
    const routeChange = () =>{
        let path = `${props.path}`;
        navigate(path);
    }
    return(
        <button className={`${props.className} ${props.size}`} onClick={routeChange}>
            {icon.map((e) => {
                {e.icon}
            })}

            {props.text} <span>{props.option}</span>
        </button>
    )
}

export default Button