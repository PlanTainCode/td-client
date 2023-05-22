import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { loginUser } from '../../../api/auth';

import { useUserStore } from '../../../stores/userStore';

// 
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const setToken = useUserStore((state) => state.setToken);


    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await loginUser(email, password);
            setToken(response.data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setToken(undefined);
        }
    };

    return (
        <div>
            <form onSubmit={login}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <Link to='/register'>Регистрация</Link>
        </div>
    );
};

export default LoginPage;
