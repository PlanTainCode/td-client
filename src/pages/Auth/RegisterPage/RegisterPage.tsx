import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { registerUser } from '../../../api/auth';

import { useUserStore } from '../../../stores/userStore';

import InputFormAuth from '../../../UI/inputs/InputFormAuth/InputFormAuth';
import FormAuthButton from '../../../UI/buttons/FormAuthButton/FormAuthButton';

import '../LoginPage/styles.scss'

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
            navigate('/'); 
        } catch (error) {
            console.error(error);
            setToken(undefined);
        }
    };

    return (

        <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='styleContainerForm'>
                <h1>Регистрация</h1>

                <form onSubmit={register} className='styleForm'>
                    <InputFormAuth value={username} setValue={setUsername} placeholder='Username' label='Псевдоним' required type='text' />
                    <InputFormAuth value={email} setValue={setEmail} placeholder='Email' label='Почта' required type='email' />
                    <InputFormAuth value={password} setValue={setPassword} placeholder='Password' label='Пароль' required type='password' />
                    <FormAuthButton text='Зарегистрироваться' type='submit' />
                </form>

                <div className="styleBlock">
                    <p>Уже зарагистрированы? <Link to='/login'>Вход</Link></p>
                </div>
                
            </div>
        </div>
    );
};

export default RegisterPage;