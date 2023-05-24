import './style.css'
import Navbar from "../../navbar/Navbar.tsx";
function Home() {

    return (
        <main className={"container home"}>
            <h1>Willkommen in der Anwendung</h1>
            <p>Unten in der Sidebar können Sie die verschiedenen Modi der App ausprobieren.</p>
            <ul>
                <li>WebAR Location Based</li>
                <li>WebAR Marker Based</li>
            </ul>
            <Navbar/>
        </main>
    )
}
export default Home
