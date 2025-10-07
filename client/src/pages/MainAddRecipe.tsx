import { Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import Introduction from '../components/Introduction';
import { BasicInfo } from '../components/BasicInfo';
import { PublishBox } from '../components/PublishBox';
import { AddImageRecipe } from '../components/AddImageRecipe';
import { useLocation } from 'react-router-dom';
import IngredientManager from '../components/IngredientManager';
import { CookingMethod } from '../components/CookingMethod';
import { NutritionInfo } from '../components/NutritionInfo';
import MacronutrientChart from '../components/MacronutrientChart';
import MicronutrientCard from '../components/MicronutrientCard';
import { micronutrientData } from '../data/temporary';


export const MainAddRecipe = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const firstSegment = pathSegments[1];

    return (
        <div className="flex flex-col w-[98%] my-[1%] mx-[1%]">
            {/* Top section: image + basic info */}
            <div className="flex gap-4">
                {loading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton.Image style={{ width: 300, height: 200 }} />
                    </div>
                ) : (
                    <AddImageRecipe />
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
                            {firstSegment !== 'detail_recipe' && <PublishBox />}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
