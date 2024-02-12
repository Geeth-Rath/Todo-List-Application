import { createSlice } from "@reduxjs/toolkit";

const savedTodos = JSON.parse(localStorage.getItem("todos"));

const initialState = savedTodos || []; 

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Adding todos
    addTodos: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state)); 
    },
    // Remove todos
    removeTodos: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newState)); 
      return newState;
    },
    // Update todos
    updateTodos: (state, action) => {
      const newState = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newState)); 
      return newState;
    },
    // Complete todos
    completeTodos: (state, action) => {
      const newState = state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
