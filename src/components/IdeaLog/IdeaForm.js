"use client";

import { Antonio } from "next/font/google";
const antonio = Antonio({ subsets: ["latin"] });
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";

const IdeaForm = ({
  editIdea,
  setDataCount,
  handleUpdate,
  setEditIdea,
  setShowForm,
}) => {
  const [base64String, setBase64String] = useState("");
  const [maxSize, setMaxSize] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // get Size
    if (file) {
      const sizeInBytes = file.size;
      // max 1048576 bytes / 1mb
      if (sizeInBytes > 1048576) {
        return setMaxSize(true);
      }
    }
    // ... get Size
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1]; // Extract base64 content from data URL
      setBase64String(base64);
    };

    if (file) {
      // Read file as data URL (base64 encoded)
      reader.readAsDataURL(file);
    }
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Public");

  // User Signed In
  const { data } = useSession();
  const currentUserImage = data?.user.image;
  const currentUserName = data?.user.name;

  const isDisabled = !base64String || !title || !description;

  const handleSubmitIdea = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/ideas", {
        method: "POST",
        body: JSON.stringify({
          image: base64String,
          title,
          description,
          visibility,
          date: new Date(),
          username: currentUserName,
          userImage: currentUserImage,
        }),
      });
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
    // clear state
    setBase64String("");
    setTitle("");
    setDescription("");
    setVisibility("Public");
    // update ui
    setDataCount((state) => state + 1);
  };

  // handling data onChange
  useEffect(() => {
    if (editIdea === null) return;
    const newTitle = editIdea.title;
    const newDesc = editIdea.description;
    const newImage = editIdea.image;
    const newVisibility = editIdea.visibility;
    setTitle(newTitle);
    setDescription(newDesc);
    setBase64String(newImage);
    setVisibility(newVisibility);
  }, [editIdea]);

  const updatedIdea = { title, description, image: base64String, visibility };
  // ... handling data onChange

  const handleSomethingEdit = () => {
    let edited = false;
    if (
      title !== editIdea?.title ||
      description !== editIdea?.description ||
      base64String !== editIdea?.image ||
      visibility !== editIdea?.visibility
    ) {
      edited = true;
    }
    return edited;
  };

  const handleClearState = () => {
    setEditIdea(null);
    setTitle("");
    setDescription("");
    setBase64String("");
    setVisibility("Public");
  };

  const handleUpdateClick = () => {
    handleUpdate(updatedIdea);
    handleClearState();
  };

  return (
    <>
      <form
        onSubmit={handleSubmitIdea}
        className="relative flex w-full p-4 bg-white sm:p-6 rounded-xl"
      >
        {/* Close Form */}
        <button
          className="absolute w-5 h-5 bg-center bg-no-repeat bg-cover top-6 right-6 "
          style={{ backgroundImage: `url(assets/icons/close.svg)` }}
          onClick={() => setShowForm(false)}
          type="button"
        ></button>
        {/* profile PC */}
        <img
          src={currentUserImage}
          alt={currentUserName + "profile image"}
          className="hidden w-10 h-10 mr-3 border rounded-full sm:inline-block -p-1 bg-slate-200"
        />
        {/* inputs */}
        <div className="w-full pt-1 space-y-2">
          {/* profile mobile */}
          <img
            src={currentUserImage}
            alt={currentUserName + "profile image"}
            className="inline-block w-10 h-10 border rounded-full sm:hidden -p-1 bg-slate-200"
          />
          {/* title */}
          <input
            maxLength={50}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Any Ideas?"
            className={antonio.className + "  w-full text-xl  outline-none"}
          />
          {/* visibility */}
          <div
            value={visibility}
            onClick={() =>
              setVisibility((state) =>
                state === "Public" ? "Private" : "Public"
              )
            }
            className="flex flex-row items-center py-1 pl-1 pr-3 space-x-1 rounded-full select-none w-fit bg-slate-200"
          >
            <div
              className="w-5 h-5 bg-center bg-no-repeat bg-cover rounded-full"
              style={{
                backgroundImage: `url(assets/icons/visibilityIcon.svg)`,
              }}
            ></div>
            <p className="select-none">{visibility}</p>
          </div>
          {/* description */}
          <div className="w-full pt-2">
            <textarea
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border outline-none focus:border-none focus:ring-2 rounded-xl"
              name="description"
              id="description"
              placeholder="Description"
              rows={4}
            ></textarea>
          </div>
          {maxSize && <div>max size is 1 MB</div>}
          <div className="flex flex-col w-full ">
            {/* iamge */}
            {base64String && (
              <div className="relative flex flex-row items-start space-x-1">
                <div className="w-full h-48 overflow-hidden border-2 border-black border-dashed sm:h-32 sm:w-52 rounded-xl">
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    alt={"image uploaded"}
                    className="object-cover w-full h-full"
                  />
                </div>

                <button
                  className="absolute w-5 h-5 bg-center bg-no-repeat bg-cover top-2 sm:right-0 sm:left-52 right-2 "
                  style={{ backgroundImage: `url(assets/icons/close.svg)` }}
                  onClick={() => setBase64String("") && setMaxSize(false)}
                ></button>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileInputChange}
              className="py-4 text-sm"
              accept="image/*"
            />
            {/* buttons */}
            {editIdea === null && (
              <button
                disabled={isDisabled}
                type="submit"
                className={`${
                  isDisabled && "opacity-40"
                } px-6 py-3 w-full md:w-fit bg-[#2392E2] rounded-full text-white`}
              >
                Save
              </button>
            )}

            {editIdea && (
              <div className="flex flex-row gap-2">
                <button
                  className={`${
                    handleSomethingEdit() === false && "opacity-40"
                  } px-6 py-3 w-full md:w-fit bg-green-500 rounded-full text-white`}
                  type="button"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>

                <button
                  className={` 
                    px-6 py-3 w-full md:w-fit bg-slate-400 rounded-full text-white`}
                  type="button"
                  onClick={handleClearState}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default IdeaForm;
