import api from "../api";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const PostForm = () => {
  const { user } = useAppContext();
  const [images, setImages] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(e.target.description.value);
    const data = {
      userId: user._id,
      description: e.target.description.value,
      images,
    };

    api.post("/posts", data).then((res) => {
      console.log(res.data);
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
      setImages([...images, res.data.data._id]);
    });
  };

  return (
    <div className="w-full px-1 py-3 mb-8 bg-neutral-800 rounded-2xl flex flex-col">
      <form onSubmit={onSubmitHandler}>
        <div className="flex items-center px-4 py-3">
          <img
            className="h-14 w-14 rounded-full mr-4"
            src="https://picsum.photos/id/1027/150/150"
          />
          <input
            className="w-full h-16 px-4 outline-none rounded-xl"
            type="text"
            id="description"
            name="description"
            autoComplete="off"
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

          <input
            type="submit"
            value="Post"
            className="cursor-pointer bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
