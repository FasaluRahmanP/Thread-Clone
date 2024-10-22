import React from 'react';

interface ReusableInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusableInput: React.FC<ReusableInputProps> = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            autoComplete="none"
            required
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-3 placeholder-white text-white"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default ReusableInput;
