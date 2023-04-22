import './App.css'
import {useState} from "react";

function App() {

    const [state, setState] = useState({latitude:0, longitude: 0});
    navigator.geolocation.getCurrentPosition((position) => {
       setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       })
        console.log(state.longitude)

    });

  return (
      <main>
          <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true' embedded>
              <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
              <a-entity material='color: red' geometry='primitive: box' gps-new-entity-place={`latitude: ${coords.latitude } ; longitude: ${coords.longitude}`} scale="10 10 10"></a-entity>
          </a-scene>
      </main>
  )
}

export default App
