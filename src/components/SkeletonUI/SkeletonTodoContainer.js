import React from "react";
import SkeletonTodoItems from "./SkeletonTodoItems";
import SkeletonTodoHeader from "./SkeletonTodoHeader";

const SkeletonTodoContainer = () => {
  return (
    <div className="flex flex-col gap-8 p-6 mt-2">
      {/* skeleton timer */}
      <div className="flex flex-col items-end gap-3 sm:w-96 animate-pulse">
        <div className="w-[164px] h-14 rounded bg-slate-300"></div>
        <div className="h-5 rounded w-14 bg-slate-300"></div>
      </div>

      {/* skeleton todo */}
      <div className=" relative sm:w-96 py-4 h-[500px] bg-slate-100 rounded-xl">
        <SkeletonTodoHeader />
        {[...Array(5).keys()].map((i) => (
          <SkeletonTodoItems key={i} id={i} />
        ))}
        <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </div>
    </div>
  );
};

export default SkeletonTodoContainer;
