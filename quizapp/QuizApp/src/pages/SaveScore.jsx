import axios from "axios";

const SaveScore = async (quizId, score, maxScore) => {
  try {
    const response = await axios.post(
      "http://localhost:7099/saveScore",
      {
        quizId,
        score,
        maxScore,
      },
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    console.log(response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error saving score:", error);
    throw error;
  }
};

export default SaveScore;
