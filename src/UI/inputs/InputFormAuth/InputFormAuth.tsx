import React, {FC} from "react";
import './styles.scss';

interface IInputFormAuthProps {
    label?: string,
    placeholder?: string;
    value: any;
    setValue: (value: string) => void;
    isErr?: boolean;
    required?: boolean;
    type?: 'password' | 'text' | 'email';
    styleContainer?: any,
    styleLabel?: any,
    styleInput?: any,
}

const InputFormAuth:FC<IInputFormAuthProps> = ({
    value='', 
    setValue, 
    placeholder, 
    isErr = false, 
    label, 
    required=false, 
    type,
    styleContainer,
    styleLabel,
    styleInput,
}) => (
    <div 
        style={styleContainer && styleContainer} 
        className="styleContainer"
    >
        <p 
            style={styleLabel && styleLabel} 
            className="styleLabel"
        >{label}</p>

        <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            required={required} 
            className={isErr ? 'styleInput error' : 'styleInput'}
            style={styleInput && styleInput}
        />
    </div>
);

export default InputFormAuth;