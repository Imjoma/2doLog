"use client";

import IdeaTable from "@/components/IdeaLog/IdeaTable";
import { store } from "../store";
import { Provider } from "react-redux";

const IdeaLogPage = () => {
  return (
    <main className="flex flex-col max-w-screen-xl mx-auto lg:flex-row">
      <Provider store={store}>
        <div className="flex flex-col w-full px-6 py-6 space-y-6">
          {/* Add NewIdea Button if authenticated and redirect to Google Sign in if not */}
          <div>
            {/* IdeaList Info */}
            <div className="flex flex-row items-end gap-3 ml-6">
              <h2 className="text-3xl font-medium font-antonio">Idea Logs</h2>
              <div
                className={` opacity-70 text-xs px-2 font-semibold py-1 border w-fit  rounded-full`}
              >
                Public Ideas
              </div>
            </div>

            {/* NewIdea */}
          </div>
          {<IdeaTable search={``} />}
        </div>
      </Provider>
    </main>
  );
};

export default IdeaLogPage;
