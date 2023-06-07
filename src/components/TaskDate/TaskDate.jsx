import React from 'react';
import styles from './TaskDate.module.css';
const TaskDate = ({dateChangeHandler, value}) => {
  return(
    <>
      <span className={styles.date}>Complition Date</span>
        <input type='date' onChange={dateChangeHandler} value={value}/>
    </>
  );
};
export default TaskDate;