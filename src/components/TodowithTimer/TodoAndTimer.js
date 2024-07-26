import { useState } from "react";
import { useDispatch } from "react-redux";

import Timer from "./Timer";
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import { addTodo } from "@/app/features/todo/todoSlice";

const TodoAndTimer = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(false);
  const [isTodo, setIsTodo] = useState(null);

  const isTodoName = isTodo?.todoName;

  const getTodoObj = (data) => {
    if (data?.todoName === "") {
      setIsTodo(null);
    } else {
      setIsTodo(data);
    }
  };

  const handleSubmitTodo = (e) => {
    e?.preventDefault();
    const isFormOpen = form;
    if (isFormOpen === false) return;
    // getChildValue ❗ rerenders the the whole component (isTodo) useState
    getTodoObj();

    if (isTodo) {
      dispatch(addTodo(isTodo));
      setForm(false);
    }
  };

  const handleOpenForm = () => {
    if (!form) {
      return setForm(true);
    }
    if (isTodoName !== undefined) {
      handleSubmitTodo();
      setForm(false);
    } else {
      setForm(true);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 sm:w-fit ">
      <Timer />
      <div className="relative overflow-hidden outline outline-slate-300 outline-1 rounded-xl">
        {/* Todo Display */}
        <Todo />
        {/* Create Todo */}
        <div>
          <div
            onClick={() => setForm(false)}
            className={`
          ${
            form
              ? "bg-opacity-60 pointer-events-auto"
              : "bg-opacity-0 pointer-events-none"
          }
          duration-300
          z-20
          absolute top-0 left-0 w-full h-full bg-black    `}
          ></div>

          <CreateTodo
            form={form}
            setForm={setForm}
            getTodoObj={getTodoObj}
            handleSubmitTodo={handleSubmitTodo}
          />
        </div>
      </div>

      {/* Open and Close Form*/}
      <div className="z-50 flex justify-center w-full -translate-y-14 ">
        <button
          onClick={handleOpenForm}
          disabled={form && !isTodoName ? true : false}
          className={` 
            ${
              !form
                ? "bg-[#2392E2]"
                : isTodoName
                ? "bg-[#2392E2]"
                : " bg-[#91c5ea]"
            }
 
            px-6 py-3 text-white rounded-full w-fit`}
        >
          {!form ? "+ New ToDo" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default TodoAndTimer;
