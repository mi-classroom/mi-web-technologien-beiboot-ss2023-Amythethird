import './styles/styles.css'
import {Route, Router, Routes} from "react-router-dom";
import Landing_Page from "./components/sites/landing_page/Landing_Page.tsx";
import Home from "./components/sites/home/Home.tsx";
import Footer from "./components/footer/footer.tsx";
function App() {


    return (
       <>
           <Routes>
               <Route path="/" element={<Landing_Page />} />
               <Route path="/home" element={<Home />} />
           </Routes>
          {/* <Footer/>*/}
       </>
    )


}

export default App
