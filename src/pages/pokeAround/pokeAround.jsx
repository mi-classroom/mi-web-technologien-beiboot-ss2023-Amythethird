import Overlay from "../../components/overlay/overlay.jsx";
import Locations from "../../components/locations/locations.jsx";
import locations from "../../data/map.json"

function PokeAround() {

    return(
        <>
            <Overlay text={"Bitte wählen Sie einen ARlebnisspfad"}/>
            <main>
                <ol className={"list-group locationsSlider list-group-numbered "}>
                    {locations.filter(l => l.locations.some(geo => geo.geoData)).map((e, i) => (
                        <Locations key={i} id={i} name={e.city} bg={e.bgImg} lenght={e.locations.length}/>
                    ))

                    }
                </ol>
            </main>

        </>
    )
}

export default PokeAround