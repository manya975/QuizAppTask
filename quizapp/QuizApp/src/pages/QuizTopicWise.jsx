import React, { useEffect, useState } from "react";

function QuizTypeWise() {
  const [topics, setTopics] = useState([]); // Store topics
  const [quizzes, setQuizzes] = useState([]); // Store quizzes for a topic
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch topics when the component loads
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:7096/question/getTopics")
      .then((response) => response.json())
      .then((data) => {
        setTopics(data); // Assuming `data` is an array of topics
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load topics. Please try again.");
        setLoading(false);
      });
  }, []);

  // Function to handle button click
  const handleTopicClick = (topic) => {
    setLoading(true);
    fetch(`http://localhost:7096/question/getQuizByTopic?topic=${topic}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data); 
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load quizzes for this topic.");
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Quiz Topics</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "20px" }}>
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => handleTopicClick(topic)}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      {quizzes.length > 0 && (
        <div>
          <h2>Quizzes for Selected Topic</h2>
          <ul>
            {quizzes.map((quiz, index) => (
              <li key={index}>{quiz.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizTypeWise;
