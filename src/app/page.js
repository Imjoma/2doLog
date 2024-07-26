"use client";

import { useState, useEffect } from "react";

import TodoAndTimer from "@/components/TodowithTimer/TodoAndTimer";
import { Provider } from "react-redux";
import { store } from "./store";
import SkeletonTodoContainer from "@/components/SkeletonUI/SkeletonTodoContainer";

import IdeaTable from "@/components/IdeaLog/IdeaTable";

export default function Home() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <main className="flex flex-col max-w-screen-xl mx-auto lg:flex-row">
      <Provider store={store}>
        {/* Component: Pop up message */}
        {/* Searchbar */}
        <div className="flex flex-col w-full py-20 pl-4 pr-4 space-y-6 lg:pr-0 lg:pl-6 ">
          {/* Searchbar: should be client sided */}
          <div className="flex flex-row space-x-4">
            <input
              type="text"
              placeholder="search"
              className="w-full px-8 py-3 font-light border-none rounded-full outline-none bg-slate-100"
            />
            <button className="text-sm font-medium text-blue-300">
              cancel
            </button>
          </div>
          <IdeaTable />
        </div>

        {mount ? <TodoAndTimer /> : <SkeletonTodoContainer />}
      </Provider>
    </main>
  );
}
