import './App.css'
import './index.css'
import {Route, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import Home from "./pages/homescreen/home.jsx";
import OverView from "./pages/overview/overview.jsx";
import Loader from "./components/loader/Loader.jsx";
import PokeAround from "./pages/pokeAround/pokeAround.jsx";
import Select from "./pages/ARLebnisse/select.jsx";
import Location from "./pages/Location/location.jsx";
import Informations from "./pages/Informations/informations.jsx";
import eruda from 'eruda'
import Arlebnis from "./pages/ARLebnis/arlebnis.jsx";
import QrErlebnis from "./pages/QR/qrErlebnis.jsx";
import SlideRoutes from "react-slide-routes";

const LocationBased = React.lazy(() => import("./pages/loactionBased.jsx"))

function App() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    eruda.init({tool: ['console']})

    return (
    <Suspense fallback={<Loader/>} location={displayLocation}>
        <SlideRoutes animation={'vertical-slide'}>

                <Route exact path={"/dwebtech/"}  element={ <Home/>}  />
                <Route exact path={"/dwebtech/overview"} element={<OverView />} />
                <Route exact path={"/dwebtech/stöbern"} element={<PokeAround />} />
                <Route exact path={"/dwebtech/nutzen"} element={<Select />} />
                <Route exact path={"/dwebtech/location/:location_name"} element={<Location />} />
                <Route exact path={"/dwebtech/informations/:name"} element={<Informations />} />
                <Route exact path={"/dwebtech/locationbased/:location_name"} element={<LocationBased/>}/>
                <Route exact path={"/dwebtech/test/"} element={<Arlebnis/>}/>
                <Route exact path={"/dwebtech/nutzen/qr"} element={<QrErlebnis/>}/>
               {/*
                <Route exact path={"/dwebtech/marker"} element={<MarkerBased/>}/>

                <Route exact path={"/dwebtech/test"} element={<Test/>}/>*/}

        </SlideRoutes>
    </Suspense>
  )
}

export default App
