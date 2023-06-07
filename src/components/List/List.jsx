import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './List.module.css';

const List = ({
  items,
  isCheckHandler,
  deleteHandler,
  swapHandler,
  editHandler,
  cancelEditHandler,
  editingHandler,
  saveEditHandler,
  isDatePassedMsg,
}) => {
  const list = items.map((task, index) => (
    <div
      key={index}
      className={
        task.isCheck ? `${styles.list} ${styles.taskHilighting}` : styles.list
      }
    >
      {task.isEdit && (
        <>
          <Input
            value={task.editingItem}
            changeHandler={(e) => {
              const item = e.target.value;
              editingHandler(index, item);
            }}
          />
          <Button
            btnStyles={styles.btn}
            btnText="Save"
            clickHandler={() => {
              saveEditHandler(index);
            }}
          />
          <Button
             btnStyles={styles.btn}
            btnText="Cancel"
            clickHandler={() => {
              cancelEditHandler(index);
            }}
          />
        </>
      )}
      {!task.isEdit && (
        <>
          <input type="checkbox"  checked={task.isCheck} onChange={()=>{
          isCheckHandler(index);
          }}/>
      {task.isCheck && (
         <li className={styles.checked}>{task.item}</li> 
      )}
          {!task.isCheck && (
          <>
            <li className={styles.task}>{task.item}
              {task.isDatePassed &&(
            <p>{isDatePassedMsg}</p>
            )} 
              {!task.isDatePassed &&(
            <p>(Due Date:  {task.taskdate})</p>
            )} 
              </li>
          </>
          )}
          
          <Button
            btnStyles={styles.btn}
            btnText="Edit"
            clickHandler={() => {
              editHandler(index);
            }}
            disabled={task.isDone}
          />
        </>
      )}
      <Button
         btnStyles={styles.btn}
        btnText="UP"
        clickHandler={() => {
          swapHandler(index, index - 1);
        }}
        disabled={index === 0}
      />
      <Button
        btnStyles={styles.btn}
        btnText="DOWN"
        clickHandler={() => {
          swapHandler(index, index + 1);
        }}
        disabled={index === items.length - 1}
      />
      {task.isCheck && (
       <Button
          btnStyles={styles.btn}
          btnText="Delete"
          clickHandler={() => {
            deleteHandler(index);
          }}
        />
      )}
    </div>
  ));

  return (
    <div className={styles.listContainer}>
      <span>{list}</span>
      
      
    </div>
  );
};

export default List;
