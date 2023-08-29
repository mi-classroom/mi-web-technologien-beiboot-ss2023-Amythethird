import {useNavigate, useParams} from "react-router-dom";

function Locations(props) {
    const navigate = useNavigate();
    const routeChange = () =>{
        let path = `/dwebtech/informations/${props.name}`;
        navigate(path);
    }
    return(
        <div className={`location-${props.id} locationCard`} onClick={routeChange} >
            <p>{props.name}</p>
        </div>
    )
}

export default Locations