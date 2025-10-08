import { useState, useEffect } from 'react';
import { Input, Select, Pagination, Skeleton } from 'antd';
import { FaCheckSquare, FaHeart, FaPen, FaPlus } from 'react-icons/fa';
import { CardRecipe } from '../components/CardRecipe';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../interfaces/recipe.interface';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { getRecipes } from '../apis/recipe.api';

const { Search } = Input;
const { Option } = Select;

export const MainRecipe = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const nvg = useNavigate();
    const recipes: Recipe[] = atminSelector((s) => s.recipe.recipes);
    const dispatch = atminDispatch();

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(getRecipes());
        }
    });

    useEffect(() => {
        // Giả lập loading khi fetch dữ liệu
        const timer = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

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
                        onClick={() => nvg('/add_recipe')}
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
                    <>
                        <Search
                            placeholder="Search food"
                            allowClear
                            enterButton
                            className="md:w-1/2"
                        />
                        <Select
                            defaultValue="nutrient"
                            className="md:w-1/4 w-full"
                        >
                            <Option value="nutrient">Sort by nutrient</Option>
                            <Option value="energy">Energy</Option>
                            <Option value="protein">Protein</Option>
                        </Select>
                        <Select defaultValue="all" className="md:w-1/4 w-full">
                            <Option value="all">Category</Option>
                            <Option value="vegetarian">Vegetarian</Option>
                            <Option value="desserts">Desserts</Option>
                        </Select>
                    </>
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
                    : recipes.map((recipe) => (
                          <CardRecipe
                              data={recipe}
                              key={recipe.id}
                              onClick={() => nvg('/detail_recipe')}
                          />
                      ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                {loading ? (
                    <Skeleton.Input
                        active
                        size="large"
                        style={{ width: 200 }}
                    />
                ) : (
                    <Pagination
                        current={currentPage}
                        total={40}
                        pageSize={4}
                        onChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
        </div>
    );
};
