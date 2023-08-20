import Overlay from "../../components/overlay/overlay.jsx";
import Locations from "../../components/locations/locations.jsx";

function PokeAround() {

    const locations = [
        {
                id: 1,
                bgImg: "public/bergisches_waldbroel-4351265.jpg",
                name: "Wiehl"
        },
        {
            id: 2,
            bgImg: "public/unnenbergturm.jpg",
            name: "Straße der Arbeit – Marienheide"
        },
        {
            id: 3,
            bgImg: "public/image2.png",
            name: "Wipperfürth"
        },


    ]
    const containerStyle = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    return(
        <>
            <Overlay text={"Bitte wählen Sie einen ARlebnisspfad"}/>
            <div className={"locationsSlider"}>
                {locations.map((e, i) => (
                    <div className={"pokeAround"} key={i} style={{background: `linear-gradient(rgba(255, 255, 255, 0) 60%, rgba(0, 0, 0, 0.6) 86%), url(${e.bgImg}`,
                        ...containerStyle}} >
                        <Locations id={e.id} name={e.name}/>
                    </div>
                ))
                }
            </div>

        </>
    )
}

export default PokeAround