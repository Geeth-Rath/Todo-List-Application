import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { RiLightbulbFill, RiCalendarFill } from "react-icons/ri";
import "../styles/TodoItem.css";

const TodoItem = (props) => {
  console.log("props to todoiteam:", props);
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const [textAreaValue, setTextAreaValue] = useState(item.item);
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    updateTodo({ ...item, priority: newPriority });
    setShowPrioritySelector(false);
  };

  const handleDateChange = (e) => {
    const newDeadline = e.target.value;
    updateTodo({ ...item, deadline: newDeadline });
    setShowCalendar(false);
  };

  const handleTextAreaChange = (e) => {
    const newText = e.target.value;
    setTextAreaValue(newText);
    updateTodo({ ...item, item: newText });
  };

  const getBulbColor = () => {
    switch (item.priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <li key={item.id} className="card">
      <textarea
        ref={inputRef}
        disabled={inputRef}
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
      <div className="btns">
        {!showPrioritySelector && (
          <RiLightbulbFill
            onClick={() => setShowPrioritySelector(true)}
            style={{
              color: getBulbColor(),
              fontSize: "24px",
              marginRight: "11px",
            }}
            className="light-bulb"
          />
        )}
        {showPrioritySelector && (
          <select
            value={item.priority}
            onChange={handlePriorityChange}
            className="priority-selector"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        )}
        {!showCalendar && (
          <RiCalendarFill
            onClick={() => setShowCalendar(true)}
            style={{ color: "blue", fontSize: "24px", marginRight: "9px" }}
            className="calander-icon"
          />
        )}
        {showCalendar && (
          <input
            type="date"
            className="deadline-input"
            value={item.deadline}
            onChange={handleDateChange}
          />
        )}

        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          <AiFillEdit />
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          <IoClose />
        </motion.button>
      </div>
      {item.completed && <span className="completed">done</span>}
    </li>
  );
};

export default TodoItem;
