import React from "react";
import EllipsisIcon from "./icons/EllipsisIcon";
import DeleteIcon from "./icons/DeleteIcon";
import Dropdown from "./Dropdown";

const MoreOptions = ({ handleDelete }) => (
  <Dropdown className="absolute right-4 top-1 !p-1" Icon={EllipsisIcon}>
    <button
      onClick={handleDelete}
      className="flex gap-1 text-sm items-center text-red-500 ml-auto px-4 py-2"
    >
      <span>
        <DeleteIcon />
      </span>
      <span>Delete</span>
    </button>
  </Dropdown>
);

export default MoreOptions;
