import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { handleSearchQuery } = useSearchContext();

  return (
    <div className="flex justify-center pt-4 pb-3 sticky top-14 bg-black">
      <form
        className="flex flex-wrap gap-2 items-stretch justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="py-2 px-3 w-[65%] md:w-auto rounded-md bg-white text-xl"
          placeholder="Search for movies..."
          onChange={() => handleSearchQuery(value)}
          value={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="signBtn flex items-center justify-center gap-2"
        >
          <i className="flex md:hidden fa-solid fa-magnifying-glass"></i>
          <span className="hidden md:flex">Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
