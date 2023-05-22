import api from "../api";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import InputEmoji from "react-input-emoji";

const PostForm = () => {
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
    //call api to upload image
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file, file.name);

    api.post("/images", formData).then((res) => {
      // get the image id
      // set to the state

      // the rest syntax is adding the old images to the new images
      setImages([...images, res.data.data._id]);
    });
  };

  return (
    <div className="w-full px-1 py-3 mb-8 bg-neutral-800 rounded-2xl flex flex-col">
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
      <div className="px-4 py-3 flex items-center justify-between w-full max-w-full">
        <span>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" onChange={handleImage} />
        </span>

        {/* <span>
            <label htmlFor="video">Video</label>
            <input type="file" id="video" name="video" />
          </span>

          <span>
            <label htmlFor="audio">Audio</label>
            <input type="file" id="audio" name="audio" />
          </span> */}

        <button
          onClick={onSubmitHandler}
          className="cursor-pointer bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
