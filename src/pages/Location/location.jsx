import {useNavigate, useParams} from "react-router-dom";
import Overlay from "../../components/overlay/overlay.jsx";
import locationJSON from "../../data/map.json"
import Openstreetmap from "../../components/map/openstreetmap.jsx";

function Location() {
    let { location_name } = useParams();
    const navigate = useNavigate();
    let locale = locationJSON.filter(e => e.city === location_name)
    let testLocations = locationJSON.filter(test => test.dev === true)
    const routeChange = (locationname) => {
        let path = `/dwebtech/locationbased/${locationname}`;
        navigate(path);
    }

    return(
        <>
            <Overlay text={"Zurück zur Information"}/>
            <div className={"Location_list h-100"} style={{backgroundImage: `url(/${locale.map(bg => bg.bgImg)})`, backgroundSize:"cover", backgroundPosition: "50% 50%"}} >
                <div className={"wrapper"}>
                    <h1>{location_name !== 'all' ? `ARLebnisse in ${location_name}` : "In deiner nähe"}</h1>
                    <ul>
                        {
                         location_name === 'all' ?
                             testLocations.map(test => (
                                 test.locations.map((testlocat, index) => (
                                     <li key={index}><a onClick={() => routeChange(testlocat.LocationName)} style={{cursor: 'pointer'}}><span>{testlocat.LocationName} </span><span>{` Entfernung 400m`}</span></a></li>
                                 ))
                             ))
                             :
                         locale.map(l => (
                             l.locations.map((locat, index) => (
                                 <li key={index}><a><span>{locat.LocationName} </span><span>{` Entfernung 400m`}</span></a></li>
                             ))
                         ))
                        }
                    </ul>
                </div>

            </div>
        </>

    )
}

export default Location