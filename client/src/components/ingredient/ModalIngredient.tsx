import React, { useEffect, useState } from 'react';
import { ArrowUpDown, Plus, ChevronRight, ChevronsRight } from 'lucide-react';
import { atminDispatch, atminSelector } from '../../hooks/reduxHook';
import { getFoods } from '../../apis/food.api';
import type { Food } from '../../interfaces/foods.interface';
import type {
    FoodServing,
    Ingredient,
} from '../../interfaces/recipe.interface';
import { calMacronutrients } from '../../redux/reducers/createRecipe.reducer';

interface ModalIngredientProps {
    // onClose: () => void;
    onAddMainIng?: (ingredient: Ingredient) => void;
    onAddEquivalentIng?: (id: number, equivalent: FoodServing) => void;
    currentMainId?: number;
}

const ModalIngredient: React.FC<ModalIngredientProps> = ({
    // onClose,
    onAddEquivalentIng,
    onAddMainIng,
    currentMainId,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('nutrient');
    const [filterDatabase, setFilterDatabase] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const allItems: Food[] = atminSelector((s) => s.food.foods);
    const dispatch = atminDispatch();

    useEffect(() => {
        if (allItems.length === 0) {
            dispatch(getFoods());
        }
    }, [dispatch, allItems]);

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

    const handleAddMain = (id: number, serving: number) => {
        if (onAddMainIng) {
            const newIngredient: Ingredient = {
                main: { id, serving },
                equivalents: [],
            };
            onAddMainIng(newIngredient);
            dispatch(calMacronutrients(allItems));
        }
    };

    const handleAddEquivalent = (mainId: number, item: FoodServing) => {
        if (onAddEquivalentIng) {
            onAddEquivalentIng(mainId, item);
        }
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
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm flex-1 focus:outline-none focus:border-teal-500 text-gray-600"
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
                    <div className="text-center">Carbohidrat</div>
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
                                    type="number"
                                    min={1}
                                    defaultValue={1}
                                    id={`qty-${item.id}`}
                                    className="w-12 px-1 py-0.5 border border-gray-300 rounded text-center text-gray-500"
                                />
                                <span className="px-2 py-0.5  border border-gray-300 min-w-[100px] text-gray-500 rounded">
                                    portion ({item.quantity} g)
                                </span>
                                <span className="px-2 py-0.5 border border-gray-300 rounded text-gray-500">
                                    {item.quantity}g
                                </span>
                            </div>
                        </div>
                        <div className="text-center text-sm text-gray-700">
                            {item.calories} kcal
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
                                onClick={() => {
                                    const input = document.getElementById(
                                        `qty-${item.id}`
                                    ) as HTMLInputElement;
                                    const qty = input
                                        ? parseInt(input.value)
                                        : 1;

                                    if (onAddMainIng) {
                                        handleAddMain(item.id, qty);
                                    } else if (
                                        onAddEquivalentIng &&
                                        currentMainId
                                    ) {
                                        handleAddEquivalent(currentMainId, {
                                            id: item.id,
                                            serving: qty,
                                        });
                                    }
                                }}
                                className="w-10 h-10 bg-teal-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-teal-600 cursor-pointer"
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
