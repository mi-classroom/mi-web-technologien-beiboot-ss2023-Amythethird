import Overlay from "../../components/overlay/overlay.jsx";
import Locations from "../../components/locations/locations.jsx";
import locations from "../../data/map.json"

function PokeAround() {
    const containerStyle = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    return(
        <>
            <Overlay text={"Bitte wählen Sie einen ARlebnisspfad"}/>
            <div className={"locationsSlider"}>
                {locations.filter(l => l.locations.some(geo => geo.geoData)).map((e, i) => (
                    <div className={"pokeAround"} key={i} style={{background: `linear-gradient(rgba(255, 255, 255, 0) 60%, rgba(0, 0, 0, 0.6) 86%), url(${e.bgImg}`,
                        ...containerStyle}} >
                        <Locations id={i} name={e.city}/>
                    </div>
                ))

                }
            </div>

        </>
    )
}

export default PokeAround