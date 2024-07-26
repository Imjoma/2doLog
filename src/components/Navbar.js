"use client";

import { useState } from "react";
import { Antonio } from "next/font/google";
const antonio = Antonio({ weight: "400", subsets: ["latin"] });
import { signOut, signIn, useSession } from "next-auth/react"; //import next auth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, status } = useSession();
  const currentUserImage = data?.user.image;
  const currentUserName = data?.user.name;

  return (
    <nav className="max-w-screen-xl p-6 mx-auto my-4 space-y-4">
      <div className="flex flex-row items-center justify-between w-full px-6 py-4 rounded-xl bg-container">
        <a href="/">
          <img
            src="/assets/images/2dolog-light-logo.svg"
            className="w-12 h-12 scale-[2] rounded-full "
            alt="2dolog logo light"
          />
        </a>
        {/* Mobile */}
        {/* Burger Button */}
        <button
          className="inline-block w-6 h-6 bg-center bg-no-repeat bg-cover rounded-full md:hidden"
          onClick={() => setIsOpen((state) => !state)}
          style={{
            backgroundImage: `url(assets/icons/${
              !isOpen ? "burger.svg" : "close.svg"
            })`,
          }}
        ></button>
        {/* PC */}
        <div className={antonio.className + " md:block hidden text-lg"}>
          <ul className="flex flex-row items-center gap-8">
            <li>Dashboard</li>
            <li>Idea Log</li>
            <li>FAQ</li>
          </ul>
        </div>
        {/*Links */}
        {/* User */}{" "}
        <div className="flex-row hidden md:flex">
          {status === "authenticated" ? (
            <>
              <img
                onClick={signOut}
                src={currentUserImage}
                className="w-8 h-8 rounded-full cursor-pointer select-none "
                alt={currentUserName + "profile picture"}
              />
            </>
          ) : (
            <button
              className="w-6 h-6 bg-center bg-no-repeat bg-cover rounded-full"
              style={{
                backgroundImage: `url(assets/icons/nouser.svg)`,
              }}
              onClick={signIn}
            ></button>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div
        className={`
          ${antonio.className} 
          ${isOpen ? "block" : "hidden"}
           block md:hidden text-lg px-6 py-4 bg-container rounded-xl`}
      >
        <ul className="flex flex-col items-end space-y-42">
          <li className="py-2">Dashboard</li>
          <li className="py-2">Idea Log</li>
          <li className="py-2">FAQ</li>
          <li className="flex flex-row py-1 pl-1 pr-3 mt-2 space-x-2 border rounded-full w-fit border-slate-300">
            <img
              onClick={signOut}
              src={currentUserImage}
              className="w-8 h-8 rounded-full cursor-pointer select-none "
              alt={currentUserName + "profile picture"}
            />
            <p>{currentUserName}</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
