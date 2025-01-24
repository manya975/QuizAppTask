import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Admin.css";

function AddQuestion() {
    const navigate = useNavigate();
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        answer: "",
        category: ""
    });

    const handleCreateQuestion = async (e) => {
        e.preventDefault();

        if (!newQuestion.question || !newQuestion.answer || !newQuestion.category) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post("http://localhost:7099/questions/add", newQuestion);
            alert("Question added successfully!");
            setNewQuestion({ question: "", answer: "", category: "" }); 
            navigate("/admin");
        } catch (error) {
            console.error("Error creating question:", error);
        }
    };

    return (
        <>
            <div>
                <h1>Add a New Question</h1>
            </div>
            <div className="question-form">
                <form onSubmit={handleCreateQuestion}>
                    <div>
                        <label>Question:</label>
                        <input
                            type="text"
                            value={newQuestion.question}
                            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Answer:</label>
                        <input
                            type="text"
                            value={newQuestion.answer}
                            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            value={newQuestion.category}
                            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit">Add Question</button>
                </form>
            </div>
        </>
    );
}

export default AddQuestion;
