"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import TodoAndTimer from "@/components/TodowithTimer/TodoAndTimer";
import { Provider } from "react-redux";
import { store } from "./store";
import SkeletonTodoContainer from "@/components/SkeletonUI/SkeletonTodoContainer";

import IdeaTable from "@/components/IdeaLog/IdeaTable";

export default function Home() {
  const [mount, setMount] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setMount(true);
  }, []);

  const { status } = useSession();

  return (
    <main className="flex flex-col max-w-screen-xl mx-auto lg:flex-row">
      <Provider store={store}>
        {/* Component: Pop up message */}
        <div className="flex flex-col w-full py-0 pl-4 pr-4 space-y-6 lg:py-20 lg:pr-0 lg:pl-6 ">
          {/* Searchbar and ToggleForm PC */}
          {status === "authenticated" && (
            <div className="flex flex-col items-end justify-between w-full gap-4 lg:gap-0 md:flex-row">
              {/* searchbar*/}
              <div className="relative w-full h-12 lg:w-96">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="search"
                  className="absolute w-full px-8 py-3 font-light border-none rounded-full outline-none focus:ring-2 bg-slate-100"
                />

                <button
                  className="absolute w-4 h-4 bg-center bg-no-repeat bg-cover top-4 right-4 "
                  style={{ backgroundImage: `url(assets/icons/close.svg)` }}
                  type="button"
                  onClick={() => setSearch("")}
                ></button>
              </div>
              {/* toggler */}
              <button
                className={`
              ${
                showForm
                  ? "bg-transparent text-blue-500 ring-2  ring-blue-500"
                  : "bg-[#2392E2] text-white"
              }
                px-6  py-3 w-fit text-nowrap rounded-full  font-semibold`}
                type="button"
                onClick={() => setShowForm((state) => !state)}
              >
                {showForm ? (
                  <>Hide</>
                ) : (
                  <>
                    <span className="pr-2 ">+</span>
                    New Idea
                  </>
                )}
              </button>
            </div>
          )}

          <IdeaTable
            search={search}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        </div>

        {mount ? <TodoAndTimer /> : <SkeletonTodoContainer />}
      </Provider>
    </main>
  );
}
