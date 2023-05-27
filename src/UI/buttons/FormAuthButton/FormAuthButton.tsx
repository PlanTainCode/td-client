import React, {FC} from 'react';
import './styles.scss';

interface IFormAuthButton {
    text: string,
    type?: "button" | "submit" | "reset",
    styleButton?: any,
}

const FormAuthButton:FC<IFormAuthButton> = ({text, type,styleButton}) => {

    return (
        <button
            type={type}
            style={styleButton && styleButton}
            className='styleButton'
        >{text}</button>
    )
}

export default FormAuthButton;
