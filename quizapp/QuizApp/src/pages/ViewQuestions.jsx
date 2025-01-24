import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewQuestions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:7099/questions/allQuestions");
            console.log("Fetched Questions:", response.data);
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };
    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:7099/questions/delete/${id}`);
            alert("Question deleted successfully!");
            fetchQuestions(); 
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <div className="questions-container">
            <h1>Questions List:</h1>
            {questions && questions.length > 0 ? (
                <ul className="questions-list">
                    {questions.map((question) => (
                        <li key={question.id} className="question-item">
                            <div className="question-content">
                                <strong>{question.ques}</strong> - {question.category}
                            </div>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                DELETE
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions available.</p> 
            )}
        </div>
    );
}

export default ViewQuestions;
