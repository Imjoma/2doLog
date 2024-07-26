import { Antonio, Inter } from "next/font/google";

const antonio = Antonio({ weight: "400", subsets: ["latin"] });
const inter = Inter({ weight: "400", subsets: ["latin"] });

import { useSelector } from "react-redux";

const TodoHeader = () => {
  const list = useSelector((state) => state.todos.list);
  const listNotDone = list.filter((state) => state.isDone === false);

  const sumTodoTime = listNotDone.reduce(
    (total, current) => total + current.time,
    0
  );
  const sumHours = sumTodoTime / 60;
  const sumTodoDisplay =
    sumTodoTime > 60
      ? sumHours.toString().slice(0, 3) + " hours"
      : sumTodoTime + " minutes";

  return (
    <>
      {list.length > 0 && (
        <div
          className={`${antonio.className} select-none flex flex-row items-start justify-between py-4 px-6`}
        >
          <div className="flex flex-col items-start justify-between flex-1">
            <h4 className="text-2xl font-medium">{sumTodoDisplay}</h4>
            <p className={`${inter.className} opacity-70 text-sm`}>for today</p>
          </div>

          <div className="flex flex-col items-start justify-between flex-1">
            <h4 className="text-2xl font-medium">{listNotDone.length} Task</h4>
            <p className={`${inter.className} opacity-70 text-sm`}>left</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoHeader;
