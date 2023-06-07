import React from 'react';
const Button=({clickHandler,btnText,btnStyles})=>{
    return (
        <button onClick={clickHandler} className={btnStyles}>{btnText}</button>
    );
};

export default Button;