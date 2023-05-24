import axios from "axios";
import React, { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

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
    <div className="">
      
      <div className="
        flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-neutral-800 rounded-2xl shadow-lg text-neutral-100 text-center mt-5    
      ">
      <h1><i className="text-red-500 fa-brands fa-youtube"></i> YouTube</h1>
      
      {/*here we are saying that if the length of the video array is greater than 0, then we want to display the video at the index of the index state variable   */}
      {video.length > 0 && (
        
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-neutral-800 rounded-2xl shadow-lg text-neutral-100 text-center mt-3">
            <h1>{video[index].snippet.title}</h1>
            <img className=" h-36" src={video[index].snippet.thumbnails.default.url} alt="thumbnail" />
        </div>
        )}

        {/* {video.map((vid) => (
          <div key={vid.id}>
            <h1>{vid.snippet.title}</h1>
            <img src={vid.snippet.thumbnails.default.url} alt="thumbnail" />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Youtube;
