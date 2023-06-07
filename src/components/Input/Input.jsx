import React from 'react';
import styles from './Input.module.css';

const Input = ({ changeHandler, value, keyUpHandler }) => {
  return (
    <>
      <span className={styles.task}>Task</span>
    <input
      type="text"
      className={styles.inputStyle}
      onChange={changeHandler}
      value={value}
      onKeyUp={keyUpHandler}
    />
    </>
  );
};

export default Input;
