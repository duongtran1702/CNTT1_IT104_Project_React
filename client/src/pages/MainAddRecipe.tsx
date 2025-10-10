import { Skeleton } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import Introduction from '../components/Introduction';
import { BasicInfo } from '../components/BasicInfo';
import { PublishBox } from '../components/PublishBox';
import { AddImageRecipe } from '../components/AddImageRecipe';
import { useLocation, useParams } from 'react-router-dom';
import IngredientManager from '../components/ingredient/IngredientManager';
import { CookingMethod } from '../components/CookingMethod';
import { NutritionInfo } from '../components/NutritionInfo';
import MacronutrientChart from '../components/MacronutrientChart';
import MicronutrientCard from '../components/MicronutrientCard';
// import { micronutrientData } from '../data/temporary';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { getRecipes } from '../apis/recipe.api';
import { setDetailRecipe } from '../redux/reducers/createRecipe.reducer';

export const MainAddRecipe = () => {
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const firstSegment = pathSegments[1];
    const { id } = useParams();

    const recipes = atminSelector((s) => s.recipe.recipes);
    const dispatch = atminDispatch();
    useEffect(() => {
        if (recipes.length === 0) dispatch(getRecipes());
    }, [dispatch, recipes.length]);

    const data = atminSelector((s) => s.createRecipe);
    const micro = atminSelector((s) => s.createRecipe.micro);
    const total = data.protein + data.carb + data.fat;

    const micronutrientData = useMemo(
        () => [
            { name: 'Sodium', value: micro.sodium, unit: 'mg' },
            { name: 'Vitamin A', value: micro.vitaminA, unit: 'µg' },
            { name: 'Vitamin B-6', value: micro.vitaminB6, unit: 'mg' },
            { name: 'Vitamin B-12', value: micro.vitaminB12, unit: 'µg' },
            { name: 'Vitamin C', value: micro.vitaminC, unit: 'mg' },
            { name: 'Vitamin D (D2 + D3)', value: micro.vitaminD, unit: 'µg' },
            { name: 'Vitamin E', value: micro.vitaminE, unit: 'mg' },
            { name: 'Vitamin K', value: micro.vitaminK, unit: 'µg' },
            { name: 'Sugars', value: micro.sugars, unit: 'g' },
            { name: 'Calcium', value: micro.calcium, unit: 'mg' },
            { name: 'Iron', value: micro.iron, unit: 'mg' },
            { name: 'Magnesium', value: micro.magnesium, unit: 'mg' },
            { name: 'Phosphorus', value: micro.phosphorus, unit: 'mg' },
            { name: 'Potassium', value: micro.potassium, unit: 'mg' },
            { name: 'Zinc', value: micro.zinc, unit: 'mg' },
            { name: 'Copper', value: micro.copper, unit: 'mg' },
            { name: 'Fluoride', value: micro.fluoride, unit: 'µg' },
            { name: 'Manganese', value: micro.manganese, unit: 'mg' },
            { name: 'Selenium', value: micro.selenium, unit: 'µg' },
            { name: 'Thiamin', value: micro.thiamin, unit: 'mg' },
            { name: 'Riboflavin', value: micro.riboflavin, unit: 'mg' },
            { name: 'Niacin', value: micro.niacin, unit: 'mg' },
            {
                name: 'Pantothenic acid',
                value: micro.pantothenicAcid,
                unit: 'mg',
            },
            { name: 'Folate, total', value: micro.folateTotal, unit: 'µg' },
        ],
        [micro]
    );
    if (id !== undefined && firstSegment === 'detail_recipe') {
        const recipeDetail = recipes.find((i) => i.id === id);
        console.log(id);
        console.log(recipeDetail);
        if (!recipeDetail) return;
        console.log(recipeDetail);
        dispatch(setDetailRecipe(recipeDetail));
    }

    return (
        <div className="flex flex-col w-[98%] my-[1%] mx-[1%]">
            {/* Top section: image + basic info */}
            <div className="flex gap-4">
                {loading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton.Image style={{ width: 300, height: 200 }} />
                    </div>
                ) : (
                    <AddImageRecipe onFileSelect={setImageFile} />
                )}
                <div className="flex flex-col gap-4">
                    {loading ? (
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton.Input
                                active
                                size="large"
                                style={{ width: 600 }}
                            />
                            <Skeleton
                                active
                                paragraph={{ rows: 6 }}
                                style={{ width: 800 }}
                            />
                        </div>
                    ) : (
                        <>
                            {firstSegment !== 'detail_recipe' && (
                                <PublishBox
                                    imageFile={imageFile}
                                    onLoading={setLoading}
                                />
                            )}
                            <BasicInfo />
                        </>
                    )}
                </div>
            </div>

            {/* Introduction */}
            {loading ? (
                <div className=" flex flex-col gap-2 mt-4">
                    <Skeleton.Input active block size="large" />
                    <Skeleton active paragraph={{ rows: 4 }} />
                </div>
            ) : (
                <Introduction />
            )}

            {/* Main content: Ingredients + CookingMethod + Nutrition */}
            <div className="flex gap-4 mt-4.5">
                <div className="flex flex-col gap-2">
                    {loading ? (
                        <>
                            {/* Ingredients skeleton */}
                            <Skeleton active paragraph={{ rows: 4 }} />
                            <Skeleton.Input active size="small" />
                            <Skeleton.Input active size="small" />

                            {/* Cooking steps skeleton */}
                            <Skeleton active paragraph={{ rows: 5 }} />
                            <Skeleton.Input active size="small" />
                            <Skeleton.Input active size="small" />
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ width: 900 }}
                            />
                        </>
                    ) : (
                        <>
                            <IngredientManager />
                            <CookingMethod />
                        </>
                    )}
                </div>

                <div className="flex flex-col gap-4 w-[300px]">
                    {loading ? (
                        <>
                            <Skeleton.Input active block size="small" />
                            <Skeleton active paragraph={{ rows: 3 }} />

                            <Skeleton.Image
                                style={{ width: 300, height: 150 }}
                            />

                            <Skeleton active paragraph={{ rows: 5 }} />
                        </>
                    ) : (
                        <>
                            <NutritionInfo
                                energy={data.calories}
                                fat={data.fat}
                                carbohydrate={data.carb}
                                protein={data.protein}
                                fiber={data.fiber}
                            />
                            <MacronutrientChart
                                fat={(data.fat / total) * 100}
                                carbohydrate={(data.carb / total) * 100}
                                protein={(data.protein / total) * 100}
                            />
                            <MicronutrientCard data={micronutrientData} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
