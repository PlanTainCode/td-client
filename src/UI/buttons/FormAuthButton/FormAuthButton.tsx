import { Button } from '@chakra-ui/react';
import React, {FC} from 'react';

interface IFormAuthButton {
    text: string,
    type?: "button" | "submit" | "reset",
}

const FormAuthButton:FC<IFormAuthButton> = ({text, type}) => {

    return (
        <Button 
            colorScheme='blue' 
            width={'full'} 
            mt={'3'} 
            type={type}
        >{text}</Button>
    )
}

export default FormAuthButton;
