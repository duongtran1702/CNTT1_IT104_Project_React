import React from "react";

const RecipesGrid: React.FC = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
      {/* Card Placeholder */}
      <div className="h-56 border border-gray-200 rounded shadow-sm flex items-center justify-center bg-gray-50 text-gray-400">
        Card Placeholder
      </div>
      <div className="h-56 border border-gray-200 rounded shadow-sm flex items-center justify-center bg-gray-50 text-gray-400">
        Card Placeholder
      </div>
    </div>
  );
};

export default RecipesGrid;
