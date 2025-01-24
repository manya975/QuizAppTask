import axios from 'axios';
import React from 'react';

function Delete({ questionId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7099/questions/delete/${questionId}`);
      alert('Question deleted successfully!');
      onDelete(); 
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
      Delete
    </button>
  );
}

export default Delete;
