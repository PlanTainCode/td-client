import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement, IconButton, Text, Box, InputLeftElement } from "@chakra-ui/react";
import React, {FC} from "react";

interface IInputFormAuthProps {
    label?: string,
    placeholder?: string;
    value: any;
    setValue: (value: string) => void;
    isErr?: boolean;
    required?: boolean;
    type?: 'password' | 'text' | 'email';
    rightButton?: boolean,
    leftButton?: boolean,
    mb?: string,
    mt?: string,
}

const InputFormAuth:FC<IInputFormAuthProps> = ({
    value='', 
    setValue, 
    placeholder, 
    isErr = false, 
    label, 
    required=false, 
    type = 'text',
    rightButton = false,
    leftButton = false,
    mt,
    mb,
}) => {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleChange = (event: any) => setValue(event.target.value)
    
    return (
        <Box mt={mt} mb={mb}>
            <Text as="b" fontSize={"sm"} >{label}</Text>
            {/* {type === 'text' ? (
                <Input
                    mt={'1'}
                    type={type}
                    placeholder={placeholder}
                    isRequired={required}
                    onChange={handleChange}
                    value={value}
                    errorBorderColor='crimson'
                    isInvalid={isErr}
                />
            ) : ( */}
                <InputGroup size='md' mt={'1'}>
                    {leftButton &&
                        <InputLeftElement>
                            <Box>
                                <AtSignIcon />
                            </Box>
                        </InputLeftElement>
                    }
                    <Input
                        isInvalid={isErr}
                        pr='10'
                        type={type === 'password' ? ( show ? 'text' : 'password') : type}
                        placeholder={placeholder}
                        errorBorderColor='crimson'
                        value={value}
                        onChange={handleChange}
                    />
                    {rightButton && 
                        <InputRightElement width='10'>
                            <IconButton 
                                aria-label="View"
                                icon={
                                    show ? (
                                        <ViewOffIcon />
                                    ): (
                                        <ViewIcon />
                                    )
                                } 
                                onClick={handleClick}
                                size="sm"
                            />
                        </InputRightElement>
                    }
                    
                </InputGroup>
            {/* )} */}
        </Box>
)};

export default InputFormAuth;