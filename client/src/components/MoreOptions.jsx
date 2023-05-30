import React, { useState } from "react";
import EllipsisIcon from "./icons/EllipsisIcon";
import DeleteIcon from "./icons/DeleteIcon";

const MoreOptions = ({ handleDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <button
        onClick={() => setOpen(!open)}
        className="absolute right-4 top-2 p-1 hover:bg-neutral-500 rounded-full"
      >
        <EllipsisIcon />
      </button>
      <div
        className={`transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 ${
          open
            ? `opacity-1 visible translate-x-0 translate-y-0 scale-100`
            : `opacity-0 invisible`
        }`}
      >
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg outline-none"
          role="menu"
        >
          <button
            onClick={handleDelete}
            className="flex gap-1 text-sm items-center text-red-500 ml-auto"
          >
            <span>Delete</span>
            <span>
              <DeleteIcon />
            </span>
          </button>
        </div>
      </div> */}

      <button
        onClick={() => setOpen(!open)}
        className={`absolute right-4 top-2 p-1 hover:bg-neutral-600 rounded-full ${
          open && "bg-neutral-600"
        }`}
      >
        <EllipsisIcon />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 h-full w-full z-10"
        ></div>
      )}
      <div
        className={`${
          open
            ? "opacity-1 visible translate-y-0 scale-100"
            : "opacity-0 invisible"
        } absolute right-4 top-10 mt-2 bg-neutral-700 rounded-md overflow-hidden shadow-xs z-20 transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`}
      >
        <button
          onClick={handleDelete}
          className="flex gap-1 text-sm items-center text-red-500 ml-auto hover:bg-neutral-600 px-4 py-2"
        >
          <span>
            <DeleteIcon />
          </span>
          <span>Delete</span>
        </button>
      </div>
    </>
  );
};

export default MoreOptions;
