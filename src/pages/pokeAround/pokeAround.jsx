import Overlay from "../../components/overlay/overlay.jsx";
import Locations from "../../components/locations/locations.jsx";
import locations from "../../data/map.json"

function PokeAround() {

    console.log(locations.map(l => l.locations.length))
    return(
        <>
            <Overlay text={"Bitte wählen Sie einen ARlebnisspfad"}/>
            <ol className={"list-group list-group-numbered h-100"}>
            {locations.filter(l => l.locations.some(geo => geo.geoData)).map((e, i) => (
                        <Locations key={i} id={i} name={e.city} bg={e.bgImg} lenght={e.locations.length}/>
                ))

                }
            </ol>

        </>
    )
}

export default PokeAround