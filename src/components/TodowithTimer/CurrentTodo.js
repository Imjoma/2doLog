import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CurrentTodo = ({ font, isFocus }) => {
  const todoList = useSelector((state) =>
    state.todos.list.filter((state) => state.isDone === false)
  );

  const currentTodo = todoList[0]?.todoName;
  const fixedTodo = "⏲️ Pomodoro is the goat";
  const isBreak = !isFocus ? "Mandatory breaks" : currentTodo;

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div
      className={
        font +
        " relative text-2xl whitespace-nowrap marquee-container overflow-hidden  w-64 select-none"
      }
    >
      <div
        className={`
      ${currentTodo?.length >= 25 ? "todo-text " : " inline-block"}
        w-64 truncate
        `}
      >
        {mount ? <span>{isBreak || fixedTodo}</span> : <span>Loading...</span>}
      </div>

      {/* Marquee Items */}
      {currentTodo?.length >= 25 && (
        <>
          <div className="marquee-text">
            <span>{isBreak || fixedTodo}</span>
          </div>
          <div className="marquee-text">
            <span>{isBreak || fixedTodo}</span>
          </div>
        </>
      )}

      {/* text fade */}
      {currentTodo?.length >= 25 && (
        <div className="absolute top-0 left-0 flex-row items-center justify-between w-full todo-fade ">
          <div className="w-8 h-8 bg-gradient-to-r from-white to-transparent"></div>
          <div className="w-8 h-8 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default CurrentTodo;
