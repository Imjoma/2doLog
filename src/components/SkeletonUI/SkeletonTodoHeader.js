import React from "react";

const SkeletonTodoHeader = () => {
  return (
    <div className="flex flex-row items-start justify-between px-6 py-4 animate-pulse">
      <div className="flex flex-col items-start justify-between flex-1 gap-1">
        <h4 className="w-24 h-8 rounded-sm bg-slate-300"></h4>
        <p className={`  h-3 w-12 bg-slate-300 rounded-sm`}></p>
      </div>

      <div className="flex flex-col items-start justify-between flex-1 gap-1">
        <h4 className="w-24 h-8 rounded-sm bg-slate-300"></h4>
        <p className={`  h-3 w-12 bg-slate-300 rounded-sm`}></p>
      </div>
    </div>
  );
};

export default SkeletonTodoHeader;
