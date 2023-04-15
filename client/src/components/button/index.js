import React from "react";

const Button = props => {
    const { colStyle, text, buttonStyle } = props;
    return (
        <div className={colStyle}>
            <button className={buttonStyle} type="submit">
                {text}
            </button>
        </div>
    );
}

export default Button;