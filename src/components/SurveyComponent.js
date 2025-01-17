import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyComponent = () => {
    const [surveys, setSurveys] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        const response = await axios.get('http://localhost:5000/surveys');
        setSurveys(response.data);
    };

    const addSurvey = async () => {
        const response = await axios.post('http://localhost:5000/surveys', { question: newQuestion });
        setSurveys([...surveys, response.data]);
        setNewQuestion("");
    };

    const likeSurvey = async (id) => {
        await axios.put(`http://localhost:5000/surveys/${id}/like`);
        fetchSurveys();
    };

    const rateSurvey = async (id, stars) => {
        await axios.put(`http://localhost:5000/surveys/${id}/rate`, { stars });
        fetchSurveys();
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Survey System</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addSurvey}>
                    Add Survey
                </button>
            </div>
            <div className="list-group">
                {surveys.map((survey) => (
                    <div key={survey._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{survey.question}</h5>
                            <p>
                                Likes: {survey.likes} | 
                                Average Rating: {survey.totalRatings > 0 ? (survey.stars / survey.totalRatings).toFixed(1) : "N/A"}
                            </p>
                        </div>
                        <div>
                            <button
                                className="btn btn-success me-2"
                                onClick={() => likeSurvey(survey._id)}
                            >
                                👍 Like
                            </button>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className="btn btn-warning me-1"
                                    onClick={() => rateSurvey(survey._id, star)}
                                >
                                    {star} ⭐
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyComponent;
