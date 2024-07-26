import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import ideaReducer from "./features/ideaLog/ideaLogSlice";
import { loadState, saveState } from "@/utils/storage";

const persistedState = loadState();
// const persistedState = loadState() || { todos: [] };

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    ideas: ideaReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});
