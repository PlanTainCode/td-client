import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { loginUser } from '../../../api/auth';

import { useUserStore } from '../../../stores/userStore';

import InputFormAuth from '../../../UI/inputs/InputFormAuth/InputFormAuth';
import FormAuthButton from '../../../UI/buttons/FormAuthButton/FormAuthButton';
import { Box, Center, Container, Heading, Text, Link as LinkChakra } from '@chakra-ui/react';
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
            console.log(response.data.token)
            setToken(response.data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setToken(undefined);
        }
    };

    console.log(email, password)

    return (
        <Center w='100%' h="100vh" mt={'-120'}>
            <Container maxW={'sm'} h={'40'}>
                <Heading as='h1' size='lg' textAlign={'center'} mb={'6'}>Вход</Heading>
                
                <Box p={'4'} borderWidth='1px' borderColor='blue:900' borderRadius={'20'}>
                    <form onSubmit={login}>
                        <InputFormAuth value={email} setValue={setEmail} placeholder='Email' label='Почта' required type='text' />
                        <InputFormAuth value={password} setValue={setPassword} rightButton placeholder='Password' label='Пароль' required type='password' mb='2' mt='2' />
                        <FormAuthButton text='Авторизоваться' type='submit' />
                    </form>
                </Box>

                <Box mt={'2'} p={'4'} borderWidth='1px' borderColor='blue:900' borderRadius={'20'}>
                    <Text>Еще не зарагистрированы? <Link to='/register'><LinkChakra color='blue'>Регистрация</LinkChakra></Link></Text>
                </Box>
            </Container>
        </Center>
        
    );
};

export default LoginPage;
