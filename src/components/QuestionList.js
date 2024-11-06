import React from "react";

function QuestionList({ questions, onDelete, onUpdateCorrectAnswer }) {
  const handleCorrectAnswerChange = (id, event) => {
    onUpdateCorrectAnswer(id, parseInt(event.target.value)); // Pass the correct index
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <select
              value={question.correctIndex}
              onChange={(event) => handleCorrectAnswerChange(question.id, event)}
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => onDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
