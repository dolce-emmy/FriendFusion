import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PreviewImages = ({ images }) => {
  const count = images?.length;
  const [index, setIndex] = useState(-1);

  const image1 = images[0];
  const image2 = images[1];
  const image3 = images[2];
  const image4 = images[3];
  const image5 = images[4];
  const image6 = images[5];

  const renderImages = () =>
    count > 0 && image1 ? (
      <div className="flex flex-col gap-2 cursor-pointer">
        <div className="flex gap-2">
          <div
            className="overflow-hidden rounded-xl max-h-96 w-full"
            onClick={() => setIndex(0)}
          >
            <img
              className="h-full w-full object-cover object-center"
              src={image1?.url}
              alt={image1?.name}
            />
          </div>
          {image2 && (
            <div
              className="overflow-hidden rounded-xl max-h-96 w-full"
              onClick={() => setIndex(1)}
            >
              <img
                className="h-full w-full object-cover object-center"
                src={image2?.url}
                alt={image2?.name}
              />
            </div>
          )}
        </div>
        {image3 && (
          <div className="flex gap-2">
            {image3 && (
              <div
                className="overflow-hidden rounded-xl max-h-96 w-full"
                onClick={() => setIndex(2)}
              >
                <img
                  className="h-full w-full object-cover object-center"
                  src={image3?.url}
                  alt={image3?.name}
                />
              </div>
            )}
            {image4 && (
              <div
                className="overflow-hidden rounded-xl max-h-96 w-full"
                onClick={() => setIndex(3)}
              >
                <img
                  className="h-full w-full object-cover object-center"
                  src={image4?.url}
                  alt={image4?.name}
                />
              </div>
            )}
            {image5 && (
              <div
                className="overflow-hidden rounded-xl max-h-96 w-full relative"
                onClick={() => setIndex(4)}
              >
                {image6 && count > 5 && (
                  <div className="text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center">
                    + {count - 5}
                  </div>
                )}
                <img
                  className="h-full w-full object-cover object-center"
                  src={image5?.url}
                  alt={image5?.name}
                />
              </div>
            )}
          </div>
        )}
      </div>
    ) : null;

  return (
    <>
      {renderImages()}
      <Lightbox
        open={index >= 0}
        index={index}
        slides={images.map(({ url, name }) => ({
          src: url,
          alt: name,
        }))}
        close={() => setIndex(-1)}
        carousel={{
          finite: true,
        }}
      />
    </>
  );
};

export default PreviewImages;
