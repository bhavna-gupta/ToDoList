import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import List from '../List/List';
import TaskDate from '../TaskDate/TaskDate';
import styles from './ToDo.module.css';

const Todo = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [taskdate,setTaskdate]=useState('');
  const [isDatePassedMsg,setIsDatePassedMsg]=useState('');
  const[isDatePassed,setIsDatePassed]=useState(false);

  useEffect(() => {
    const todoList = JSON.parse(window.localStorage.getItem('todoList')) || [];
    setList(todoList);
  }, []);

  // ComponentDidUpdate method -- any task after the change in dependency list
  useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  const inputChangeHandler = (e) => {
    setText(e.target.value);
  };
  const dateChangeHandler =(e)=>{
   setIsDatePassed(false);
    setTaskdate(e.target.value);
   const newDate = (e.target.value);
    const currentDate = new Date();
    let year=currentDate.getFullYear();
    let month=currentDate.getMonth()
    month=month+1;
    if(month<10){
     month=`0 ${month}`; 
    }
    let day=currentDate.getDate();
    if(day<10){
      day=`0${day}`
    }

    const cDate=`${year}-${month}-${day}`;
    console.log("Entered date :", newDate);
    console.log("current date:", cDate);
    if (cDate > newDate) {
    console.log("Due Date is Passed.")
      setIsDatePassed(true);
      setIsDatePassedMsg("Task Due Date is Passed.")
    }
  };
  
  

  const btnClickHandler = () => {
    const item = text.trim();
    if (item) {
      const items = [...list];
      items.push({
        item,
        taskdate,
        isDatePassed,
        isCheck: false,
        isEdit: false,
        editingItem: item,
      });
      setList(items);
      setText('');
      setTaskdate('');
    }
  };

  const inputKeyUpHandler = (e) => {
    if (e.key === 'Enter') {
      btnClickHandler();
    }
  };
const isCheckHandler=(taskIndex)=>{
  const items = [...list];
    items[taskIndex].isCheck = !items[taskIndex].isCheck;
    setList(items);
}
  const editHandler = (taskIndex) => {
    const items = [...list];
    items[taskIndex].isEdit = true;
    setList(items);
  };

  const cancelEditHandler = (taskIndex) => {
    const items = [...list];
    items[taskIndex].isEdit = false;
    items[taskIndex].editingItem = items[taskIndex].item;
    setList(items);
  };

  const saveEditHandler = (taskIndex) => {
    const items = [...list];
    items[taskIndex].isEdit = false;
    items[taskIndex].item = items[taskIndex].editingItem;
    setList(items);
  };

  const deleteHandler = (taskIndex) => {
    const items = [...list];
    items.splice(taskIndex, 1);
    setList(items);
  };

  const swapHandler = (initTaskIndex, finalTaskIndex) => {
    const items = [...list];
    const item = items[initTaskIndex];
    items[initTaskIndex] = items[finalTaskIndex];
    items[finalTaskIndex] = item;
    setList(items);
  };

  const editingHandler = (taskIndex, newTaskName) => {
    const items = [...list];
    items[taskIndex].editingItem = newTaskName;
    setList(items);
  };

  return (
    <>
      <div className="mb-3">
        <Input
          changeHandler={inputChangeHandler}
          value={text}
          keyUpHandler={inputKeyUpHandler}
        />
        <TaskDate dateChangeHandler={dateChangeHandler} value={taskdate}/>
        <Button
	btnStyles={styles.addBtnStyle}
          clickHandler={btnClickHandler}
          btnText="Add to the List"
        />
        
      </div>
      <List
        items={list}
        isCheckHandler={isCheckHandler}
        deleteHandler={deleteHandler}
        swapHandler={swapHandler}
        editHandler={editHandler}
        cancelEditHandler={cancelEditHandler}
        editingHandler={editingHandler}
        saveEditHandler={saveEditHandler}
        isDatePassedMsg={isDatePassedMsg}
      />
    </>
  );
};

export default Todo;
