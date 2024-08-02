"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Antonio } from "next/font/google";
const antonio = Antonio({ weight: "400", subsets: ["latin"] });
import { signOut, signIn, useSession } from "next-auth/react"; //import next auth
import Link from "next/link";
import SignInModal from "./SignInModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    document.body.classList.add("no-scroll");
    setModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove("no-scroll");
    setModal(false);
  };

  const pathname = usePathname();

  const { data, status } = useSession();
  const currentUserImage = data?.user.image;
  const currentUserName = data?.user.name;

  const isAuthenticated = status === "authenticated";
  const UnAuthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  return (
    <nav className={" max-w-screen-xl p-6 mx-auto my-4 space-y-4"}>
      {/* Authentication Modal */}
      {modal && <SignInModal closeModal={closeModal} />}

      {/* PC */}
      <div className="flex flex-row items-center justify-between w-full px-6 py-4 rounded-xl bg-container">
        <Link href="/">
          <img
            src="/assets/images/2dolog-light-logo.svg"
            className="w-12 h-12 scale-[2] rounded-full "
            alt="2dolog logo light"
          />
        </Link>
        {/* Burger Button... */}
        <button
          className="inline-block w-6 h-6 bg-center bg-no-repeat bg-cover rounded-full md:hidden"
          onClick={() => setIsOpen((state) => !state)}
          style={{
            backgroundImage: `url(../assets/icons/${
              !isOpen ? "burger.svg" : "close.svg"
            })`,
          }}
        ></button>
        {/* ...Burger Button */}
        <div className={`  font-antonio md:block hidden text-lg`}>
          <ul className="flex flex-row items-center gap-8">
            <Link
              replace={true}
              href={"/"}
              className={`${pathname === "/" && "underline"} cursor-pointer`}
            >
              Dashboard
            </Link>
            <Link
              replace={true}
              href={"/idea-log"}
              className={`${
                pathname === "/idea-log" && "underline"
              } cursor-pointer`}
            >
              Idea Log
            </Link>
          </ul>
        </div>
        {/* user status.. PC */}{" "}
        <div className="flex-row hidden md:flex">
          {isLoading && (
            <div className="w-8 h-8 rounded-full animate-pulse bg-slate-300"></div>
          )}
          {isAuthenticated && (
            <>
              <img
                onClick={signOut}
                src={currentUserImage}
                className="w-8 h-8 rounded-full cursor-pointer select-none "
                alt={currentUserName + "profile picture"}
              />
            </>
          )}
          {UnAuthenticated && (
            <button
              className="w-6 h-6 bg-center bg-no-repeat bg-cover rounded-full"
              style={{
                backgroundImage: `url(../assets/icons/nouser.svg)`,
              }}
              onClick={() => openModal()}
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
        <ul className="flex flex-col items-end">
          <li
            className="py-2 cursor-pointer select-none"
            onClick={() => setIsOpen(false)}
          >
            <Link replace={true} href={"/"}>
              Dashboard
            </Link>
          </li>
          <li
            className="py-2 cursor-pointer select-none"
            onClick={() => setIsOpen(false)}
          >
            <Link
              replace={true}
              href={"/idea-log"}
              className="py-2 cursor-pointer select-none"
            >
              Idea Log
            </Link>
          </li>
          {isLoading && (
            <div className="w-16 h-8 rounded-full animate-pulse bg-slate-300"></div>
          )}
          {isAuthenticated && (
            <li
              onClick={signOut}
              className="flex flex-row py-1 pl-1 pr-3 mt-2 space-x-2 border rounded-full cursor-pointer select-none w-fit border-slate-300"
            >
              <img
                src={currentUserImage}
                className="w-8 h-8 rounded-full "
                alt={currentUserName + "profile picture"}
              />
              <p>{currentUserName}</p>
            </li>
          )}
          {UnAuthenticated && (
            <li
              onClick={openModal}
              className="py-2 text-blue-500 underline cursor-pointer select-none"
            >
              Log In
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
