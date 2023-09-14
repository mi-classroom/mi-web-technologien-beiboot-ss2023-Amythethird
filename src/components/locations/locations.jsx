import {useNavigate, useParams} from "react-router-dom";

function Locations(props) {
    const navigate = useNavigate();
    const routeChange = () =>{
        let path = `/dwebtech/informations/${props.name}`;
        navigate(path);
    }
    const containerStyle = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    return(
        <li  className={`list-group-item d-flex justify-content-between align-items-end location-${props.id} locationCard` } onClick={routeChange} style={{background: `linear-gradient(rgba(255, 255, 255, 0) 60%, rgba(0, 0, 0, 0.6) 86%), url(${props.bg}`, ...containerStyle}}>
               <div className={"ms-2 me-auto"}>
                   <div className={"fw-bold"}><p>{props.name}</p></div>
               </div>
               <span className={"badge bg-primary rounded-pill"}>{props.lenght}</span>
        </li>

    )
}

export default Locations