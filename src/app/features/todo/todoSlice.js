import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  list: [
    // Example: todo template
    // {
    //   id: uuidv4(),
    //   isDone: false,
    //   todoName: "leasals",
    //   time: 25,
    //   optional: {
    //     isHidden: false,
    //     repitition: ["Monday", "Friday"],
    //     priority: "High",
    //   },
    // },
  ],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const {
        todoName,
        time,
        optional: { repitition, priority },
      } = action.payload;

      state.list.push({
        id: uuidv4(),
        isDone: false,
        todoName,
        time,
        optional: {
          isHidden: false,
          repitition,
          priority,
        },
      });
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
    toggleIsDone: (state, action) => {
      const { id } = action.payload;
      const toggleTodo = state.list.find((todo) => todo.id === id);
      if (toggleTodo) {
        toggleTodo.isDone = !toggleTodo.isDone;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleIsDone } = todoSlice.actions;
export default todoSlice.reducer;
