import "../index.css"
import Button from "../../components/button/button.jsx";
function OverView() {
    return (
        <>
            <main className={"overview container-sm container-md container-lg container-xl d-flex flex-column justify-content-center align-items-center"}>
                <Button text={`Ich will nur ein bisschen`} option={"stöbern"} className={"big"} size={"xl"} path={"/dwebtech/stöbern"}/>
                <Button text={`Ich will die ARlebnisse`} option={"nutzen"} className={"big orange"} size={"xl"} path={"/dwebtech/nutzen"}/>
            </main>
        </>

    )
}

export default OverView
