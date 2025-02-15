import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (credentials) => API.post('/auth/login', credentials);
export const getQuizzes = () => API.get('/quizzes');
export const createQuiz = (data) => API.post('/quizzes', { ...data, userId: 1 });  // Default userId = 1
export const updateQuiz = (id, data) => API.put(`/quizzes/${id}`, data);
export const deleteQuiz = (id) => API.delete(`/quizzes/${id}`);
