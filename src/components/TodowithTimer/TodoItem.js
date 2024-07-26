import { useDispatch } from "react-redux";

import { deleteTodo, toggleIsDone } from "@/app/features/todo/todoSlice";

const TodoItem = ({ todo, moreButtons, setMoreButtons }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleIsDone({ id: todo.id }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleMoreButtons = (id) => {
    if (moreButtons === "") {
      setMoreButtons(id);
    }
    if (moreButtons !== id) {
      setMoreButtons(id);
    } else {
      setMoreButtons("");
    }
  };

  return (
    <div
      className={`
    relative w-full h-16`}
    >
      {/* todo item */}
      <div
        className={`
        ${
          moreButtons === todo.id
            ? "-translate-x-20"
            : "translate-x-0 hover:bg-slate-200"
        }
       absolute left-0 z-10 w-full px-6 py-2 overflow-hidden duration-200 -translate-y-1/2  top-1/2 bg-container`}
      >
        <div
          className={`
          flex flex-row items-center justify-between`}
        >
          {/* checkbox and todo */}
          <div
            className={`
              ${todo.id === moreButtons && "pointer-events-none opacity-40"}
        flex flex-row gap-6`}
          >
            <input
              checked={todo.isDone}
              onChange={handleToggleComplete}
              type="checkbox"
              className="origin-left scale-150"
              name="todo-item-checkbox"
              id="todo-item-checkbox"
            />
            <div
              className={` 
              flex flex-col`}
            >
              <p className="text-lg truncate w-60">{todo.todoName}</p>
              <div className="flex flex-row items-center h-6 ml-1 space-x-3">
                <div
                  className={`
                       ${todo.optional.priority === "Low" && "bg-yellow-400"}
            ${todo.optional.priority === "Mid" && "bg-orange-400"}
            ${todo.optional.priority === "High" && "bg-red-500"}
            w-[9px] h-[9px] rounded-full
            `}
                ></div>
                {todo.time > 0 && <p className="text-sm">{todo.time} mins.</p>}
              </div>
            </div>
          </div>
          {/* ... checkbox and todo */}

          <button
            className={` 
              w-6 h-6 rotate-90 bg-center bg-no-repeat bg-cover rounded-full hover:bg-slate-300`}
            style={{ backgroundImage: `url(assets/icons/more-vertical.svg)` }}
            onClick={() => handleMoreButtons(todo.id)}
          ></button>
        </div>
      </div>
      {/* more actions */}
      <div
        className={` absolute z-0 flex flex-row -translate-y-1/2 top-1/2 right-6`}
      >
        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="text-sm font-medium text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
