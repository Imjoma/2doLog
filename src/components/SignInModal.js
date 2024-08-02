"use client";
import { signIn } from "next-auth/react";

const SignInModal = ({ closeModal }) => {
  return (
    <div className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen bg-black/20 backdrop-blur-sm ">
      <div
        onClick={() => closeModal()}
        className="absolute top-0 left-0 w-full h-full"
      ></div>

      <div className="absolute flex flex-col items-center px-10 py-10 space-y-4 font-semibold text-black -translate-x-1/2 -translate-y-1/2 sm:px-20 top-1/2 left-1/2 w-fit rounded-xl bg-slate-100">
        <p>Authentication</p>
        <button
          onClick={signIn}
          className="flex flex-row items-center justify-center gap-2 py-3 font-semibold bg-white rounded-lg w-60 "
        >
          <span
            className="inline-block w-5 h-5 bg-center bg-no-repeat bg-cover "
            style={{ backgroundImage: `url(../assets/icons/google.svg)` }}
          ></span>
          Sign in with Google
        </button>
        {/* close */}
        <button
          onClick={() => closeModal()}
          className="absolute top-0 inline-block w-5 h-5 bg-center bg-no-repeat bg-cover right-3 "
          style={{ backgroundImage: `url(../assets/icons/close.svg)` }}
        ></button>
      </div>
    </div>
  );
};

export default SignInModal;
