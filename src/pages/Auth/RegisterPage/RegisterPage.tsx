import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { registerUser } from '../../../api/auth';

import { useUserStore } from '../../../stores/userStore';

import InputFormAuth from '../../../UI/inputs/InputFormAuth/InputFormAuth';
import FormAuthButton from '../../../UI/buttons/FormAuthButton/FormAuthButton';
import { Box, Center, Container, Heading, Text, Link as LinkChakra } from '@chakra-ui/react';

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
        <Center w='100%' h="100vh" mt={'-120'}>
            <Container maxW={'sm'} h={'40'}>
                <Heading as='h1' size='lg' textAlign={'center'} mb={'6'}>Регистрация</Heading>
                
                <Box p={'4'} borderWidth='1px' borderColor='blue:900' borderRadius={'20'}>
                    <form onSubmit={register}>
                        <InputFormAuth value={username} setValue={setUsername} leftButton placeholder='Username' label='Псевдоним' required type='text' />
                        <InputFormAuth value={email} setValue={setEmail} placeholder='Email' label='Почта' required type='text' mt='2' />
                        <InputFormAuth value={password} setValue={setPassword} rightButton placeholder='Password' label='Пароль' required type='password' mb='2' mt='2' />
                        <FormAuthButton text='Зарегистрироваться' type='submit' />
                    </form>
                </Box>

                <Box mt={'2'} p={'4'} borderWidth='1px' borderColor='blue:900' borderRadius={'20'}>
                    <Text>Уже зарагистрированы? <Link to='/login'><LinkChakra color='blue'>Вход</LinkChakra></Link></Text>
                </Box>
            </Container>
        </Center>
    );
};

export default RegisterPage;