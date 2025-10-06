import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Ingredient } from '../data/temporary';
import ModalIngredient from './ModalIngredient';
import IngredientCard from './IngredientCard';
import { motion, AnimatePresence } from 'framer-motion';

const IngredientManager: React.FC = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {
            id: 1,
            name: 'babyfood, water, bottled, GERBER, without added Fluoride',
            grams: 113,
            equivalents: [],
        },
    ]);
    const [expandedIngredients, setExpandedIngredients] = useState<number[]>(
        []
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleIngredientExpansion = (id: number) => {
        setExpandedIngredients((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // const addIngredient = (
    //     foodItem: FoodItem | { id: number; name: string; grams: number }
    // ) => {
    //     const newIngredient: Ingredient = {
    //         id: Date.now(),
    //         name: foodItem.name,
    //         grams: foodItem.grams,
    //         equivalents: [],
    //     };
    //     setIngredients((prev) => [...prev, newIngredient]);
    //     setIsModalOpen(false);
    // };

    const deleteIngredient = (id: number) => {
        setIngredients(ingredients.filter((ing) => ing.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
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
                            key={ingredient.id}
                            ingredient={ingredient}
                            expanded={expandedIngredients.includes(
                                ingredient.id
                            )}
                            onToggle={toggleIngredientExpansion}
                            onDelete={deleteIngredient}
                            onAddEquivalent={(id) =>
                                console.log('add equiv', id)
                            }
                        />
                    ))}
                </div>

                {/* Add New Ingredient Button */}
                <div className="mb-2">
                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="flex items-center gap-3 w-full p-3 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
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
                            initial={{ opacity: 0, y: -40 }} // trượt từ trên xuống khi mở
                            animate={{ opacity: 1, y: 0 }} // hiện ra đầy đủ
                            exit={{ opacity: 0, y: -8 }} // trượt xuống khi tắt
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-gray-50 border border-gray-200 rounded p-4 space-y-4 shadow-lg"
                        >
                            <ModalIngredient
                                onClose={() => setIsModalOpen(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IngredientManager;
