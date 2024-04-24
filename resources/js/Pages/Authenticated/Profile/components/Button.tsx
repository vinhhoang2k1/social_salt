import React from "react";

type Props = {
    text: string;
    onClick?: () => void;
};

const Button = (props: Props) => {
    const { text, onClick } = props;

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button className="profile-btn" onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;
