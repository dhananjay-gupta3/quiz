import { useEffect, useState } from "react";
import { createQuiz, updateQuiz, getQuizzes } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizForm.css"; // Import the CSS file

export default function QuizForm() {
    const [form, setForm] = useState({ title: "", description: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchQuiz();
        }
    }, [id]);

    const fetchQuiz = async () => {
        const { data } = await getQuizzes(id);
        setForm({ title: data.title, description: data.description });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!form.title.trim() || !form.description.trim()) {
            setError("Title and Description cannot be empty.");
            return;
        }

        try {
            if (id) {
                await updateQuiz(id, form);
            } else {
                await createQuiz(form);
            }
            navigate("/dashboard");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="quiz-form-container">
            <h1 className="quiz-form-heading">{id ? "Edit Quiz" : "Create Quiz"}</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="quiz-form">
                <input
                    className="quiz-input"
                    placeholder="Quiz Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    className="quiz-textarea"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <button className="save-button" type="submit">Save</button>
            </form>
        </div>
    );
}