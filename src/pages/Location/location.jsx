import {useParams} from "react-router-dom";

function Location() {
    let { location_name } = useParams();

    return(
        <div >
            <h1>{location_name}</h1>
           <ul>
               <li>Test</li>
               <li>Test</li>
               <li>Test</li>
           </ul>
        </div>
    )
}

export default Location