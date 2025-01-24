import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function QuizList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); 
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:7099/quiz/getTopics");
        setTopics(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleSelect = (id) => {
    if (email) {
      navigate(`/attempt-quiz/${id}?email=${email}`);
    } else {
      console.error("Email is missing.");
    }
  };

  if (loading) {
    return <div>Loading topics...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "green" }}>SELECT A QUIZ</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {topics.map((topic, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <button
              onClick={() => handleSelect(topic.id)} 
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                border: "2px solid green",
                borderRadius: "5px",
              }}
            >
              {topic.category} 
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
