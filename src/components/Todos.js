import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import "../styles/Todo.css";
import { Select } from "antd";

const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    console.log("data:", e);
    setDeadline(e.target.value);
    console.log("");
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const add = () => {
    if (todo === "") {
      alert("Empty values are not allowed");
    } else if (priority === "") {
      alert("Empty values are not allowed");
    } else if (deadline === "") {
      alert("Empty values are not allowed");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        deadline: deadline,
        priority: priority,
        completed: false,
      });
      setTodo("");
      setDeadline("");
      setPriority("");
    }
  };

  return (
    <div className="addTodos">
      <div className="input-container-main">
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="todo-input"
            placeholder="Enter task"
            value={todo}
          />
        </div>

        <button className="add-btn" onClick={() => add()}>
          <GoPlus />
        </button>
      </div>
      <br />
      <div className="date-picking">
        <input
          type="date"
          onChange={(date) => handleDeadlineChange(date)}
          className="deadline-picker"
          format="MM/DD/YYYY"
          placeholder="Select deadline"
          value={deadline}
        />
        <select
          onChange={(e) => handlePriorityChange(e.target.value)}
          value={priority}
          className="priority-picker"
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
