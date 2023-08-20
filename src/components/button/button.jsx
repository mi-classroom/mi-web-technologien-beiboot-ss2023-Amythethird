import {useNavigate} from "react-router-dom";

function Button(props) {
    const navigate = useNavigate();
    const routeChange = () =>{
        let path = `${props.path}`;
        navigate(path);
    }
    return(
        <button className={`${props.className} ${props.size}`} onClick={routeChange}>
            {props.text} <span>{props.option}</span>
        </button>
    )
}

export default Button