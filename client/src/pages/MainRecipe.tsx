import { useState, useEffect, type ChangeEvent, useMemo } from 'react';
import { Select, Pagination, Skeleton } from 'antd';
import debounce from 'lodash/debounce';

import {
    FaCheckSquare,
    FaHeart,
    FaPen,
    FaPlus,
    FaSortAmountDown,
    FaSortAmountUp,
} from 'react-icons/fa';
import { CardRecipe } from '../components/CardRecipe';
import { useNavigate } from 'react-router-dom';
import type {
    FilterRecipePayload,
    InitialRecipeProps,
} from '../interfaces/recipe.interface';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { filterRecipes, getRecipes } from '../apis/recipe.api';
import { IoIosArrowDown } from 'react-icons/io';
import { resetCreateRecipe } from '../redux/reducers/createRecipe.reducer';

export const MainRecipe = () => {
    const [keyword, setKeyWord] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dataRecipes: InitialRecipeProps = atminSelector((s) => s.recipe);
    const dispatch = atminDispatch();
    const [sortOrder, setSortOrder] = useState<'increase' | 'decrease'>(
        'increase'
    );
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const categoryOptions = Array.from(
        new Set(dataRecipes.recipes.map((i) => i.category))
    ).map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));

    categoryOptions.unshift({ value: '', label: 'All' });

    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const nvg = useNavigate();

    useEffect(() => {
        if (dataRecipes.recipes.length === 0) {
            dispatch(getRecipes());
        }
    }, [dataRecipes.recipes.length, dispatch]);

    useEffect(() => {
        document.title = 'Recipes - Nutrium';
        const timer = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    const debouncedDispatch = useMemo(
        () =>
            debounce((kw: string) => {
                const data: FilterRecipePayload = {
                    keyword: kw,
                    category,
                    page: String(currentPage),
                    sort: {
                        by: sortBy,
                        order: sortOrder,
                        itemsPerPage: String(itemsPerPage),
                    },
                };
                dispatch(filterRecipes(data));
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
            const data: FilterRecipePayload = {
                keyword: '',
                category,
                page: String(currentPage),
                sort: {
                    by: sortBy,
                    order: sortOrder,
                    itemsPerPage: String(itemsPerPage),
                },
            };
            dispatch(filterRecipes(data));
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            {/* Title */}
            <div className="flex justify-between items-center mb-4">
                {loading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 200 }}
                        />
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 300 }}
                        />
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-[500] text-gray-800 mb-1">
                            Recipes
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Search, check and create new recipes
                        </p>
                    </div>
                )}

                {loading ? (
                    <Skeleton.Button active size="large" shape="round" />
                ) : (
                    <button
                        className="flex items-center gap-2 text-gray-800 px-4 py-2 rounded hover:text-teal-600 transition cursor-pointer"
                        onClick={() => {
                            dispatch(resetCreateRecipe());
                            nvg('/add_recipe');
                        }}
                    >
                        <FaPlus size={24} />
                    </button>
                )}
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                {loading ? (
                    <>
                        <Skeleton.Input
                            active
                            size="large"
                            className="md:w-1/2 w-full"
                        />
                        <Skeleton.Input
                            active
                            size="large"
                            className="md:w-1/4 w-full"
                        />
                        <Skeleton.Input
                            active
                            size="large"
                            className="md:w-1/4 w-full"
                        />
                    </>
                ) : (
                    <div className="flex gap-4 items-center md:flex-row flex-col w-full">
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
                                        pre === 'decrease'
                                            ? 'increase'
                                            : 'decrease'
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
                                <option value="carbohydrate">
                                    Carbohydrates
                                </option>
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
                            options={categoryOptions}
                        />
                    </div>
                )}
            </div>

            {/* Favorite + My Recipes */}
            <div className="w-full my-4 flex justify-between">
                {loading ? (
                    <>
                        <Skeleton.Input
                            active
                            size="default"
                            style={{ width: 200 }}
                        />
                        <Skeleton.Input
                            active
                            size="default"
                            style={{ width: 150 }}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 p-2 rounded-md w-fit border-2 border-gray-300">
                            <FaHeart size={18} className="text-red-500" />
                            <span className="font-medium text-gray-800">
                                Favorites
                            </span>
                            <span className="ml-2 text-gray-600 px-2 py-0.5 rounded-md text-sm">
                                0
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-500 font-semibold text-lg cursor-pointer mr-2">
                            <FaCheckSquare size={20} />
                            <FaPen size={16} />
                            <span>My Recipes</span>
                        </div>
                    </>
                )}
            </div>

            {/* Recipes Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px,1fr))',
                    gap: '30px',
                    width: '100%',
                    boxSizing: 'border-box',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                              className="rounded-lg shadow-sm border border-gray-200 p-3 flex gap-4 items-start bg-white"
                              key={i}
                          >
                              {/* Ảnh */}
                              <Skeleton.Image
                                  active
                                  style={{
                                      width: 190,
                                      height: 180,
                                      borderRadius: 8,
                                  }}
                                  className="object-cover"
                              />

                              {/* Text phần phải */}
                              <div className="flex-1">
                                  <Skeleton
                                      active
                                      title={{ width: '80%' }}
                                      paragraph={{
                                          rows: 5,
                                          width: [
                                              '60%',
                                              '90%',
                                              '60%',
                                              '80%',
                                              '80%',
                                          ],
                                      }}
                                  />
                              </div>
                          </div>
                      ))
                    : dataRecipes.recipeFilter.map((recipe) => (
                          <CardRecipe
                              data={recipe}
                              key={recipe.id}
                              onClick={() => {
                                  nvg(`/detail_recipe/${recipe.id}`);
                              }}
                          />
                      ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center py-2">
                {loading ? (
                    <Skeleton.Input
                        active
                        size="large"
                        style={{ width: 200 }}
                    />
                ) : (
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={dataRecipes.totalItems}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger
                        pageSizeOptions={['6', '8', '10']}
                        onShowSizeChange={(_, size) => {
                            setItemsPerPage(Number(size));
                            setCurrentPage(1);
                        }}
                        showQuickJumper={false}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>
        </div>
    );
};
