import React from "react";

export interface Micronutrient {
    name: string;
    value: number;
    unit: string;
}

interface MicronutrientCardProps {
    data: Micronutrient[];
}

export const MicronutrientCard: React.FC<MicronutrientCardProps> = ({ data }) => {
    return (
        <div className="w-[402px] bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Micronutrients
                </h2>
                <p className="text-sm text-gray-400">
                    Micronutrients distribution of the recipe
                </p>
            </div>

            {/* Danh sách vi chất */}
            <div className="grid grid-cols-2 gap-y-1 text-sm">
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="text-gray-600">{item.name}</div>
                        <div className="text-right font-medium text-gray-800">
                            {item.value}
                            <span className="text-gray-400 font-normal ml-1">
                                {item.unit}
                            </span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MicronutrientCard;
