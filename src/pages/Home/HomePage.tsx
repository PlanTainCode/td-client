import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../api/auth';

interface User {
    id: number;
    username: string;
    email: string;
}

const HomePage: React.FC = () => {
    
    const [user, setUser] = useState<any | null>(null);
    
    const token = useUserStore((state) => state.token);
    const navigate = useNavigate();

    const setToken = useUserStore((state) => state.setToken);

    React.useEffect(() => {
        if (!token) navigate('/login');
        else {
            getProfile(token)
            .then((userData) => {
                setUser(userData.data)
                console.log(userData)
            })
            .catch((error) => {
                console.error(error);
                navigate('/login');
            });
        }
    }, [token, navigate]);

    const logoutToken = () => {
        setToken(undefined)
    }

    return (
        <div>
            <h1>Home Page</h1>
            {user && (
            <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
            )}
            <button onClick={() => logoutToken()}>Выйти</button>
        </div>
    )
};

export default HomePage;