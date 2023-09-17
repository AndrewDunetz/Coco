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

    const wordsArray = ["hello", "you", "how", "thankyou", "please"];

    const [progress, setProgress] = useState(0)
    const [val, setVal] = useState("");
    const [index, setIndex] = useState(0);

    const [currentWord, setWord] = useState(wordsArray[index]);
 
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
        console.log(val);
        console.log(currentWord);
        if (val === currentWord) {
            var newIndex = index + 1
            setProgress(progress+20);
            setIndex(newIndex);
            setWord(wordsArray[newIndex])
        }
        setVal("")
    };

    // Array of all the 5 words
    // Make it display the current word
    // Also make sure current word is the one being tested on

    return (
        <div>
            <div className="lesson-header">
                <h1>{lesson}</h1>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </div>

            <div className="progress-bar">
                <LinearWithValueLabel progress={progress}/>
            </div>

            <h2>{currentWord}</h2>
            

                <div className="web-cam">
                    <WebcamStreamCapture val={val} setVal={setVal}>Webcam</WebcamStreamCapture>
                    <Button
                        className="next-button"
                        variant="contained" 
                        onClick={increaseProgress}
                        disabled={val === currentWord ? false : true}
                        >NEXT
                    </Button>
                </div>

                <BasicModal progress={progress}/>

        </div>
    );
  }

export default LessonContent;