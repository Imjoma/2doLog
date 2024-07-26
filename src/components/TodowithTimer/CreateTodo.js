import { useState, useEffect, useCallback, useRef } from "react";

const CreateTodo = ({ form, setForm, getTodoObj, handleSubmitTodo }) => {
  const isFormOpen = form;
  const fixedDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getDay = new Date().getDay();
  const currentDay = fixedDays[getDay];
  const fixedPriority = ["Low", "Mid", "High"];

  const [day, setDay] = useState([currentDay]);
  const [priority, setPriority] = useState("Low");
  const [time, setTime] = useState(5);
  const [isTodoName, setIsTodoName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      if (isFormOpen) {
        inputRef?.current.focus();
      } else {
        inputRef?.current.blur();
      }
    }, [75]);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFormOpen]);

  const handleTodoName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setIsTodoName(value);
  };

  const handleTodoObj = () => {
    getTodoObj({
      todoName: isTodoName,
      time: Number(time),
      optional: {
        repitition: day,
        priority,
      },
    });
  };

  useEffect(() => {
    handleTodoObj();
  }, [isTodoName, time, day, priority]);

  const handleClearState = useCallback(() => {
    setIsTodoName("");
    setDay([currentDay]);
    setPriority("Low");
    setTime(5);
  }, [currentDay]);

  useEffect(() => {
    if (!isFormOpen) {
      handleClearState();
    }
  }, [isFormOpen]);

  return (
    <div
      className={`
    ${
      isFormOpen
        ? "translate-y-0 pointer-events-auto"
        : "pointer-events-none translate-y-[101%]"
    }
    duration-300
    z-30
    absolute bottom-0 left-0 w-full px-6 pt-6 pb-10 overflow-hidden overflow-y-auto bg-white rounded-t-xl`}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-medium">Create ToDo</h3>
          <button
            className={`
              ${isFormOpen ? "inline-block" : "hidden"}
               scale-75 z-20 w-8 h-8 bg-center bg-no-repeat bg-cover`}
            style={{ backgroundImage: `url(assets/icons/close.svg)` }}
            onClick={() => setForm(false)}
          ></button>
        </div>
        <hr />
        <form
          onSubmit={(e) => handleSubmitTodo(e)}
          className="flex flex-col space-y-5 font-medium"
        >
          {/* todoName */}
          <input
            name="todo-name"
            onChange={(e) => handleTodoName(e)}
            className="text-lg outline-none "
            type="text"
            maxLength={50}
            value={isTodoName}
            ref={inputRef}
            autoComplete="off"
            placeholder="Add something ToDo 🗿"
          />
          {/* time */}
          <Time time={time} setTime={setTime} />
          {/* repitition */}
          <Repitition day={day} setDay={setDay} fixedDays={fixedDays} />

          {/* priority */}
          <Priority
            fixedPriority={fixedPriority}
            priority={priority}
            setPriority={setPriority}
          />
          <button hidden type="submit">
            save
          </button>
        </form>
      </div>
    </div>
  );
};

const Time = ({ time, setTime }) => {
  const handleInputTime = (e) => {
    const value = e.target.value;
    if (value > 60) {
      setTime(60);
    } else {
      setTime((state) => (state = value));
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2 text-sm text-gray-400">
        It takes
        <p className="-mx-[2px] font-semibold text-black">{time}</p>
        {time <= "1" ? "minute" : "minutes"}
      </div>
      <div className="relative w-fit">
        <input
          className="px-2 rounded-md outline-none w-36 "
          name="time"
          id="time"
          type="number"
          max={60}
          min={0}
          step={5}
          value={time}
          onChange={handleInputTime}
        />
        <label
          htmlFor="time"
          className="absolute px-2 text-sm -translate-y-1/2 border rounded-full pointer-events-none select-none left-8 top-1/2"
        >
          minutes
        </label>
      </div>
    </div>
  );
};

const Priority = ({ fixedPriority, priority, setPriority }) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2 text-sm text-gray-400">
        Set priority to:
        <p
          className={`font-semibold
           ${priority === "Low" && "text-yellow-400"}
            ${priority === "Mid" && "text-orange-400"}
            ${priority === "High" && "text-red-500"}
          `}
        >
          {priority}
        </p>
      </div>
      <div className="relative flex flex-row gap-1">
        {fixedPriority.map((i, idx) => (
          <div
            className={` 
            ${priority === i && "bg-[#2392E2]"}
           ${priority === i ? "text-white" : "text-black  bg-white"}
            text-sm font-medium  cursor-pointer rounded-full py-1 px-4 select-none`}
            key={i}
            onClick={() => setPriority((state) => (state = i))}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

const Repitition = ({ day, setDay, fixedDays }) => {
  const currentDay = day[0];
  const handleSelectedDay = (i) => {
    if (currentDay == i) return;
    if (day.includes(i)) {
      const filteredDays = day.filter((item) => item !== i);
      setDay(filteredDays);
    } else {
      setDay((state) => [...state, i]);
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2 text-sm text-gray-400">
        Today is:
        <p className="font-semibold text-black ">{currentDay}</p>
      </div>
      <div className="flex flex-row overflow-hidden border-2 border-[#2392E2] rounded-md w-fit h-9">
        {fixedDays.map((i, idx) => (
          <div key={idx}>
            <div
              onClick={() => handleSelectedDay(i)}
              className={` 
              ${
                day.includes(i)
                  ? "bg-[#2392E2] text-white"
                  : "text-[#2392E2] bg-white"
              }
              text-xs w-10 cursor-pointer h-full flex items-center justify-center font-semibold`}
            >
              {i[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTodo;
