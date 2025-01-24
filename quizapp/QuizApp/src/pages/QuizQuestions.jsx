import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QuizQuestions() {
  const { id } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:7096/quiz/${id}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz questions:", error));
  }, [id]);

  const handleChange = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleSubmit = () => {
    const answers = Object.entries(responses).map(([questionId, response]) => ({
      questionId: parseInt(questionId),
      response,
    }));

    fetch(`http://localhost:7096/quiz/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/quiz/${id}/result`, { state: { score: data } });
      })
      .catch((error) => console.error("Error submitting answers:", error));
  };

  return (
    <div>
      <h1>Quiz Questions</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.ques}</p>
          {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => handleChange(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
}

export default QuizQuestions;
