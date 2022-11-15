import React, { useState } from "react";

const styles = {
  open: "absolute top-[245px] w-44 bg-white rounded divide-gray-100 shadow dark:bg-gray-700",
  close:
    "hidden z-10 w-44 bg-white rounded divide-gray-100 shadow dark:bg-gray-700",
};

interface Props {
  episode: string[];
}

export default function Dropdown({ episode }: Props) {
  const [open, setOpen] = useState(false);
  const clickHandler = () => setOpen(!open);

  return (
    <>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={clickHandler}
      >
        Episodes
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div id="dropdown" className={open ? styles.open : styles.close}>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {episode.map((item, index) => {
            const lastSlashIndex = item.lastIndexOf("/") + 1;
            const numEpisode = `episode ${item.slice(lastSlashIndex)}`;
            return (
              <li key={index}>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {numEpisode}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
