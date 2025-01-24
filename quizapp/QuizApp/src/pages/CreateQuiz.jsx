import axios from "axios";
import React, { useState } from "react";
import "../pages/form.css";

const CreateQuiz = () => {
    const [formData, setFormData] = useState({
        category: "",
        numOfQues: "",
        title: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { category, numOfQues, title } = formData;

        if (!category || !numOfQues || !title) {
            setError("All fields are required");
            return;
        }

        setError("");
        const url = `http://localhost:7099/quiz/create?category=${category}&numOfQues=${numOfQues}&title=${title}`;

        try {
            await axios.post(url, null, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSuccess("Quiz created successfully!");
            setFormData({ category: "", numOfQues: "", title: "" });
        } catch (error) {
            setError("Error creating quiz. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>Create a Quiz</h1>
            <form onSubmit={handleSubmit}>
                <input  type="text" name="category" placeholder="Enter Quiz Category" value={formData.category} onChange={handleChange} />
                <input type="number"  name="numOfQues" placeholder="Number of Questions" value={formData.numOfQues} onChange={handleChange} />
                <input type="text"  name="title"  placeholder="Quiz Title" value={formData.title} onChange={handleChange}/>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
