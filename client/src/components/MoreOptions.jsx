import React, { useState } from "react";
import EllipsisIcon from "./icons/EllipsisIcon";
import DeleteIcon from "./icons/DeleteIcon";

const MoreOptions = ({ handleDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`absolute right-4 top-1 p-1 hover:bg-neutral-200 rounded-full ${
          open && "bg-neutral-200"
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
        } absolute right-4 top-10 mt-2 bg-neutral-200 rounded-md overflow-hidden shadow-xs z-20 transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`}
      >
        <button
          onClick={handleDelete}
          className="flex gap-1 text-sm items-center text-red-500 ml-auto hover:bg-neutral-300 px-4 py-2"
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
