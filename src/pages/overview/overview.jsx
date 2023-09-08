import "../index.css"
import Button from "../../components/button/button.jsx";

function OverView({ onBackClick }) {
    return (
        <>
            <main className={"overview"}>
                {/*<button onClick={onBackClick}>Zurück</button>*/}
                <Button text={`Ich will nur ein bisschen`} option={"stöbern"} className={"big"} size={"xl"} path={"/dwebtech/stöbern"}/>
                <Button text={`Ich will die ARlebnisse`} option={"nutzen"} className={"big orange"} size={"xl"} path={"/dwebtech/nutzen"}/>
            </main>
        </>

    )
}

export default OverView
