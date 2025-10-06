import { use } from 'react';
import { AddImageRecipe } from '../components/AddImageRecipe';
import { BasicInfo } from '../components/BasicInfo';
import { CookingMethod } from '../components/CookingMethod';
import IngredientManager from '../components/IngredientManager';
import Introduction from '../components/Introduction';
import MacronutrientChart from '../components/MacronutrientChart';
import MicronutrientCard, {
    type Micronutrient,
} from '../components/MicronutrientCard';
import { NutritionInfo } from '../components/NutritionInfo';
import { PublishBox } from '../components/PublishBox';
import { useLocation } from 'react-router-dom';

const micronutrientData: Micronutrient[] = [
    { name: 'Sodium', value: 0, unit: 'mg' },
    { name: 'Vitamin A', value: 4, unit: 'µg' },
    { name: 'Vitamin B-6', value: 0, unit: 'mg' },
    { name: 'Vitamin B-12', value: 0, unit: 'µg' },
    { name: 'Vitamin C', value: 14, unit: 'mg' },
    { name: 'Vitamin D (D2 + D3)', value: 0, unit: 'µg' },
    { name: 'Vitamin E', value: 0, unit: 'mg' },
    { name: 'Vitamin K', value: 1, unit: 'µg' },
    { name: 'Sugars', value: 9, unit: 'g' },
    { name: 'Calcium', value: 0, unit: 'mg' },
    { name: 'Iron', value: 0, unit: 'mg' },
    { name: 'Magnesium', value: 4, unit: 'mg' },
    { name: 'Phosphorus', value: 10, unit: 'mg' },
    { name: 'Potassium', value: 124, unit: 'mg' },
    { name: 'Zinc', value: 0, unit: 'mg' },
    { name: 'Copper', value: 0, unit: 'mg' },
    { name: 'Fluoride', value: 49, unit: 'µg' },
    { name: 'Manganese', value: 0, unit: 'mg' },
    { name: 'Selenium', value: 0, unit: 'µg' },
    { name: 'Thiamin', value: 0, unit: 'mg' },
    { name: 'Riboflavin', value: 0, unit: 'mg' },
    { name: 'Niacin', value: 0, unit: 'mg' },
    { name: 'Pantothenic acid', value: 0, unit: 'mg' },
    { name: 'Folate, total', value: 2, unit: 'µg' },
];

export const MainAddRecipe = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/'); // ["", "home"]
    const firstSegment = pathSegments[1]; // "home"

    return (
        <div className="flex items-start flex-col w-[98%] my-[1%] mx-[1%]">
            <div className="flex gap-4">
                <AddImageRecipe />
                <div className="flex flex-col gap-4">
                    {firstSegment !== 'detail_recipe' && <PublishBox />}
                    <BasicInfo />
                </div>
            </div>
            <Introduction />
            <div className="flex gap-4 mt-4.5">
                <div className="flex flex-col ">
                    <IngredientManager />
                    <CookingMethod />
                </div>
                <div className="flex flex-col gap-4">
                    <NutritionInfo
                        energy={0}
                        fat={1}
                        carbohydrate={2}
                        protein={3}
                        fiber={4}
                    />
                    <MacronutrientChart
                        fat={10}
                        carbohydrate={10}
                        protein={10}
                    />
                    <MicronutrientCard data={micronutrientData} />
                </div>
            </div>
        </div>
    );
};
