import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Header/>

      <Footer/>
  </React.StrictMode>,
)
