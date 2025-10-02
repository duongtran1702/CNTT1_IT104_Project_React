import React from "react";
import { FaSortAmountUp } from "react-icons/fa";

const SearchFilter: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search food"
        className="flex-1 min-w-[250px] px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Sort */}
      <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded shadow-sm min-w-[200px]">
        <FaSortAmountUp className="text-gray-600" />
        <select className="flex-1 border-0 focus:ring-0 text-sm text-gray-700">
          <option value="overall">Sort by overall</option>
          <option value="energy">Sort by energy</option>
          <option value="fat">Sort by fat</option>
          <option value="carbohydrate">Sort by carbohydrate</option>
          <option value="protein">Sort by protein</option>
        </select>
      </div>

      {/* Filter category */}
      <select className="px-2 py-1 border border-gray-300 rounded shadow-sm min-w-[200px]">
        <option>All Categories</option>
        <option>Vegetarian</option>
        <option>Vegan</option>
        <option>Meat</option>
      </select>
    </div>
  );
};

export default SearchFilter;
