import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { getFoods } from '../apis/food.api';
import type { Food } from '../interfaces/foods.interface';
import { getDetaiFood, resetDetailFood } from '../redux/reducers/food.reducer';
import CardFood from '../components/CardFood';
import { ModalAddFood } from '../components/ModalAddFood';
import { FilterBar } from '../components/FilterBar';
import { Plus } from 'lucide-react';

export const FoodMain = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'increase' | 'decrease'>(
        'increase'
    );
    const [categoryFilter, setCategoryFilter] = useState('');
    const dispatch = atminDispatch();
    const foods: Food[] = atminSelector((s) => s.food.foods);

    const getNumericField = (f: Food, key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const v = (f as unknown as Record<string, any>)[key];
        if (v === undefined || v === null) return 0;
        const n = parseFloat(String(v).replace(/[^0-9.-]+/g, ''));
        return Number.isFinite(n) ? n : 0;
    };

    // compute unique categories from foods
    const categoryOptions = Array.from(
        new Set(foods.map((f) => f.category).filter(Boolean))
    ).map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));

    useEffect(() => {
        document.title = 'Foods - Nutrium';
        if (foods.length === 0) dispatch(getFoods());
    }, [dispatch, foods]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            {/* Title */}
            <h3 className="text-xl font-[500] text-gray-800 mb-1">Recipes</h3>
            <p className="text-gray-500 mb-4">
                Search, check and create new recipes
            </p>

            {/* Search + Filters */}
            <FilterBar
                searchTerm={searchTerm}
                onSearch={(s) => {
                    setSearchTerm(s);
                    setCurrentPage(1);
                }}
                sortBy={sortBy}
                onSortBy={(s) => {
                    setSortBy(s);
                }}
                sortOrder={sortOrder}
                onToggleSortOrder={() =>
                    setSortOrder((p) =>
                        p === 'increase' ? 'decrease' : 'increase'
                    )
                }
                category={categoryFilter}
                onCategory={(c) => {
                    setCategoryFilter(c);
                    setCurrentPage(1);
                }}
                categoryOptions={categoryOptions}
            />

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
                <div className="flex flex-col gap-3 w-full">
                    {(() => {
                        // apply search, filter, sort client-side
                        let list = foods.slice();

                        if (searchTerm.trim()) {
                            const q = searchTerm.trim().toLowerCase();
                            list = list.filter((f) =>
                                f.name.toLowerCase().includes(q)
                            );
                        }

                        if (categoryFilter) {
                            list = list.filter(
                                (f) => f.category === categoryFilter
                            );
                        }

                        if (sortBy) {
                            list.sort((a: Food, b: Food) => {
                                const av = getNumericField(a, sortBy);
                                const bv = getNumericField(b, sortBy);
                                if (sortOrder === 'increase') return av - bv;
                                return bv - av;
                            });
                        }

                        const pageSize = 4;
                        const start = (currentPage - 1) * pageSize;
                        const paged = list.slice(start, start + pageSize);

                        return paged.map((food) => (
                            <CardFood
                                key={food.id}
                                data={food}
                                onClick={() => {
                                    dispatch(getDetaiFood(food));
                                    setOpen(true);
                                }}
                            />
                        ));
                    })()}

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
            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    total={(() => {
                        // total number after filters
                        let list = foods.slice();
                        if (searchTerm.trim()) {
                            const q = searchTerm.trim().toLowerCase();
                            list = list.filter((f) =>
                                f.name.toLowerCase().includes(q)
                            );
                        }
                        if (categoryFilter)
                            list = list.filter(
                                (f) => f.category === categoryFilter
                            );
                        return list.length;
                    })()}
                    pageSize={4}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};
