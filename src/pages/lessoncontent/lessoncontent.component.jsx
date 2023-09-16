import React, {useState, useEffect} from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import WebcamStreamCapture from "../../components/webcam-stream-capture/webcam-stream-capture.component";

import "./lessoncontent.styles.css"
// import data from "../../firebase/db.json";
import Button from '@mui/material/Button';
import BasicModal from "../../components/modal/modal.component";
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
    const [val, setVal] = useState(false);
 
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

    const increaseProgress = () => {
        if (val) {
            setProgress(progress+20);
        }
        setVal(false)
    };

    return (
        <div>
            <div className="lesson-header">
                <h1>{lesson}</h1>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </div>

            <div className="progress-bar">
                <LinearWithValueLabel progress={progress}/>
            </div>
            

                <div className="web-cam">
                    <WebcamStreamCapture val={val} setVal={setVal}>Webcam</WebcamStreamCapture>
                </div>
                <Button
                    className="next-button" 
                    onClick={increaseProgress}
                    disabled={val ? false : true}
                    >NEXT
                </Button>
                <Button
                    className="complete-button"
                    onClick={() => navigate(-1)}
                    disabled={progress === 100 ? false : true}
                    >Complete
                </Button>

                <BasicModal progress={progress}/>

            <div>{data.name}</div>
        </div>
    );
  }

export default LessonContent;