import React from "react";

function advertisement() {
  const [myImage, setMyImage] = useState("img.jpg");
  const [adsText, setAdsText] = useState("Best offer!");
  const [buttonText, setButtonText] = useState("Click  Now");
  const handleClick = () => {
    setMyImage("img.jpg");
    setAdsText("Get 30% off your first purchase!");
    setButtonText("More info");
  };
  return (
    <div className="ads-container">
      <h2> ads Sponsored </h2>
      <div className="advertisement">
        <img src="{img.jpg}" alt="advertisement" />
        <button onClick={handleClick}>{buttonText}</button>
      </div>
      <h3> Ads description </h3>
      <p>ads paragraph</p>
    </div>
  );
}

export default advertisement;