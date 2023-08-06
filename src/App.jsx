import './App.css'
import './index.css'
import {Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import Home from "./pages/homescreen/home.jsx";
import OverView from "./pages/overview/overview.jsx";
import Loader from "./components/loader/Loader.jsx";
import PokeAround from "./pages/pokeAround/pokeAround.jsx";

const MarkerBased = React.lazy(() => import("./pages/webAR_markerBased.jsx"));
//const WebAR_locationBased = React.lazy(() => import("./pages/webAR_locationBased.jsx"));
const LocationBased = React.lazy(() => import("./pages/loactionBased.jsx"))

function App() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

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
               {/*
                <Route exact path={"/dwebtech/marker"} element={<MarkerBased/>}/>
                <Route exact path={"/dwebtech/location"} element={<LocationBased/>}/>
                <Route exact path={"/dwebtech/test"} element={<Test/>}/>*/}
        </Routes>
    </Suspense>
    </div>
  )
}

export default App
