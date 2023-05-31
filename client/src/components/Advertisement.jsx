import { set } from "date-fns";
import { useState, useEffect } from "react";
import { v4 as uuid4v } from "uuid";

function Advertisement() {
  const [AdImg, setAdImage] = useState([
    {
      id: uuid4v(),
      imgUrl: "./photos/info4.jpeg",
      title: "MikaCosmetics",
      texts: "Get 30% off your first purchase!",
    },

    {
      id: uuid4v(),
      imgUrl: "./photos/magnum.jpg",
    },

    {
      id: uuid4v(),
      imgUrl: "./photos/nissan.png",
    },

    {
      id: uuid4v(),
      imgUrl: "./photos/lactaid.jpg",
    },

    {
      id: uuid4v(),
      imgUrl: "./photos/whole-food.png",
    },

    {
      id: uuid4v(),
      imgUrl: "./photos/kitkat.jpg",
    },

    {
      id: uuid4v(),
      imgUrl: "./photos/sony.jpg",
    },
  ]);

  const [adsText, setAdsText] = useState("Best offer!");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // here we want to display the image and the text

    setAdImage(AdImg);

    console.log(AdImg);
    // setAdsText("Get 30% off your first purchase!");
  }, []);

  useEffect(() => {
    // here we want to the ads to change every 5 seconds

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex > AdImg.length - 1) {
          return 0;
        }

        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 py-3 bg-neutral-800 rounded-2xl shadow-lg text-neutral-100 text-center">
      
      <div className="p-4">
      <h2> ads Sponsored </h2>
        {AdImg.length > 0 && (
          <div className="p-4 flex flex-col gap-2">
            <h4>{AdImg[index].title}</h4>
            <img
            className="w-full object-fit object-center"
              
              src={AdImg[index].imgUrl}
              alt="thumbnail"
             
            />

            <p>
              <strong>{AdImg[index].texts}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Advertisement;
