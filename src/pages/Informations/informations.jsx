import {useParams} from "react-router-dom";
import locations from "../../data/map.json"
import Button from "../../components/button/button.jsx";
function Informations() {
    let { name } = useParams();
    let location = locations.filter(e => e.city === name)
    return(
        <div className={"Information"} >
               {location.map(e => (
                   <>
                       <div className={"header"} style={{backgroundImage: `url(${e.bgImg}`}}></div>
                       <div className={"wrapper"}>
                           <h2>Informationen:</h2>
                           <ul>
                               <li>
                                   Stadt: {e.city}
                               </li>
                               <li>
                                   Bundesland: {e.Federal_State_short}
                               </li>
                               <li>
                                   PLZ: {e.postalCode}
                               </li>
                           </ul>
                           <p>
                               Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                           </p>
                       </div>
                       <Button text={`Alle ARLebnisse aus ${name}`} className={"big"} size={"xl"} path={`/dwebtech/location/${name}`}/>
                   </>

               ))}


        </div>
    )
}

export default Informations