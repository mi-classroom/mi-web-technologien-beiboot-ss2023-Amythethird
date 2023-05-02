// @ts-ignore
import WebARLocation from "./components/webAR_locationBased/webAR_location-based.jsx";
import {useState, useTransition} from "react";
import Webar from "./components/webAR_markerBased/webar.tsx";
import './styles/styles.css'
function App() {

    const [sidebar, setSidebar] = useState(false);
    const [route, setRoute] = useState('/')
    const [isPending, startTransition] = useTransition();
    function showSidebar(){
        setSidebar(current => !current)

    }
    function routing(route){
        startTransition(() => {
            setRoute(route);
        });
    }

    let content;
    if (route === '/') {
        content = (
          <p>Hello</p>
        );
    }if (route === '/lcb') {
        content = (
            <WebARLocation/>
        );
    }else if(route === '/mab'){
        content = (
            <Webar/>
        );
    }

    return (
        <main className={'wrapper'} >
            <nav id="sidebar" className={`sidebar ${sidebar ? "active" : ""}`}>
                <ul>
                    <button type="button" className="btn btn-link" onClick={() => routing('/lcb')} >Location Based AR-App</button>
                    <button type="button" className="btn btn-link" onClick={() => routing('/mab')} >Marker Based AR-App</button>
                </ul>
            </nav>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={showSidebar}>
                            <i className="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
                       <div>
                           {content}
                       </div>
                    </div>
                </nav>
            </div>
        </main>
    )


}

export default App
