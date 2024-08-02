"use client";

import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IdeaForm from "@/components/IdeaLog/IdeaForm";
import IdeaItem from "@/components/IdeaLog/IdeaItem";

import {
  fetchIdeas,
  selectAllIdeas,
  selectIdeasStatus,
} from "@/app/features/ideaLog/ideaLogSlice";
import SignInModal from "../SignInModal";

const IdeaTable = ({ showForm, setShowForm, search }) => {
  const dispatch = useDispatch();
  const ideaList = useSelector(selectAllIdeas);
  const ideaStatus = useSelector(selectIdeasStatus);
  const { status, data } = useSession();

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
  const isOp = pathname === "/";
  const originalPost = ideaList?.filter(
    (idea) => idea.username === data?.user.name
  );

  const isDashboard = isOp
    ? originalPost
    : ideaList.filter((idea) => idea.visibility === "Public");
  // handle searching
  const ideaListOnSearch =
    search === "" || search.trim().length === 0
      ? isDashboard
      : isDashboard.filter((idea) => idea.title.includes(search));

  const [editIdea, setEditIdea] = useState(null);

  // Todo: ✅
  // Ps: only the form changes so state recoil didnt work
  // check if save successful add one
  const [dataCount, setDataCount] = useState(0);

  const isIdle = ideaStatus === "idle";
  const isEmpty = originalPost.length === 0;

  // ☝️
  // ideaList is empty on initital then run
  // the useEffect to fecth data
  // PS: no need for useStata since we have redux
  // 👇

  useEffect(() => {
    dispatch(fetchIdeas());
  }, [dataCount]);

  // Update
  // data dont change unless hard coded in api | forgot to put await ✅
  // data cant be edited normaly ✅
  // hide save button when on edit mode ✅
  // auto recoil after successful update / using redux

  const handleUpdate = async (updatedIdea) => {
    const { _id } = editIdea;
    const { image, title, description, visibility } = updatedIdea;
    try {
      await fetch(`/api/ideas/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          title,
          description,
          visibility,
        }),
      });
      // update ui
      setDataCount((state) => state + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={` 
    w-full h-auto  bg-slate-100 rounded-xl outline outline-slate-300 outline-1`}
    >
      {/* Authentication Modal */}
      {modal && <SignInModal closeModal={closeModal} />}

      {status === "loading" && (
        <div className="flex items-center justify-center px-6 py-8">
          <div className="p-2 border bg-slate-500 rounded-xl bg-opacity-30">
            <div
              className="w-8 h-8 bg-no-repeat bg-cover rounded-xl"
              style={{
                backgroundImage: `url(assets/icons/loading.svg)`,
              }}
            ></div>
          </div>
        </div>
      )}

      {pathname === "/" &&
        status === "authenticated" &&
        !showForm &&
        isEmpty && (
          <div className="flex items-center justify-center w-full h-full px-6 py-8 border ">
            <button
              className={`
                 bg-[#2392E2] text-white 
                px-6 py-3 w-fit text-nowrap rounded-xl shadow-xl  font-semibold`}
              type="button"
              onClick={() => setShowForm(true)}
            >
              Create your first Idea
            </button>
          </div>
        )}

      {pathname === "/" && status === "unauthenticated" && (
        <div className="flex items-center justify-center px-6 py-8">
          <button
            onClick={openModal}
            className={` 
                    px-6 py-3 shadow-xl font-medium w-full md:w-fit bg-[#2392E2] rounded-xl text-white`}
            type="button"
          >
            Login to get Full Access!
          </button>
        </div>
      )}

      {status === "authenticated" && (
        <div
          className={`
          ${ideaListOnSearch.length === 0 ? "p-0" : "p-6"}
         space-y-6 rounded-xl duration-200`}
        >
          {/* form */}
          {showForm && (
            <IdeaForm
              setShowForm={setShowForm}
              setEditIdea={setEditIdea}
              handleUpdate={handleUpdate}
              editIdea={editIdea}
              setDataCount={setDataCount}
            />
          )}

          {/* idea list */}
          {/* {isLoading && <div>loading...</div>} */}
          {isIdle || !ideaList ? (
            <button
              onClick={() => dispatch(fetchIdeas())}
              className={` 
                    px-6 py-3 shadow-xl font-medium w-full md:w-fit bg-blue-500 rounded-full text-white`}
              type="button"
            >
              Fetch Data
            </button>
          ) : (
            ideaListOnSearch?.map((item) => (
              <IdeaItem
                setShowForm={setShowForm}
                handleUpdate={handleUpdate}
                setEditIdea={setEditIdea}
                setDataCount={setDataCount}
                item={item}
                key={item._id}
              />
            ))
          )}
        </div>
      )}

      {pathname === "/idea-log" && status === "unauthenticated" && (
        <div className="p-6 space-y-6 rounded-xl">
          {ideaList
            ?.filter((idea) => idea.visibility === "Public")
            .map((item) => (
              <IdeaItem
                setShowForm={setShowForm}
                handleUpdate={handleUpdate}
                setEditIdea={setEditIdea}
                setDataCount={setDataCount}
                item={item}
                key={item._id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default IdeaTable;
