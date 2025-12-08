import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="relative w-60 hidden md:block">
      {/* Search Icon */}
      <SearchIcon 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" 
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
    </div>
  );
};

export default Search;
