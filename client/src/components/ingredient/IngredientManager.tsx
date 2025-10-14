import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import IngredientCard from './IngredientCard';
import { createSelector } from '@reduxjs/toolkit';
import { motion, AnimatePresence } from 'framer-motion';
import ModalIngredient from './ModalIngredient';
import { atminDispatch, atminSelector } from '../../hooks/reduxHook';
import { getFoods } from '../../apis/food.api';
import { addMainIng } from '../../redux/reducers/createRecipe.reducer';
import type { RootState } from '../../redux/store/store';
import type { Ingredient } from '../../interfaces/recipe.interface';

const selectIngredients = createSelector(
    (state: RootState) => state.createRecipe.ingredients,
    (state: RootState) => state.food.foods,
    (ingredients, foods) =>
        ingredients.map((ing) => {
            const mainFood = foods.find((f) => f.id === ing.main.id);

            const equivalents = ing.equivalents.map((eq) => {
                const eqFood = foods.find((f) => f.id === eq.id);
                return {
                    ...eq,
                    name: eqFood?.name,
                    weight: eqFood?.quantity,
                };
            });

            return {
                main: {
                    ...ing.main,
                    name: mainFood?.name,
                    weight: mainFood?.quantity,
                    category: mainFood?.category,
                },
                equivalents,
            };
        })
);

const IngredientManager: React.FC = () => {
    const [expandedIngredients, setExpandedIngredients] = useState<number[]>(
        []
    );
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = atminDispatch();
    const foods = atminSelector((s: RootState) => s.food.foods || []);

    const ingredients = atminSelector(selectIngredients);

    useEffect(() => {
        if (foods.length === 0) dispatch(getFoods());
    }, [dispatch, foods.length]);

    const toggleIngredientExpansion = (id: number) => {
        setExpandedIngredients((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm max-w-4xl mx-auto w-[860px]">
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-normal text-gray-700 mb-1">
                        Ingredients
                    </h2>
                    <p className="text-sm text-gray-400">
                        Search and add ingredients to the recipe
                    </p>
                </div>

                {/* Ingredients List */}
                <div className="space-y-2 mb-2">
                    {ingredients.map((ingredient) => (
                        <IngredientCard
                            key={ingredient.main.id}
                            ingredient={ingredient}
                            expanded={expandedIngredients.includes(
                                ingredient.main.id
                            )}
                            onToggle={toggleIngredientExpansion}
                        />
                    ))}
                </div>

                {/* Add New Ingredient Button */}
                <div className="mb-2">
                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="flex items-center gap-3 w-full p-3 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        {isModalOpen ? (
                            <ChevronUp className="w-4 h-4 text-teal-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-teal-500" />
                        )}
                        <span className="text-sm text-gray-400">
                            Add new ingredient
                        </span>
                    </button>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-gray-50 border border-gray-200 rounded p-4 space-y-4 shadow-lg"
                        >
                            <ModalIngredient
                                // onClose={() => setIsModalOpen(false)}
                                key="manage-ingredient"
                                onAddMainIng={(ing: Ingredient) =>
                                    dispatch(addMainIng(ing))
                                }
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IngredientManager;
