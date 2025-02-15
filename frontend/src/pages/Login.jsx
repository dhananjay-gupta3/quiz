import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css'; // Import the CSS file

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            navigate("/dashboard");
        } catch {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    className="login-input"
                    placeholder="Username"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    );
}