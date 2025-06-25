import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onChange(searchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, onChange]);

  return (
    <div className="flex flex-grow max-w-md">
      <div className="relative w-full">
        <button className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 rounded-full px-2 py-0.5">
          <SearchIcon fontSize="medium" />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-full ps-10 pe-4 py-2 rounded-lg bg-white shadow border-1 border-gray-200 text-sm text-gray-700 focus:outline-none placeholder:text-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
