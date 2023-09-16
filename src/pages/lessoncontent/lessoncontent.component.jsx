import React, {useState, useEffect} from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import WebcamStreamCapture from "../../components/webcam-stream-capture/webcam-stream-capture.component";

import "./lessoncontent.styles.css"
// import data from "../../firebase/db.json";
import Button from '@mui/material/Button';
import axios from "axios";

import LinearWithValueLabel from "../../components/progress-bar.component/progress-bar.component";

function LessonContent() {
    let { lesson } = useParams();
    let navigate = useNavigate();
    let videoConstraints = {
        facingMode: "user"
    };

    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

    const [progress, setProgress] = useState(0)
 
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/data").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);

    const decreaseProgress = () => {
        setProgress(progress-20);
      };
      const increaseProgress = () => {
        setProgress(progress+20);
      };

    return (
        <div>
            <div className="lesson-header">
                <h1>{lesson}</h1>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </div>

            <LinearWithValueLabel progress={progress}/>
            
            <div class="grid-container">
                <Button className="back-button" onClick={decreaseProgress}>Button 1</Button>
                <WebcamStreamCapture>Webcam</WebcamStreamCapture>
                <Button className="next-button" onClick={increaseProgress}>Button 2</Button>
            </div>
            <div>{data.name}</div>
        </div>
    );
  }

export default LessonContent;