import { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS file

export default function Dashboard() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        const { data } = await getQuizzes();
        setQuizzes(data);
    };

    const handleDelete = async (id) => {
        await deleteQuiz(id);
        loadQuizzes();
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Quiz Dashboard</h1>
            <button className="add-quiz-button" onClick={() => navigate("/quiz-form")}>
                Add New Quiz
            </button>
            <ul className="quiz-list">
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="quiz-item">
                        <div className="quiz-content">
                            <h3>{quiz.title}</h3>
                            <p>{quiz.description}</p>
                            <p className="text-gray-400">Created on: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="quiz-actions">
                            <button className="edit-button" onClick={() => navigate(`/quiz-form/${quiz.id}`)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(quiz.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}