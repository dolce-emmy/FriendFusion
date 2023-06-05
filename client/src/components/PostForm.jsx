import api from "../api";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import InputEmoji from "react-input-emoji";
import ImageIcon from "./icons/ImageIcon";
import GifIcon from "./icons/GifIcon";
import AudioIcon from "./icons/AudioIcon";
import DocumentIcon from "./icons/DocumentIcon";
import SpinnerIcon from "./icons/SpinnerIcon";
import { useThemeContext } from "../context/ThemeContext";
import PreviewImages from "./PreviewImages";

const PostForm = () => {
  const { isDarkMode } = useThemeContext();
  const { user, updatePosts } = useAppContext();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const createPost = async (images = []) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = (image) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.url !== image.url)
    );
  };

  const handleImage = (e) => {
    // setLoading(true);
    //call api to upload images
    // const formData = new FormData();
    //here we are saying that if the target files length is not equal to 0
    if (e.target.files?.length !== 0) {
      Array.from(e.target.files).forEach((file) => {
        // formData.append("file", file, file.name);
        setImages((prevImages) => [
          ...prevImages,
          { url: URL.createObjectURL(file), name: file.name, original: file },
        ]);
      });
    }
  };

  const onSubmitPost = async () => {
    setLoading(true);

    if (images.length) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("file", image.original, image.name);
      });

      api
        .post("/images/multiple", formData)
        .then(async (res) => {
          await createPost(res.data.data.map((image) => image._id));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      await createPost();
      setLoading(false);
    }
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
      <div className="flex flex-wrap gap-1 justify-center items-center relative">
        {loading && (
          <div className="w-full h-full absolute inset-0 bg-neutral-800/50 text-lg flex items-center justify-center z-20">
            Posting...
          </div>
        )}
        <PreviewImages
          images={images}
          smallSize
          disableLightBox
          onDeleteImage={handleDeleteImage}
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
            disabled={loading || !description || !images.length}
            onClick={onSubmitPost}
            className="ml-auto btn"
          >
            {loading ? <SpinnerIcon /> : "Post"}
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
