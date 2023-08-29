import Button from "../../components/button/button.jsx";
import Overlay from "../../components/overlay/overlay.jsx";

function Select({ onBackClick }) {

    return(
        <>
            <Overlay text={"Zurück"}/>
            <div className={`select`} >
                <Button text={`ARlebnisse in der Umgebung anzeigen`} option={""} className={"veryBig"} size={"xl"} path={`/dwebtech/location/all`} icon={'public/icons/radar.svg'}/>
                <Button text={`ARlebnis via QR Code Scan starten`} option={""} className={"big orange"} size={"xl"}/>
            </div>
        </>

    )
}

export default Select