// Install Dependencies done
// Import Dependencies done
// Setup Webcam and Canvas done
// Define references to those
// Load handpose
// Detect function
//draw utilities from tensor flow
// draw functions




// import logo from './logo.svg';
import React, { useRef } from 'react'

import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import { drawHand } from './utilities'
import Webcam from 'react-webcam'
import './App.css';

function App() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load()
    console.log("Handpose model started loading")
    console.log("net", net)
    setInterval(() => {
        detect(net);
    },500)
    
  }

  runHandpose()

  const detect = async (net) => {
    
    if (typeof webcamRef.current != "undefined" && webcamRef.current != null && webcamRef.current.video.readyState === 4) {
      // check data is available
      // get video properties

      //
      // make detections
      // draw mesh

      const video = webcamRef.current.video;
      const videoHeight = webcamRef.current.video.videoHeight;
      const videoWidth = webcamRef.current.video.videoWidth;

      // set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      console.log("hands", hand)
      const ctx = canvasRef.current.getContext("2d");
      console.log("ctx",ctx)
      drawHand(hand,ctx)
    }

  }

  return (
    <div className="App">
      <h3>HandPose Detector</h3>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          right: 0,
          left: 0,
          zIndex: 9,
          height: "100%",
          width: "100%",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          right: 0,
          left: 0,
          zIndex: 9,
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}

export default App;
