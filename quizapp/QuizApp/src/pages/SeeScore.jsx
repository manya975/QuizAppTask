import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SeeScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get location object to read query params

  // Retrieve email from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`http://localhost:7099/quiz/getScores?email=${email}`);
        setScores(response.data); // Set scores to the response data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setLoading(false);
      }
    };

    if (email) {
      fetchScores();
    }
  }, [email]);

  if (loading) {
    return <div>Loading scores...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Your Quiz Scores</h1>
      {scores.length === 0 ? (
        <p>No scores found.</p>
      ) : (
        <table style={{ margin: "auto", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Quiz ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{score.quizId}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SeeScores;
