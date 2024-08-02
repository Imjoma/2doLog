"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Antonio } from "next/font/google";
import { useSession } from "next-auth/react";
import Link from "next/link";

const antonio = Antonio({ subsets: ["latin"] });

const IdeaItem = ({ item, setDataCount, setEditIdea, setShowForm }) => {
  const [itemControll, setItemControll] = useState(false);
  const pathname = usePathname();

  // User Signed In
  const { data } = useSession();
  const currentUserName = data?.user.name;
  const isOP = currentUserName === item.username;

  // Delete Item
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/ideas/${id}`, {
        method: "DELETE",
      });
      setDataCount((state) => state - 1);
    } catch (err) {
      console.log(err);
    }
  };

  // Edit Item
  const handleReadyItem = (item) => {
    setShowForm(true);
    setEditIdea(item);
    setItemControll(false);
  };

  return (
    <div className="relative flex flex-col space-y-3 sm:space-y-0 sm:space-x-5 sm:flex-row">
      {/* LEFT */}
      {/* 52 32 */}
      <div className="w-full h-auto overflow-hidden bg-black aspect-video rounded-xl sm:w-80">
        {item.image && (
          <img
            src={`data:image/png;base64,${item.image}`}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Top Right */}
      {pathname === "/" && (
        <div className="absolute right-3 top-1 ">
          <button
            onClick={() => setItemControll((state) => !state)}
            className="w-6 h-6 bg-center bg-no-repeat bg-cover rounded-full hover:bg-slate-200"
            style={{
              backgroundImage: `url(assets/icons/more-vertical.svg)`,
            }}
          ></button>
        </div>
      )}

      {/* Top Right : Item Controll */}
      {itemControll && (
        <div className="absolute top-0 flex flex-col p-1 space-y-1 bg-white border rounded-md shadow-md right-7 border-slate-300">
          <button
            onClick={() => handleReadyItem(item)}
            className="px-5 py-2 text-sm font-medium rounded-md text-cent-2 hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="px-5 py-2 text-sm font-medium rounded-md text-cent-2 hover:bg-slate-100"
          >
            Delete
          </button>
        </div>
      )}

      {/* RIGHT */}
      <div className="flex flex-col justify-between w-full pr-2 space-y-2">
        <div>
          {/* title */}
          <div
            className={
              antonio.className +
              " text-xl hover:underline truncate w-full sm:w-64 md:w-full lg:w-[10rem] xl:w-full"
            }
          >
            <Link href={`/idea-log/${item._id}`}>{item.title}</Link>
          </div>
          {/* description */}
          <p className="inline-block w-full sm:w-64 md:w-full truncate-2-lines">
            {item.description}
          </p>
        </div>

        {/* Lower */}
        <div className="flex flex-row items-center justify-between pt-1">
          {/* user and visibility */}
          <div className="flex flex-row space-x-2">
            {pathname === "/idea-log" ? (
              <>
                <img
                  className="w-6 h-6 rounded-full"
                  src={item.userImage}
                  alt={item.username + " profile picture"}
                />
                <span>•</span>
                <p className="font-medium ">{item.username}</p>
              </>
            ) : (
              !isOP && (
                <>
                  <img
                    className="w-6 h-6 rounded-full"
                    src={item.userImage}
                    alt={item.username + " profile picture"}
                  />
                  <span>•</span>
                </>
              )
            )}
            {pathname !== "/idea-log" && (
              <div className="flex flex-row items-center space-x-1">
                <div
                  className="w-5 h-5 bg-center bg-no-repeat bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(assets/icons/visibilityIcon.svg)`,
                  }}
                ></div>
                <p>{item.visibility}</p>
              </div>
            )}
          </div>
          {/* date */}
          <p className="text-sm font-medium opacity-60">
            {item.createdAt.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaItem;
