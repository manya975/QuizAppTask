import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();  
  const [question, setQuestion] = useState({
    topic: '',
    ques: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: ''
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:7099/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7099/questions/update/${id}`, question);
      alert('Question updated successfully!');
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div>
      <h2>Update Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topic"
          value={question.topic}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="text"
          name="ques"
          value={question.ques}
          onChange={handleChange}
          placeholder="Question"
          required
        />
        <input
          type="text"
          name="option1"
          value={question.option1}
          onChange={handleChange}
          placeholder="Option 1"
          required
        />
        <input
          type="text"
          name="option2"
          value={question.option2}
          onChange={handleChange}
          placeholder="Option 2"
          required
        />
        <input
          type="text"
          name="option3"
          value={question.option3}
          onChange={handleChange}
          placeholder="Option 3"
          required
        />
        <input
          type="text"
          name="option4"
          value={question.option4}
          onChange={handleChange}
          placeholder="Option 4"
          required
        />
        <input
          type="text"
          name="rightAnswer"
          value={question.rightAnswer}
          onChange={handleChange}
          placeholder="Right Answer"
          required
        />
        <button type="submit">Update Question</button>
      </form>
    </div>
  );
}

export default Update;
