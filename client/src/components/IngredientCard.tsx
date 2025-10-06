import React, { useState } from 'react';
import { Trash2, ChevronUp, ChevronDown, Plus } from 'lucide-react';
import type { Ingredient } from '../data/temporary';
import ModalIngredient from './ModalIngredient';
import { SwapOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

interface IngredientCardProps {
    ingredient: Ingredient;
    expanded: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onAddEquivalent?: (id: number) => void;
}

const tmp = [
    '1 serving of babyfood, water, bottled, GERBER, without added Fluoride (113 g)',
    '1 serving of babyfood, water, bottled, GERBER, without added Fluoride (113 g)',
];

const IngredientCard: React.FC<IngredientCardProps> = ({
    ingredient,
    expanded,
    onToggle,
    onDelete,
    onAddEquivalent,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="bg-gray-50 rounded w-[812px]">
            <div className="flex items-center justify-between p-3 border border-gray-200 ">
                <div className="flex items-center gap-3 flex-1">
                    <button
                        onClick={() => onToggle(ingredient.id)}
                        className="text-teal-500 hover:text-teal-600"
                        aria-label={expanded ? 'Collapse' : 'Expand'}
                    >
                        {expanded ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                    <span className="text-sm text-gray-700">
                        1 serving of {ingredient.name} ({ingredient.grams} g)
                    </span>
                </div>
                <button
                    onClick={() => onDelete(ingredient.id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Delete ingredient"
                >
                    <Trash2 className="w-4 h-4 hover:text-teal-500 cursor-pointer" />
                </button>
            </div>

            {expanded && (
                <div>
                    {tmp.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center pl-6 gap-2 text-gray-500 p-3 bg-white w-[812px] border-b border-x border-gray-200"
                        >
                            <div className='flex items-center gap-3 flex-1'>
                                <SwapOutlined className="text-emerald-500 text-lg" />
                                <span className="text-sm font-medium">
                                    {item}
                                </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Trash2 className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
                            </button>
                        </div>
                    ))}

                    <div className="pl-6 pr-3 py-3 border-b border-x border-gray-200">
                        <button
                            onClick={() => {
                                onAddEquivalent?.(ingredient.id);
                                setIsModalOpen(!isModalOpen);
                            }}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-500"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add new food equivalent</span>
                        </button>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }} // trượt từ trên xuống khi mở
                        animate={{ opacity: 1, y: 0 }} // hiện ra đầy đủ
                        exit={{ opacity: 0, y: -8 }} // trượt xuống khi tắt
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="bg-gray-50 border border-gray-200 rounded p-4 space-y-4 shadow-lg mt-2"
                    >
                        <ModalIngredient
                            onClose={() => setIsModalOpen(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IngredientCard;
