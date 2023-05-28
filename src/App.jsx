import './App.css'
import {Route, Routes} from "react-router-dom";
import React, {Suspense} from "react";
import Home from "./pages/home.jsx";
import OverView from "./pages/overview.jsx";
import Loader from "./components/loader/Loader.jsx";
const MarkerBased = React.lazy(() => import("./pages/webAR_markerBased.jsx"));
//const WebAR_locationBased = React.lazy(() => import("./pages/webAR_locationBased.jsx"));
const LocationBased = React.lazy(() => import("./pages/loactionBased.jsx"))

function App() {
  return (
    <>
    <Suspense fallback={<Loader/>}>
        <Routes>
                <Route exact path={"/dwebtech/"} element={<Home/>}/>
                <Route exact path={"/dwebtech/start"} element={<OverView/>}/>
                <Route exact path={"/dwebtech/marker"} element={<MarkerBased/>}/>
                <Route exact path={"/dwebtech/location"} element={<LocationBased/>}/>
         {/*       <Route exact path={"/dwebtech/locationTest"} element={<LocationBased/>}/>*/}
        </Routes>
    </Suspense>
    </>
  )
}

export default App
