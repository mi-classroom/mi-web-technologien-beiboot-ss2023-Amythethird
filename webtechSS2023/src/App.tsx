import './App.css'
import  {useState} from "react";


function App() {
    const [cameraOn, setCameraOn] = useState(false);
    function openCamera(){
        setCameraOn(current => !current)
    }


    return (
       <main className={"container-lg"}>
           {/*<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
               Close
           </button>

           <div className="offcanvas offcanvas-start show" tabIndex="1" id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel">
               <div className="offcanvas-header">
                   <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                   <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
               </div>
               <div className="offcanvas-body">
                   <div>
                       Some text as placeholder. In real life you can have the elements you have chosen. Like, text,
                       images, lists, etc.
                   </div>
                   <div className="dropdown mt-3">
                       <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                           Dropdown button
                       </button>
                       <ul className="dropdown-menu">
                           <li><a className="dropdown-item" href="#">Action</a></li>
                           <li><a className="dropdown-item" href="#">Another action</a></li>
                           <li><a className="dropdown-item" href="#">Something else here</a></li>
                       </ul>
                   </div>
               </div>
           </div>*/}
           <button className="btn btn-primary" type="button" data-bs-toggle=""
                   data-bs-target="" aria-controls="" onClick={openCamera}>
               Open Kamera
           </button>
           {cameraOn}


       </main>
    )
}
export default App
