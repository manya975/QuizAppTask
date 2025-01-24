import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Admin.css";

function Admin() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    const handleCreateQuiz = () => {
        navigate("/create-quiz");
    };
    const handleViewQuestions = () => {
        navigate("/view-questions");
    };

    const handleAddQuestion = () => {
        navigate("/add-question");
    };

    return (
        <>
            <div>
                <h1>!! Hello Admin !!</h1>
                <h3>Welcome to Admin Portal</h3>
            </div>
            <div className="options">
                <h2>Functionalities available are:</h2>
                <button name="create" onClick={handleCreateQuiz}>
                    CREATE QUIZ
                </button>
                <button name="view" onClick={handleViewQuestions}>
                    VIEW ALL QUESTIONS
                </button>
                <button name="add" onClick={handleAddQuestion}>
                    ADD QUESTION
                </button>
            </div>
        </>
    );
}

export default Admin;
