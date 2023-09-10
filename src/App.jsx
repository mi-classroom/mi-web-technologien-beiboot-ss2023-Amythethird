import './App.css'
import './index.css'
import {Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import Home from "./pages/homescreen/home.jsx";
import OverView from "./pages/overview/overview.jsx";
import Loader from "./components/loader/Loader.jsx";
import PokeAround from "./pages/pokeAround/pokeAround.jsx";
import Select from "./pages/ARLebnisse/select.jsx";
import Location from "./pages/Location/location.jsx";
import Informations from "./pages/Informations/informations.jsx";
import eruda from 'eruda'

const LocationBased = React.lazy(() => import("./pages/loactionBased.jsx"))

function App() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    if(import.meta.env.DEV) eruda.init({tool: ['console']})

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);
    return (
    <div
        className={`${transitionStage} compbody`}
        onAnimationEnd={() => {
            if (transitionStage === "fadeOut") {
                setTransistionStage("fadeIn");
                setDisplayLocation(location);
            }
        }}
    >
    <Suspense fallback={<Loader/>} location={displayLocation}>
        <Routes>
                <Route exact path={"/dwebtech/"}  element={ <Home/>}  />
                <Route exact path={"/dwebtech/overview"} element={<OverView />} />
                <Route exact path={"/dwebtech/stöbern"} element={<PokeAround />} />
                <Route exact path={"/dwebtech/nutzen"} element={<Select />} />
                <Route exact path={"/dwebtech/location/:location_name"} element={<Location />} />
                <Route exact path={"/dwebtech/informations/:name"} element={<Informations />} />
                <Route exact path={"/dwebtech/locationbased/:location_name"} element={<LocationBased/>}/>
               {/*
                <Route exact path={"/dwebtech/marker"} element={<MarkerBased/>}/>

                <Route exact path={"/dwebtech/test"} element={<Test/>}/>*/}
        </Routes>
    </Suspense>
    </div>
  )
}

export default App
