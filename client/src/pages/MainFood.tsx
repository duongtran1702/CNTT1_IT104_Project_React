import { Pagination, Select } from 'antd';
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { filterFoods, getFoods } from '../apis/food.api';

import { getDetaiFood, resetDetailFood } from '../redux/reducers/food.reducer';
import CardFood from '../components/CardFood';
import { ModalAddFood } from '../components/ModalAddFood';
import { Plus } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import type {
    FilterFoodPayload,
    InitialFoodProps,
} from '../interfaces/foods.interface';
import { debounce } from 'lodash';

export const FoodMain = () => {
    const [open, setOpen] = useState(false);

    const [keyword, setKeyWord] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dataFoods: InitialFoodProps = atminSelector((s) => s.food);
    const dispatch = atminDispatch();
    const [sortOrder, setSortOrder] = useState<'increase' | 'decrease'>(
        'increase'
    );
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const categoryOptions = Array.from(
        new Set(dataFoods.foods.map((f) => f.category))
    ).map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));
    categoryOptions.unshift({ value: '', label: 'All' });
    const [category, setCategory] = useState('');

    const debouncedDispatch = useMemo(
        () =>
            debounce((kw: string) => {
                const data: FilterFoodPayload = {
                    keyword: kw,
                    category,
                    page: String(currentPage),
                    sort: {
                        by: sortBy,
                        order: sortOrder,
                        itemsPerPage: String(itemsPerPage),
                    },
                };
                dispatch(filterFoods(data));
            }, 500),
        [category, currentPage, sortBy, sortOrder, itemsPerPage, dispatch]
    );

    useEffect(() => {
        debouncedDispatch(keyword);
        return () => {
            debouncedDispatch.cancel();
        };
    }, [keyword, debouncedDispatch]);

    useEffect(() => {
        if (keyword === '') {
            const data: FilterFoodPayload = {
                keyword: '',
                category,
                page: String(currentPage),
                sort: {
                    by: sortBy,
                    order: sortOrder,
                    itemsPerPage: String(itemsPerPage),
                },
            };
            dispatch(filterFoods(data));
        }
    }, [
        category,
        currentPage,
        sortBy,
        sortOrder,
        itemsPerPage,
        dispatch,
        keyword,
    ]);

    useEffect(() => {
        document.title = 'Foods - Nutrium';
        if (dataFoods.foods.length === 0) dispatch(getFoods());
    }, [dispatch, dataFoods.foods.length]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            <h3 className="text-xl font-[500] text-gray-800 mb-1">Foods</h3>
            <p className="text-gray-500 mb-4">
                Search, check and create new ingredient
            </p>

            <div className="flex gap-4 items-center md:flex-row flex-col">
                <input
                    placeholder="Search food"
                    value={keyword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setKeyWord(e.target.value)
                    }
                    className="focus:outline-none focus:border-[#36acf5] focus:shadow-[0_0_0_1px_rgba(22,119,255,0.2)] transition-all duration-200 w-[50%] border border-gray-300 h-10 rounded-[5px] text-gray-500 px-4 py-2"
                />

                <div className="relative flex-1 w-[25%] min-w-[250px]">
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
                        minWidth: 250,
                        borderRadius: 5,
                    }}
                    className="text-gray-700"
                    popupMatchSelectWidth={false}
                    options={categoryOptions}
                />
            </div>

            {/* Recipes Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '30px',
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                }}
            >
                <div className="flex flex-col gap-3 w-full my-5">
                    {dataFoods.foodFilter.map((item) => (
                        <CardFood
                            key={item.id}
                            data={item}
                            onClick={() => {
                                dispatch(getDetaiFood(item));
                                setOpen(true);
                            }}
                        />
                    ))}

                    <div
                        className="w-full bg-white border border-gray-200 shadow-sm pl-5 h-fit rounded-[5px] cursor-pointer "
                        onClick={() => {
                            setOpen(true);
                            dispatch(resetDetailFood());
                        }}
                    >
                        <button className="flex items-center gap-3 py-1 text-gray-600 transition-colors group cursor-pointer ">
                            <div className="relative">
                                <div className="w-10 h-10 flex items-center justify-center transition-colors">
                                    <Plus size={20} className="text-gray-600" />
                                </div>
                                {/* Stack Effect */}
                            </div>
                            <span className="text-base font-medium cursor-pointer ">
                                Add new Food
                            </span>
                        </button>
                    </div>

                    <ModalAddFood open={open} onClose={() => setOpen(false)} />
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center py-2">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={dataFoods.totalItems}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger
                    pageSizeOptions={['5', '8', '10']}
                    onShowSizeChange={(_, size) => {
                        setItemsPerPage(Number(size));
                        setCurrentPage(1);
                    }}
                    showQuickJumper={false}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};
