import { Select } from 'antd';
import type { ChangeEvent } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

type FilterBarProps = {
    searchTerm: string;
    onSearch: (s: string) => void;
    sortBy: string;
    onSortBy: (s: string) => void;
    sortOrder: 'increase' | 'decrease';
    onToggleSortOrder: () => void;
    category: string;
    onCategory: (c: string) => void;
    categoryOptions?: Array<{ value: string; label: string }>;
};

export const FilterBar = ({
    searchTerm,
    onSearch,
    sortBy,
    onSortBy,
    sortOrder,
    onToggleSortOrder,
    category,
    onCategory,
    categoryOptions,
}: FilterBarProps) => {
    return (
        <div className="bg-white rounded-lg my-5 w-full">
            <div className="flex gap-4 items-center md:flex-row flex-col">
                <input
                    placeholder="Search food"
                    value={searchTerm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onSearch(e.target.value)
                    }
                    className="focus:outline-none focus:border-[#36acf5] focus:shadow-[0_0_0_1px_rgba(22,119,255,0.2)] transition-all duration-200 w-[50%] border border-gray-300 h-10 rounded-[5px] text-gray-500 px-4 py-2"
                />

                <div className="relative flex-1 w-[25%]">
                    <div
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-500"
                        onClick={onToggleSortOrder}
                    >
                        {sortOrder === 'decrease' ? (
                            <FaSortAmountDown size={18} />
                        ) : (
                            <FaSortAmountUp size={18} />
                        )}
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => onSortBy(e.target.value)}
                        className="w-full h-10 pl-10 px-4 py-2 border border-gray-300 rounded-[5px] text-gray-700 bg-white cursor-pointer appearance-none
focus:outline-none focus:border-[#36acf5] focus:shadow-[0_0_0_1px_rgba(22,119,255,0.2)] transition-all duration-200 "
                    >
                        <option value="">Sort by nutrient</option>
                        <option value="calories">Energy</option>
                        <option value="protein">Protein</option>
                        <option value="fat">Fat</option>
                        <option value="carbohydrate">Carbohydrates</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <IoIosArrowDown />
                    </span>
                </div>

                <Select
                    value={category || undefined}
                    onChange={(value) => onCategory(value)}
                    placeholder="Category"
                    style={{
                        width: '25%',
                        height: 40,
                        borderRadius: 5,
                    }}
                    className="text-gray-700"
                    popupMatchSelectWidth={false}
                    options={
                        categoryOptions && categoryOptions.length > 0
                            ? categoryOptions
                            : [
                                  { value: 'vegetarian', label: 'Vegetarian' },
                                  { value: 'desserts', label: 'Desserts' },
                                  { value: 'drinks', label: 'Drinks' },
                                  { value: 'snacks', label: 'Snacks' },
                              ]
                    }
                />
            </div>
        </div>
    );
};
