import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import DeleteIcon from "./icons/DeleteIcon";
import { useThemeContext } from "../context/ThemeContext";

const ImageWrapper = ({ image, smallSize, onDelete, children, ...rest }) => {
  const { isDarkMode } = useThemeContext();
  return image ? (
    <div
      className={`${
        smallSize ? "max-h-44 max-w-xs" : "max-h-96"
      } overflow-hidden rounded-xl w-full relative`}
      {...rest}
    >
      {onDelete && (
        <button
          className={`${
            isDarkMode ? "dark-hover" : "light-hover"
          } absolute right-2 top-2 block p-2 rounded-full cursor-pointer`}
          onClick={() => onDelete(image)}
        >
          <DeleteIcon />
        </button>
      )}
      {children}
      <img
        className="h-full w-full object-cover object-center"
        src={image?.url}
        alt={image?.name}
      />
    </div>
  ) : null;
};

const PreviewImages = ({
  images,
  onDeleteImage,
  smallSize,
  disableLightBox,
}) => {
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
          <ImageWrapper
            image={image1}
            onDelete={onDeleteImage}
            smallSize={smallSize}
            onClick={() => setIndex(0)}
          />
          <ImageWrapper
            image={image2}
            onDelete={onDeleteImage}
            smallSize={smallSize}
            onClick={() => setIndex(1)}
          />
        </div>
        {image3 && (
          <div className="flex gap-2">
            <ImageWrapper
              image={image3}
              onDelete={onDeleteImage}
              smallSize={smallSize}
              onClick={() => setIndex(2)}
            />
            <ImageWrapper
              image={image4}
              onDelete={onDeleteImage}
              smallSize={smallSize}
              onClick={() => setIndex(3)}
            />
            <ImageWrapper
              image={image5}
              onDelete={onDeleteImage}
              smallSize={smallSize}
              onClick={() => setIndex(4)}
            >
              {image6 && count > 5 && (
                <div className="text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center">
                  + {count - 5}
                </div>
              )}
            </ImageWrapper>
          </div>
        )}
      </div>
    ) : null;

  return (
    <>
      {renderImages()}
      {!disableLightBox ? (
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
      ) : null}
    </>
  );
};

export default PreviewImages;
