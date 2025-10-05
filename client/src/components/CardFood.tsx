import React from 'react';
import type { Food } from '../interfaces/foods.interface';

interface CardFoodProps {
    data: Food;
    onClick?: () => void;
}

const CardFood: React.FC<CardFoodProps> = ({ data, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="w-full flex justify-between items-center cursor-pointer border border-gray-400 rounded-md px-3 py-2 hover:bg-gray-200 transition-colors"
        >
            {/* Left side */}
            <div className="flex flex-col">
                <div className="text-gray-700 font-semibold text-base">
                    {data.name}
                </div>
                <div className="text-gray-500 text-sm">{data.source}</div>
            </div>

            {/* Right side */}
            <div className="flex gap-4 text-center">
                <ul className="flex flex-col items-center">
                    <li className="text-gray-500 text-sm">Energy</li>
                    <li className="font-medium text-gray-800">{data.calories}</li>
                </ul>
                <ul className="flex flex-col items-center">
                    <li className="text-gray-500 text-sm">Fat</li>
                    <li className="font-medium text-gray-800">{data.fat}</li>
                </ul>
                <ul className="flex flex-col items-center">
                    <li className="text-gray-500 text-sm">Carbohydrate</li>
                    <li className="font-medium text-gray-800">
                        {data.carbohydrate}
                    </li>
                </ul>
                <ul className="flex flex-col items-center">
                    <li className="text-gray-500 text-sm">Protein</li>
                    <li className="font-medium text-gray-800">{data.protein}</li>
                </ul>
            </div>
        </div>
    );
};

export default CardFood;
