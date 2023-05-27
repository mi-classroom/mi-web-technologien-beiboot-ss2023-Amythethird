import './App.css'
import {Route, Routes} from "react-router-dom";
import React, {Suspense} from "react";
import Home from "./pages/home.jsx";
import OverView from "./pages/overview.jsx";
import Loader from "./components/loader/Loader.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
const MarkerBased = React.lazy(() => import("./pages/webAR_markerBased.jsx"));
const WebAR_locationBased = React.lazy(() => import("./pages/webAR_locationBased.jsx"));

function App() {
  return (
    <>
    <Suspense fallback={<Loader/>}>
        <Routes>
                <Route path={"/dwebtech/"} element={<Home/>}/>
                <Route path={"/dwebtech/start"} element={<OverView/>}/>
                <Route path={"/dwebtech/marker"} element={<MarkerBased/>}/>
                <Route path={"/dwebtech/location"} element={<WebAR_locationBased/>}/>
        </Routes>
    </Suspense>
    </>
  )
}

export default App
