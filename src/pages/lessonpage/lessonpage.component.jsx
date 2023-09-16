import React from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import "./lessonpage.component.css"
import data from "../../firebase/db.json"
import Button from '@mui/material/Button';

function LessonPage() {
    let { num } = useParams();
    let navigate = useNavigate();

    return (
        <div>
            <div className="lesson-header">
                <h1>Lesson {num}</h1>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </div>
            <div className="circle-grid">
                {
                    data[`lesson${num}`]["lessons"].map((lesson, idx) => (
                        <Link className="lesson-links circle" to={lesson} key={idx}>
                            <div>{lesson}</div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
  }

export default LessonPage;