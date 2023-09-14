import Button from "../../components/button/button.jsx";
import Overlay from "../../components/overlay/overlay.jsx";

function Select({ onBackClick }) {

    return(
        <>
            <Overlay text={"Zurück"}/>
            <div className={`select container-fluid`} id={"section1"} >
                <Button text={`ARlebnisse in der Umgebung anzeigen`} option={""} className={"veryBig"} fontColor={"white"} size={"xl"} icon={"radar"} colorIcon={"white"} path={`/dwebtech/location/all`} />
                <Button text={`ARlebnis via QR Code Scan starten`} option={""} className={"veryBig "} fontColor={"white"} color={"orange"} icon={"qr"} colorIcon={"white"} size={"xl"} path={`/dwebtech/nutzen/qr`}/>
                <Button text={`Ich habe keine Ahnung`} option={""} className={"veryBig "} fontColor={"black"} color={"lightgray"} icon={"help"} colorIcon={"black"} size={"xl"} />
            </div>
        </>
    )
}

export default Select