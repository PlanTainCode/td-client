import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { loginUser } from '../../../api/auth';

import { useUserStore } from '../../../stores/userStore';

import InputFormAuth from '../../../UI/inputs/InputFormAuth/InputFormAuth';
import FormAuthButton from '../../../UI/buttons/FormAuthButton/FormAuthButton';

import './styles.scss';
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
        <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='styleContainerForm'>
                <h1>Вход</h1>

                <form onSubmit={login} className='styleForm'>
                    <InputFormAuth value={email} setValue={setEmail} placeholder='Email' label='Почта' required type='email' />
                    <InputFormAuth value={password} setValue={setPassword} placeholder='Password' label='Пароль' required type='password' />
                    <FormAuthButton text='Авторизоваться' type='submit' />
                </form>

                <div className="styleBlock">
                    <p>Еще не зарагистрированы? <Link to='/register'>Регистрация</Link></p>
                </div>
                
            </div>
        </div>
        
    );
};

export default LoginPage;
