import api from "../api";
import { useAppContext } from "../context/AppContext";

import { useEffect } from "react";

const PostForm = () => {
  const { post, setPost } = useAppContext();

  useEffect(() => {
    api.get("/posts").then((res) => {
      console.log(res.data);
      setPost(res.data.data);
    });
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(e.target.description.value);
    const data = {
      description: e.target.description.value,
    };

    // const data = new FormData(e.target)
    console.log(data);
    api.post("/posts", data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <img src="" alt="" />
      <form onSubmit={onSubmitHandler}>
        <br />
        <label htmlFor="post">Post</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={post?.description}
        />
        <br />
        <br />

        <span>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" />
        </span>

        <span>
          <label htmlFor="video">Video</label>
          <input type="file" id="video" name="video" />
        </span>

        <span>
          <label htmlFor="audio">Audio</label>
          <input type="file" id="audio" name="audio" />
        </span>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
