import React, {useState} from "react";

import Webcam from "react-webcam";

import axios from "axios";

import "./webcam-stream-capture.component.css"

const WebcamStreamCapture = ({val, setVal}) => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        // formData.append("file", file);
    
        try {
          axios.post("http://localhost:5002/upload", formData).then((res) => {
            console.log(res.data.answer);
            setVal(res.data.answer);
            setRecordedChunks([]);
          });
          alert("File uploaded successfully");
        } catch (error) {
          console.error(error);
        }
    
    };
  
    return (
      <>
      <div className="webcam-container">
        <Webcam audio={false} ref={webcamRef} />
        {capturing ? (
          <div className="start-capture">
            <button onClick={handleStopCaptureClick} style={{
              padding: "10px 20px",
              fontsize: "16",
              border: "1px solid #ccc",
              background: "rgb(224, 88, 88)",
              color: "#fff",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}>Stop Capture</button>
          </div>
        ) : (
          <button onClick={handleStartCaptureClick} style={{
            padding: "10px 20px",
            fontsize: "16",
            border: "1px solid #ccc",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}>Start Capture</button>
        )}
        <div className="upload-button">
          {recordedChunks.length > 0 && (
            <button onClick={handleSubmit} style={{
              padding: "10px 20px",
              fontsize: "16",
              border: "1px solid #ccc",
              background: "#1caf3a",
              color: "#fff",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}>Upload</button>
          )}
        </div>
        <div>{val}</div>
        </div>
      </>
    );
};

export default WebcamStreamCapture;