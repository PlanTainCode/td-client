import React, {FC, useState, useEffect, ReactElement} from "react";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/auth";
import { Box, Container, HStack } from "@chakra-ui/react";

interface ILayout {
    children: any;
}

const Layout:FC<ILayout> = ({children}) => {

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
        // <div>
        //     {user && (
        //         <div>
        //             <p>@{(user.username).toLowerCase()}</p>
        //             <p>Email: {user.email}</p>
        //         </div>
        //     )}
        //     {children}
        //     <button onClick={() => logoutToken()}>Выйти</button>
        // </div>
        <>
            <HStack spacing={'auto'} ml={'3'} mr={'3'} mt={'3'} mb={'3'} borderWidth='1px' borderColor={'Menu'}>
                <Box>asdcasd</Box>
                <Box>asdcasd</Box>
            </HStack>
        </>
    )
}

export default Layout;
