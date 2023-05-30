import axios from "axios";
import React, { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
import VideoIcon from "./icons/VideoIcon";

const Youtube = () => {
  const [video, setVideo] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setVideo(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // here we want the videos to be changed every 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        // here we are saying that the new index is the previous index + 1 so that we can go to the next video
        const newIndex = prevIndex + 1;
        // here we are saying if the index is greater than the length of the array, then we want to go back to the first video
        if (newIndex > video.length - 1) {
          return 0;
        }
        return newIndex;
      });
    }, 5000);
    // here we are clearing the interval so that we don't have multiple intervals running at the same time and causing issues
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-4 py-6 bg-neutral-800 rounded-2xl shadow-lg text-neutral-100 text-center">
      <h3 className="flex gap-2 items-center text-xl font-semibold">
        <VideoIcon /> Trending Videos
      </h3>

      {/*here we are saying that if the length of the video array is greater than 0, then we want to display the video at the index of the index state variable   */}
      {video.length > 0 && (
        <div className="p-4 flex flex-col gap-2">
          <h4>{video[index].snippet.title}</h4>
          <iframe
            className="h-60"
            src={`https://www.youtube.com/embed/${video[index].id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>

          {/* <a target="_blank" href={`https://youtu.be/${video[index].id}`}>
            <img
              className="w-full h-36 object-cover object-center"
              src={video[index].snippet.thumbnails.default.url}
              alt="thumbnail"
            />
          </a> */}
        </div>
      )}

      {/* {video.map((vid) => (
          <div key={vid.id}>
            <h1>{vid.snippet.title}</h1>
            <img src={vid.snippet.thumbnails.default.url} alt="thumbnail" />
          </div>
        ))} */}
    </div>
  );
};

export default Youtube;
