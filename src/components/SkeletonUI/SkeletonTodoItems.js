import React from "react";

const SkeletonTodoItems = ({ i }) => {
  return (
    <div
      className="px-6 py-2 animate-pulse"
      style={{ animationDelay: `${i * 0.5}s`, animationDuration: "1s" }}
    >
      <div className="flex flex-row items-center justify-between ">
        {/* checkbox and todo */}
        <div className="flex flex-row items-center gap-6 pointer-events-none select-none">
          <div className="w-5 h-5 rounded bg-slate-300"></div>
          <div className="flex flex-col gap-1">
            <p className="rounded text-slate-300 bg-slate-300 w-fit">
              Wake up then jog every...
            </p>
            <p className="text-sm rounded text-slate-300 bg-slate-300 w-fit">
              05:00 - 07:00{" "}
            </p>
          </div>
        </div>
        {/* ... checkbox and todo */}
        {/* todo controllers */}
        <div className="w-6 h-6 rounded-full bg-slate-300 "></div>
        {/* ... todo controllers */}
      </div>
    </div>
  );
};

export default SkeletonTodoItems;
