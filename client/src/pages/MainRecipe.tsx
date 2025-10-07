import { useState } from 'react';
import { Input, Select, Pagination } from 'antd';
import type { Recipe } from '../interfaces/recipe.interface';
import { FaCheckSquare, FaHeart, FaPen, FaPlus } from 'react-icons/fa';
import { CardRecipe } from '../components/CardRecipe';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const mockRecipes: Recipe[] = [
    {
        id: 1,
        title: 'Turmeric Roasted Cauliflower Salad (lowfodmap)',
        author: 'Joana Jardim',
        category: 'Vegetarian dishes',
        image: 'https://picsum.photos/600/400?random=1',
        likes: 37,
        energy: 143,
        fat: 6,
        carbs: 18,
        protein: 5,
    },
    {
        id: 2,
        title: 'Vegetable & Egg Scramble (lowfodmap)',
        author: 'Joana Jardim',
        category: 'Diabetic Friendly',
        image: 'https://picsum.photos/600/400?random=2',
        likes: 33,
        energy: 87,
        fat: 4,
        carbs: 8,
        protein: 6,
    },
    {
        id: 3,
        title: 'Green Beans With Tofu and Roasted Peanuts (lowfodmap)',
        author: 'Joana Jardim',
        category: 'Vegetarian dishes',
        image: 'https://picsum.photos/600/400?random=3',
        likes: 22,
        energy: 99,
        fat: 6,
        carbs: 5,
        protein: 6,
    },
    {
        id: 4,
        title: 'Berry Almond Smoothie (full fat milk)',
        author: 'Joana Jardim',
        category: 'Desserts',
        image: 'https://picsum.photos/600/400?random=4',
        likes: 13,
        energy: 106,
        fat: 6,
        carbs: 5,
        protein: 9,
    },
];

export const MainRecipe = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const nvg = useNavigate();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            {/* Title */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-[500] text-gray-800 mb-1">
                        Recipes
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Search, check and create new recipes
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 text-gray-800  px-4 py-2 rounded hover:text-teal-600 transition cursor-pointer"
                    onClick={() => nvg('/add_recipe')}
                >
                    <FaPlus size={24} />
                </button>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <Search
                    placeholder="Search food"
                    allowClear
                    enterButton
                    className="md:w-1/2"
                />
                <Select defaultValue="nutrient" className="md:w-1/4 w-full">
                    <Option value="nutrient">Sort by nutrient</Option>
                    <Option value="energy">Energy</Option>
                    <Option value="protein">Protein</Option>
                </Select>
                <Select defaultValue="all" className="md:w-1/4 w-full">
                    <Option value="all">Category</Option>
                    <Option value="vegetarian">Vegetarian</Option>
                    <Option value="desserts">Desserts</Option>
                </Select>
            </div>

            <div className="w-full my-4 flex justify-between">
                <div className="flex items-center gap-2 p-2 rounded-md w-fit border-2 border-gray-300">
                    <FaHeart size={18} className="text-red-500" />
                    <span className="font-medium text-gray-800">Favorites</span>
                    <span className="ml-2 text-gray-600 px-2 py-0.5 rounded-md text-sm">
                        0
                    </span>
                </div>

                <div className="flex items-center gap-2 text-blue-500 font-semibold text-lg cursor-pointer mr-2">
                    <FaCheckSquare size={20} />
                    <FaPen size={16} />
                    <span>My Recipes</span>
                </div>
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
                {mockRecipes.map((recipe) => (
                    <CardRecipe
                        data={recipe}
                        key={recipe.id}
                        onClick={() => nvg('/detail_recipe')}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    total={40}
                    pageSize={4}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};
