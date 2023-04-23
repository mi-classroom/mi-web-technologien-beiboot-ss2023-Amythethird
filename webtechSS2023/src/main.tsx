import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Header/>
        <App />
      <Footer/>
  </React.StrictMode>,
)
