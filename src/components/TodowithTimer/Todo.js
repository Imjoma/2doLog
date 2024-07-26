import { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import TodoHeader from "./TodoHeader";

const Todo = () => {
  const todoList = useSelector((state) => state.todos.list);

  const [moreButtons, setMoreButtons] = useState("");

  return (
    <div
      id="style-1"
      style={{
        backgroundSize: "250px, auto",
        backgroundImage:
          todoList.length > 0 ? "none" : `url(assets/images/nomoretodos.svg)`,
      }}
      className={`w-full py-4 bg-no-repeat bg-center  overflow-hidden overflow-y-auto h-[500px] rounded-xl bg-container`}
    >
      <TodoHeader />
      {/* Todo Item */}
      {todoList.map((todo, idx) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          moreButtons={moreButtons}
          setMoreButtons={setMoreButtons}
        />
      ))}
    </div>
  );
};

export default Todo;
