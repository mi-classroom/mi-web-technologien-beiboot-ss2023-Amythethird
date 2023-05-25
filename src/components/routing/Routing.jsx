import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../../pages/home.jsx";
import OverView from "../../pages/overview.jsx";
const MarkerBased = React.lazy(() => import("../../pages/webAR_markerBased.jsx"));
const WebAR_locationBased = React.lazy(() => import("../../pages/webAR_locationBased.jsx"));


function Routing() {

    return (
      <>
          <Routes>
              <Route path={"/dwebtech/"} element={<Home/>}/>
              <Route path={"/dwebtech/start"} element={<OverView/>}/>
              <Route path={"/dwebtech/marker"} element={<MarkerBased/>}/>
              <Route path={"/dwebtech/marker"} element={<WebAR_locationBased/>}/>
          </Routes>
      </>
    )

}

export default Routing
