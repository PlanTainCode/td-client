import React, {FC, useState, useEffect, ReactElement} from "react";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/auth";
import { Avatar, Box, Button, Container, Grid, GridItem, HStack, IconButton, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text, VStack, WrapItem } from "@chakra-ui/react";
import toFirstUpperCase from "../../helpFuncs/toFirstUpperCase";
import LeftTabIcon from "../../assets/iconsComponents/leftTabIconActive";
import { CalendarIcon, ChatIcon, CheckIcon, StarIcon } from "@chakra-ui/icons";


interface ILayout {
    children: any;
}

const Layout:FC<ILayout> = ({children}) => {
    const [activeTab, setActiveTab] = useState<boolean>(true)
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

    const tooglePopup = () => {
        setActiveTab(!activeTab);
    }

    const menuData = [
        {
            id: 1,
            name: 'Домой',
            href: '/',
            icon: <StarIcon />,
        },
        {
            id: 2,
            name: 'Todos',
            href: '/todos',
            icon: <CheckIcon />,
        },
        {
            id: 3,
            name: 'Kanban',
            href: '/kanban',
            icon: <CalendarIcon />,
        },
        {
            id: 4,
            name: 'Чаты',
            href: '/chats',
            icon: <ChatIcon />,
        },
    ]
    
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <HStack spacing={'auto'} pb={'2'} pt={'2'} pr={'5'} pl={'5'} borderBottom='1px' borderColor={'gray.300'}>
                <Box>
                    <HStack>
                        <IconButton bg={'transparent'} aria-label='Toogle menu' onClick={tooglePopup} icon={<LeftTabIcon stroke="black" fill={activeTab ? 'black' : 'transparent'} />} />
                    </HStack>
                </Box>
                <Box>
                    <Popover placement='bottom-start'>
                        <PopoverTrigger>
                            <Avatar name={user?.username} size='sm' cursor={'pointer'} />
                        </PopoverTrigger>
                        <PopoverContent w={'250px'}>
                            <PopoverHeader>
                                <HStack>
                                    <Avatar name={user?.username} size='md' />
                                    <VStack align={'flex-start'} spacing={'0.5'} >
                                        <WrapItem>
                                            <Text>{toFirstUpperCase({string: user?.username})}</Text>
                                        </WrapItem>
                                        <WrapItem>
                                            <Text fontSize={'sm'}>{user?.email}</Text>
                                        </WrapItem>
                                    </VStack>
                                </HStack>
                                
                            </PopoverHeader>
                            <PopoverBody>
                                <VStack>
                                    <WrapItem>
                                        <Button width="200px" colorScheme='gray' onClick={() => logoutToken()}>Выйти</Button>
                                    </WrapItem>
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    
                </Box>
            </HStack>
            <Grid templateColumns={activeTab ? 'repeat(8, 1fr)' : 'repeat(20, 1fr)'} height={'90vh'}>
                <GridItem colSpan={1} borderRight='1px' borderColor={'gray.300'} >
                    <VStack alignItems={'center'}  pt={'5'} >
                        {menuData.map((item) => (
                            <WrapItem key={item.id}>
                                <Button 
                                    w={activeTab ? '200px' : '45px'} 
                                    transition={'all 0.1s ease 0s'} 
                                    justifyContent={'left'} 
                                    alignItems={"center"}
                                    onClick={() => navigate(item.href)}
                                    >
                                        {item.icon} 
                                        
                                        {activeTab && <Text fontSize={'md'} ml={'3'}>{item.name}</Text>}
                                </Button>
                            </WrapItem>
                        ))}
                    </VStack>
                </GridItem>
                <GridItem colSpan={activeTab ? 7 : 19} pt={'5'} pl={'5'} pr={'5'}>{children}</GridItem>
            </Grid>
        </div>
    )
}

export default Layout;
