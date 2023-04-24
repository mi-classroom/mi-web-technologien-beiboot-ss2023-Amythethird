import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
// @ts-ignore
import WebARLocation from "./components/webAR_locationBased/webAR_location-based.jsx";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Header/>
     
      <Footer/>
  </React.StrictMode>,
)
