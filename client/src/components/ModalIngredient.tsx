import React, { useState } from 'react';
import { ArrowUpDown, Plus, ChevronRight, ChevronsRight } from 'lucide-react';
import {
    mockFoodItems,
   
} from '../data/temporary';

interface ModalIngredientProps {
    onClose: () => void;
}

const ModalIngredient: React.FC<ModalIngredientProps> = ({
    onClose,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('nutrient');
    const [filterDatabase, setFilterDatabase] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // Dữ liệu tạm để hiển thị bảng
    const allItems = mockFoodItems;

    const filtered = allItems.filter(
        (item) =>
            (filterDatabase === 'all' || item.category === filterDatabase) &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

    const paginatedItems = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderPagination = () => {
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    };

    const handleAdd = (): void => {
        
        onClose();
    };

    return (
        <div className="bg-gray-50 rounded p-1 space-y-4">
            {/* Control Panel */}
            <div className="flex gap-3 items-center">
                <input
                    type="text"
                    placeholder="Search food"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm flex-1 focus:outline-none focus:border-teal-500"
                />

                <div className="flex items-center gap-2 border border-gray-300 rounded bg-white px-2 py-1">
                    <ArrowUpDown className="w-4 h-4 text-gray-500" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm border-none outline-none bg-transparent text-gray-600"
                    >
                        <option value="nutrient">Sort by nutrient</option>
                        <option value="energy">Sort by energy</option>
                        <option value="fat">Sort by fat</option>
                        <option value="carbohydrate">
                            Sort by carbohydrate
                        </option>
                        <option value="protein">Sort by protein</option>
                    </select>
                </div>

                <select
                    value={filterDatabase}
                    onChange={(e) => setFilterDatabase(e.target.value)}
                    className="px-2 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-teal-500 text-gray-600"
                >
                    <option value="all">All databases</option>
                    <option value="Community Recipes">Community Recipes</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_60px] gap-4 px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                    <div>Nutritional Information</div>
                    <div className="text-center">Energy</div>
                    <div className="text-center">Fat</div>
                    <div className="text-center">Carboh...</div>
                    <div className="text-center">Protein</div>
                    <div></div>
                </div>

                {/* Table Rows */}
                {paginatedItems.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_60px] gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 group items-center"
                    >
                        <div>
                            <div className="text-sm font-medium text-gray-800 mb-1">
                                {item.name}
                            </div>
                            <div className="text-xs text-gray-500 mb-1">
                                {item.category}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <input
                                    type="text"
                                    defaultValue={item.quantity}
                                    className="w-12 px-1 py-0.5 border border-gray-300 rounded text-center"
                                />
                                <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 min-w-[100px]">
                                    {item.unit}
                                </span>
                                <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-r">
                                    {item.grams}g
                                </span>
                            </div>
                        </div>
                        <div className="text-center text-sm text-gray-700">
                            {item.energy} kcal
                        </div>
                        <div className="text-center text-sm text-gray-700">
                            {item.fat} g
                        </div>
                        <div className="text-center text-sm text-gray-700">
                            {item.carbohydrate} g
                        </div>
                        <div className="text-center text-sm text-gray-700">
                            {item.protein} g
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleAdd}
                                className="w-10 h-10 bg-teal-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-teal-600"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-1 py-2">
                {renderPagination().map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded text-sm flex items-center justify-center ${
                            currentPage === page
                                ? 'bg-gray-200 text-gray-900 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ))}
                {totalPages > 5 && (
                    <>
                        <span className="px-2 text-gray-400">...</span>
                        <button className="w-8 h-8 rounded text-sm flex items-center justify-center text-gray-600 hover:bg-gray-100">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded text-sm flex items-center justify-center text-gray-600 hover:bg-gray-100">
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ModalIngredient;
