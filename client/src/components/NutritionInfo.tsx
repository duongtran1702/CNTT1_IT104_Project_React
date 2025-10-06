import React from 'react';

interface NutritionInfoProps {
    energy: number;
    fat: number;
    carbohydrate: number;
    protein: number;
    fiber: number;
}

export const NutritionInfo: React.FC<NutritionInfoProps> = ({
    energy,
    fat,
    carbohydrate,
    protein,
    fiber,
}) => {
    const nutrients = [
        { label: 'Fat', value: fat, color: 'bg-[#f22d26]' },
        {
            label: 'Carbohydrate',
            value: carbohydrate,
            color: 'bg-[rgba(234,159,119,1)]',
        },
        { label: 'Protein', value: protein, color: 'bg-[rgb(13,161,131)]' },
        { label: 'Fiber', value: fiber, color: 'bg-[rgb(97,118,143)]' },
    ];

    const getCircleColor = (value: number, color: string) =>
        value > 0 ? color : 'bg-gray-200';

    return (
        <div className="w-[402px] bg-white p-5 pb-3 rounded-md shadow-sm h-fit">
            {/* Phần giới thiệu */}
            <div className="text-left">
                <div className="font-semibold text-gray-800 text-lg">
                    Global analysis
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    Energy, macronutrients and fiber distribution
                </div>
            </div>

            {/* Phần năng lượng */}
            <div className="flex justify-between border-b border-gray-400 mt-3 pb-2 text-gray-600">
                <div>Energy</div>
                <div>{energy} kcal</div>
            </div>

            {/* Phần các thành phần dinh dưỡng */}
            <div className="flex gap-6 p-2 justify-center mt-2">
                {nutrients.map(({ label, value, color }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-2 text-gray-700"
                    >
                        <div
                            className={`w-[68px] h-[68px] rounded-full flex justify-center items-center ${getCircleColor(
                                value,
                                color
                            )}`}
                        >
                            <div className="w-[53px] h-[53px] bg-white rounded-full flex justify-center items-center text-sm font-medium text-gray-700 border border-gray-200">
                                {value}g
                            </div>
                        </div>
                        <div className="text-sm">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
