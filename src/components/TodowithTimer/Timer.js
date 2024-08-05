"use client";

import { Antonio } from "next/font/google";
const antonio = Antonio({ weight: "400", subsets: ["latin"] });

import { Anton } from "next/font/google";
const anton = Anton({ weight: "400", subsets: ["latin"] });

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";

import CurrentTodo from "./CurrentTodo";

const Timer = () => {
  const todoList = (state) => state.todos.list;

  const todoListNotDone = createSelector([todoList], (todos) =>
    todos.filter((todo) => todo.isDone === false)
  );

  const filteredTodo = useSelector(todoListNotDone);

  const timeSelected = filteredTodo[0]?.time * 60;

  const [timeController, setTimeController] = useState(false);

  const sessionType = [
    { name: "Focus", time: timeSelected || 1500, color: "bg-violet-500 " },
    { name: "Break", time: 300, color: "bg-green-500 " },
  ];

  const [isFocus, setIsFocus] = useState(true);

  const [timer, setTimer] = useState({
    isActive: false,
    count: isFocus ? sessionType[0].time : sessionType[1].time,
    minutes: 0,
    seconds: 0,
  });

  // simple approach to change the time, based on the first todo item
  useEffect(() => {
    if (!isFocus) return;
    if (filteredTodo[0] === undefined) {
      return setTimer((state) => ({
        ...state,
        isActive: false,
        count: 1500,
        minutes: 25,
        seconds: 0,
      }));
    }
    let minutes = filteredTodo[0].time;
    let seconds = minutes * 60;

    setTimer((state) => ({
      ...state,
      isActive: false,
      count: minutes === 0 ? 1500 : seconds,
      minutes: minutes === 0 ? 25 : minutes,
      seconds: 0,
    }));
  }, [filteredTodo[0]]);

  // Timer controllers:  running || pause || reset
  const handleReset = () => {
    setTimeController(true);
    setTimer((state) => ({
      ...state,
      isActive: false,
      count: isFocus ? sessionType[0].time : sessionType[1].time,
      minutes: Math.floor(state.count / 60),
      seconds: state.count % 60,
    }));
  };

  const handlePause = () => {
    setTimeController(true);
    setTimer((state) => ({ ...state, isActive: false }));
  };

  const handleStart = () => {
    setTimeController(false);
    setTimer((state) => ({ ...state, isActive: true }));
  };

  // ... Timer controllers:

  const handleTimerOnMount = (min, sec) => {
    sec = timer.count % 60;

    if (timer.count === 0) {
      return setTimer((state) => ({
        ...state,
        minutes: 0,
        seconds: 0,
      }));
    }

    if (timer.count % 60 === 0 && timer.isActive) {
      min = Math.floor(timer.count / 60) - 1;
      sec = 59;
    } else {
      min = Math.floor(timer.count / 60);
      sec = timer.isActive ? sec - 1 : sec;
    }

    setTimer((state) => ({
      ...state,
      minutes: min,
      seconds: sec,
    }));
  };

  const handleTimerToggle = () => {
    if (isFocus) {
      setTimer((state) => ({ ...state, count: sessionType[0].time }));
    } else {
      setTimer((state) => ({ ...state, count: sessionType[1].time }));
    }
  };

  useEffect(() => {
    handleTimerToggle();
  }, [isFocus]);

  useEffect(() => {
    let interval = null;
    let min, sec;

    //  Todo: if timer is 0 show message box
    if (timer.count < 0) {
      return handleReset() && clearInterval(interval);
    }

    if (timer.isActive) {
      // Start Interval:
      interval = setInterval(() => {
        // handling the timer ui
        handleTimerOnMount(min, sec);

        // start decreasing
        setTimer((state) => ({
          ...state,
          count: state.count - 1,
        }));
      }, 1000);
    } else {
      // works only when inactive
      handleTimerOnMount(min, sec);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer.count, timer.isActive]);

  return (
    <div className="relative flex flex-col items-end gap-2 sm:w-96">
      {/* Timer */}
      <div className="relative w-fit group ">
        {/* time */}
        <div
          onDoubleClick={() => setTimeController((state) => !state)}
          className={`
           ${anton.className}
            ${
              timeController
                ? "-translate-x-4"
                : " group-hover:-translate-x-4  translate-x-0"
            }
            right-0 text-6xl text-center  cursor-pointer select-none w-[164px] time-anim font-anton`}
        >
          {timer.minutes.toString().padStart(2, "0")} :{" "}
          {timer.seconds.toString().padStart(2, "0")}
        </div>
        {/* ... time */}
        {/* controller */}
        <div
          className={` duration-300 -translate-y-1/2 absolute right-0 z-40 top-1/2 ${
            timeController
              ? "opacity-100 translate-x-4 pointer-events-auto"
              : " hidden-time-controller show-time-controller"
          }`}
        >
          <TimeControllers
            isActive={!timer.isActive}
            handlePause={handlePause}
            handleReset={handleReset}
            handleStart={handleStart}
          />
        </div>
        {/* ... controller */}
        {/* lock */}
        {timeController && (
          <button
            className="absolute top-0 right-0 w-3 h-3 translate-x-1 -translate-y-1 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(assets/icons/lock.svg)` }}
            onClick={() => setTimeController(false)}
          ></button>
        )}
        {/* ... lock */}
      </div>
      {/* ... Time */}
      {/* Session */}
      <button
        disabled={timer.isActive ? true : false}
        onClick={() => setIsFocus((state) => !state)}
        className={`
          ${timer.isActive && "opacity-50 pointer-events-none "}
        ${
          isFocus ? sessionType[0].color : sessionType[1].color
        } text-white w-fit py-1 px-3 text-sm rounded-full font-medium`}
      >
        {isFocus ? sessionType[0].name : sessionType[1].name}
      </button>
      {/* ... Session */}
      {/* Current Todo */}
      <div className="absolute bottom-0 left-0 flex flex-row items-center h-[32px] space-x-4 translate-x-1 font-anton">
        {/* ping */}
        <Ping isActive={!timer.isActive && timer.count > 0} isFocus={isFocus} />
        {/* todo text */}
        <CurrentTodo font={antonio.className} isFocus={isFocus} />
      </div>
    </div>
  );
};

const Ping = ({ isActive, isFocus }) => {
  const timerOff = isActive;
  return (
    <div className="relative flex items-center justify-center">
      {timerOff && isFocus && (
        <div
          className={`absolute top-1/2 left-1/2 z-30 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-violet-500  
              animate-ping  origin-bottom-right`}
        ></div>
      )}

      <div
        className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${
          timerOff
            ? isFocus
              ? "bg-violet-500"
              : "bg-green-500"
            : isFocus
            ? "bg-violet-500"
            : "bg-green-500"
        } `}
      ></div>
    </div>
  );
};

const TimeControllers = ({
  isActive,
  handlePause,
  handleReset,
  handleStart,
}) => {
  return (
    <div
      className={`flex flex-row items-center p-[2px] bg-black/30 backdrop-blur-sm rounded-full  `}
    >
      {isActive === false && (
        <button
          className="w-8 h-8 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(assets/icons/stop-circle.svg)` }}
          onClick={handleReset}
        ></button>
      )}
      <button
        className="w-8 h-8 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(assets/icons/${
            isActive ? "play" : "pause"
          }-circle.svg)`,
        }}
        onClick={isActive ? handleStart : handlePause}
      ></button>
    </div>
  );
};

export default Timer;
