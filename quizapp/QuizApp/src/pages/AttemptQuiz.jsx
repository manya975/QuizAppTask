import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AttemptQuiz() {
  const { quizId } = useParams(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false); 
  const [error, setError] = useState(null); 
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:7099/quiz/get/${quizId}`);
        if (response.data.length === 0) {
          navigate("/pages/Student.jsx");
        } else {
          setQuestions(response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        navigate("/"); 
      } finally {
        setLoading(false); 
      }
    };
    fetchQuestions();
  }, [quizId, navigate]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption, 
    }));
  };
  
  const handleSubmit = async () => {
    if (!email) {
      console.error("Email is missing.");
      return;
    }
  
    const unansweredQuestions = questions.filter((question) => !answers[question.id]);
    if (unansweredQuestions.length > 0) {
      setError("Please answer all the questions before submitting.");
      return;
    }
  
    setSubmitting(true);
    setError(null);
  
    try {
      console.log("Questions:", questions);
  
      const responses = Object.keys(answers).map((questionId) => ({
        response: answers[questionId], 
      }));
  
      console.log("Submitting responses to backend:", responses);
  
      const response = await axios.post(
        `http://localhost:7099/quiz/submit/${quizId}`,
        responses 
      );
  
      const score = response.data; 
  
      console.log("Score calculated by backend:", score);
  
      const saveScoreResponse = await axios.post(
        `http://localhost:7099/quiz/saveScore?email=${email}`,
        { quizId, score, maxScore: questions.length } 
      );
  
      console.log("Score saved successfully:", saveScoreResponse.data);
  
      navigate(`/result`, { state: { score, maxScore: questions.length } });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("An error occurred while submitting the quiz. Please try again.");
    } finally {
      setSubmitting(false); 
    }
  };
  
  

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Attempt Quiz</h1>
      {loading ? (
        <p>Loading questions...</p> // Loading state
      ) : (
        questions.map((question) => (
          <div key={question.id} style={{ marginBottom: "20px", textAlign: "left" }}>
            <h3>Q{question.id}: {question.ques}</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[question.option1, question.option2, question.option3, question.option4].map((option, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`} // Unique name for each question group
                      value={option}
                      checked={answers[question.id] === option} // Set checked state
                      onChange={() => handleAnswerChange(question.id, option)} // Handle answer change
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <button
        onClick={handleSubmit}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        disabled={submitting} 
      >
        {submitting ? "Submitting..." : "Submit"} 
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {error} 
        </div>
      )}
    </div>
  );
}

export default AttemptQuiz;
