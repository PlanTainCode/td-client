import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/auth';
import { useUserStore } from '../../../stores/userStore';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const setToken = useUserStore((state) => state.setToken);

    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await registerUser(username, email, password);
            setToken(response.data.token);
            navigate('/');  // redirect to home page
        } catch (error) {
            console.error(error);
            setToken(undefined); // В случае ошибки убедитесь, что токен был удалён
        }
    };

    return (
        <div>
        <form onSubmit={register}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        <Link to='/login'>Логин</Link>
        </div>
    );
};

export default RegisterPage;