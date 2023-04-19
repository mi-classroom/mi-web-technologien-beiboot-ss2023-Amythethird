"use client";
import {ReactNode, useRef} from "react";
import Webcam from "react-webcam";
import styles from './camera_module.css'

export interface CameraProps{
    isActive?:boolean; // whether the camera is opened
    isPause?:boolean; // whether the camera is paused
    desiredCamera?:string;
    //desiredResolution?:Resolution;
    facingMode?:string;
    children?: ReactNode;
    onOpened?: (cam:HTMLVideoElement,camLabel:string) => void; // event triggered when the camera is opened
    onClosed?: () => void; // event triggered when the camera is closed
    onDeviceListLoaded?: (list:MediaDeviceInfo[]) => void; // event triggered when the list of camera devices is loaded
}

const CameraModule = (props: CameraProps) => {
    const webcam = useRef<Webcam>(null);
    return (
        <div className= "webcamCapture">
            <Webcam audio={false} ref={webcam} />
        </div>
    );
};

export default CameraModule;