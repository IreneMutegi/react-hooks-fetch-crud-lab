import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  // Fetch questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Update the state after successful delete
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });

      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      } else {
        console.error("Failed to update correct answer");
      }
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  };

  return (
    <div>
      <AdminNavBar onChangePage={setPage} />
      {page === "List" && (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
      {page === "Form" && <QuestionForm onAddQuestion={handleAddQuestion} />}
    </div>
  );
}

export default App;
