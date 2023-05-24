import React, { useEffect } from "react";

import { useState } from "react";



function advertisement() {
  
  const [AdImg, setAdImage] = useState({
    imgUrl: "./photos/info4.jpeg"
  });


  const [adsText, setAdsText] = useState("Best offer!");
  const [buttonText, setButtonText] = useState("Click  Now");

useEffect(() => {

  // here we want to display the image and the text

  setAdImage(AdImg);
  
  console.log(AdImg)
  setAdsText("Get 30% off your first purchase!");



}, [])


  // const handleClick = () => {
  //   setMyImage("img.jpg");
  //   setAdsText("Get 30% off your first purchase!");
  //   setButtonText("More info");
  // };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-neutral-800 rounded-2xl shadow-lg text-neutral-100 text-center mt-5    ">
      <h2> ads Sponsored </h2>
      <div className=" 
      
      flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-neutral-800 rounded-2xl shadow-lg text-neutral-100 text-center mt-3
      
      ">
        <img src={AdImg.imgUrl} alt="advertisement" />
        {/* <button onClick={handleClick}>{buttonText}</button> */}
      </div>
      <h3 >{adsText}</h3>
      <p>MikaCosmetics</p>
    </div>
  );
}

export default advertisement;