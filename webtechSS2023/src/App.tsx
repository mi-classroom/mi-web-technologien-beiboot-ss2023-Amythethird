import './styles/styles.css'
import {Route, Router, Routes} from "react-router-dom";
import Landing_Page from "./components/sites/landing_page/Landing_Page.tsx";
import Home from "./components/sites/home/Home.tsx";
import WebAR from "./components/sites/webAR_markerBased/webar.jsx";
function App() {


    return (
       <>
           <Routes>
               <Route path="/" element={<Landing_Page />} />
               <Route path="/home" element={<Home />} />
               <Route path="/marker" element={<WebAR />} />
           </Routes>
          {/* <Footer/>*/}
       </>
    )


}

export default App
