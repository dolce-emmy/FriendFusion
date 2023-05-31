import api from "../api";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import InputEmoji from "react-input-emoji";
import ImageIcon from "./icons/ImageIcon";
import GifIcon from "./icons/GifIcon";
import AudioIcon from "./icons/AudioIcon";
import DocumentIcon from "./icons/DocumentIcon";
import { useThemeContext } from "../context/ThemeContext";

const PostForm = () => {
  const { isDarkMode } = useThemeContext();
  const { user, updatePosts } = useAppContext();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      user: user._id,
      description,
      images,
    };

    api.post("/posts", data).then((res) => {
      updatePosts(res.data.data);
      setDescription("");
      setImages([]);
    });
  };

  const handleImage = (e) => {
    //call api to upload images
    const formData = new FormData();
    if (e.target.files?.length !== 0) {
      Array.from(e.target.files).forEach((file) => {
        formData.append("file", file, file.name);
      });
    }

    api.post("/images/multiple", formData).then((res) => {
      // get the image id
      // set to the state

      // the rest syntax is adding the old images to the new images
      setImages(res.data.data.map((image) => image._id));
    });
  };

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } w-full px-1 py-3 mb-8 rounded-2xl flex flex-col shadow-md`}
    >
      <div className="flex items-center px-4 py-3 w-full gap-1 post-form">
        <img
          className="h-14 w-14 rounded-full"
          src={user?.image?.url || "https://placehold.co/60x60/png"}
        />
        <InputEmoji
          value={description}
          onChange={setDescription}
          placeholder="What's Happening?"
        />
      </div>
      <div className="px-4 py-3 gap-2 flex items-center justify-between w-full max-w-full">
        <div className="flex gap-4 items-center justify-between">
          <button className="flex gap-1 cursor-pointer px-2">
            <label className="flex gap-1 cursor-pointer" htmlFor="image">
              <span>
                <ImageIcon />
              </span>
              <span>Image</span>
            </label>
            <input
              multiple
              type="file"
              id="image"
              name="image"
              onChange={handleImage}
              className="hidden"
              accept="image/*"
            />
          </button>
          <button className="flex gap-1 cursor-pointer px-2">
            <GifIcon />
            <span>Video</span>
          </button>
          <button className="flex gap-1 cursor-pointer px-2">
            <DocumentIcon />
            <span>Attachment</span>
          </button>
          <button className="flex gap-1 cursor-pointer px-2">
            <AudioIcon />
            <span>Audio</span>
          </button>
        </div>
        <div className="">
          <button
            onClick={onSubmitHandler}
            className="cursor-pointer ml-auto bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Post
          </button>
        </div>

        {/* <span>
            <label htmlFor="video">Video</label>
            <input type="file" id="video" name="video" />
          </span>

          <span>
            <label htmlFor="audio">Audio</label>
            <input type="file" id="audio" name="audio" />
          </span> */}
      </div>
    </div>
  );
};

export default PostForm;
