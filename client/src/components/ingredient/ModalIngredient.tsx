import React, { useEffect, useState, type ChangeEvent } from 'react';
import { Plus } from 'lucide-react';
import { atminDispatch, atminSelector } from '../../hooks/reduxHook';
import { filterFoods, getFoods } from '../../apis/food.api';
import type {
    FilterFoodPayload,
    InitialFoodProps,
} from '../../interfaces/foods.interface';
import type {
    FoodServing,
    Ingredient,
} from '../../interfaces/recipe.interface';
import { calMacronutrients } from '../../redux/reducers/createRecipe.reducer';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { Pagination, Select } from 'antd';

interface ModalIngredientProps {
    onAddMainIng?: (ingredient: Ingredient) => void;
    onAddEquivalentIng?: (id: number, equivalent: FoodServing) => void;
    currentMainId?: number;
}

const ModalIngredient: React.FC<ModalIngredientProps> = ({
    onAddEquivalentIng,
    onAddMainIng,
    currentMainId,
}) => {
    const [keyword, setKeyWord] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dataFoods: InitialFoodProps = atminSelector((s) => s.food);
    const dispatch = atminDispatch();
    const [sortOrder, setSortOrder] = useState<'increase' | 'decrease'>(
        'increase'
    );
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const categoryOptions = Array.from(
        new Set(dataFoods.foods.map((f) => f.category))
    ).map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));

    categoryOptions.unshift({ value: '', label: 'All' });

    const [category, setCategory] = useState('');

    useEffect(() => {
        if (dataFoods.foods.length === 0) dispatch(getFoods());
    }, [dispatch, dataFoods]);

    useEffect(() => {
        const data: FilterFoodPayload = {
            keyword,
            category,
            page: String(currentPage),
            sort: { by: sortBy, order: sortOrder },
        };
        dispatch(filterFoods(data));
    }, [keyword, category, currentPage, sortBy, sortOrder, dispatch]);

    const handleAddMain = (id: number, serving: number) => {
        if (onAddMainIng) {
            const newIngredient: Ingredient = {
                main: { id, serving },
                equivalents: [],
            };
            onAddMainIng(newIngredient);
            dispatch(calMacronutrients(dataFoods.foods));
        }
    };

    const handleAddEquivalent = (mainId: number, item: FoodServing) => {
        if (onAddEquivalentIng) {
            onAddEquivalentIng(mainId, item);
        }
    };

    return (
        <div className="bg-gray-50 rounded p-1 space-y-4">
            <div className="flex gap-3 items-center"></div>

            <div className="bg-white rounded-lg my-5 w-full">
                <div className="flex gap-4 items-center md:flex-row flex-col">
                    <input
                        placeholder="Search food"
                        value={keyword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setKeyWord(e.target.value)
                        }
                        className="focus:outline-none focus:border-[#36acf5] focus:shadow-[0_0_0_1px_rgba(22,119,255,0.2)] transition-all duration-200 w-[50%] border border-gray-300 h-10 rounded-[5px] text-gray-500 px-4 py-2"
                    />

                    <div className="relative flex-1 w-[25%]">
                        <div
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-500"
                            onClick={() =>
                                setSortOrder((pre) =>
                                    pre === 'decrease' ? 'increase' : 'decrease'
                                )
                            }
                        >
                            {sortOrder === 'decrease' ? (
                                <FaSortAmountDown size={18} />
                            ) : (
                                <FaSortAmountUp size={18} />
                            )}
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
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
                        onChange={(value) => setCategory(value)}
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
                                      {
                                          value: 'vegetarian',
                                          label: 'Vegetarian',
                                      },
                                      { value: 'desserts', label: 'Desserts' },
                                      { value: 'drinks', label: 'Drinks' },
                                      { value: 'snacks', label: 'Snacks' },
                                  ]
                        }
                    />
                </div>
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
                {dataFoods.foodFilter.map((item) => (
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
            <div className="flex justify-center py-2">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage} // số item mỗi trang
                    total={dataFoods.totalItems} // tổng số item
                    onChange={(page) => setCurrentPage(page)} // khi đổi trang
                    showSizeChanger // bật dropdown chọn số item/trang
                    pageSizeOptions={['5', '10', '20', '50']} // các lựa chọn
                    onShowSizeChange={(_, size) => {
                        setItemsPerPage(size); // cập nhật số item mỗi trang
                        setCurrentPage(1); // reset về trang 1
                    }}
                    showQuickJumper // cho nhập trang nhanh
                />
            </div>
        </div>
    );
};

export default ModalIngredient;
