"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IdeaForm from "@/components/IdeaLog/IdeaForm";
import IdeaItem from "@/components/IdeaLog/IdeaItem";

import {
  fetchIdeas,
  selectAllIdeas,
  selectIdeasStatus,
} from "@/app/features/ideaLog/ideaLogSlice";

const IdeaTable = () => {
  const dispatch = useDispatch();
  const ideaList = useSelector(selectAllIdeas);
  const ideaStatus = useSelector(selectIdeasStatus);

  const [editIdea, setEditIdea] = useState(null);

  const { status } = useSession();

  // Todo: ✅
  // Ps: only the form changes so state recoil didnt work
  // check if save successful add one
  const [dataCount, setDataCount] = useState(0);

  // Todo: makes skeleton ui for loading
  const isLoading = ideaStatus === "loading";

  // ☝️
  // ideaList is empty on initital then run
  // the useEffect to fecth data
  // PS: no need for useStata since we have redux
  // 👇

  useEffect(() => {
    dispatch(fetchIdeas());
  }, [dispatch, dataCount]);

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-auto bg-slate-100 rounded-xl outline outline-slate-300 outline-1">
      <div></div>
      {status === "authenticated" && (
        <div className="p-6 space-y-6 rounded-xl">
          {/* form */}
          <IdeaForm
            setEditIdea={setEditIdea}
            handleUpdate={handleUpdate}
            editIdea={editIdea}
            setDataCount={setDataCount}
          />

          {/* idea list */}
          {isLoading && <div>loading...</div>}
          {!ideaList ? (
            // this should be button to refetch
            <div> fetch faialed</div>
          ) : (
            ideaList?.map((item) => (
              <IdeaItem
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
    </div>
  );
};

export default IdeaTable;
