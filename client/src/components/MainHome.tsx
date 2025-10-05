import { useState } from 'react';
import { Input, Select, Pagination } from 'antd';
import { CardRecipe } from './CardRecipe';
import type { Recipe } from '../interfaces/recipe';

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

export const MainHome = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            {/* Title */}
            <h3 className="text-xl font-[500] text-gray-800 mb-1">Home</h3>
            <p className="text-gray-500 mb-4">
                Explore, browse, and manage your dashboard
            </p>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                    <CardRecipe data={recipe} key={recipe.id} />
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
