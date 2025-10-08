import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import ModalIngredient from './ModalIngredient';
import { SwapOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { atminDispatch } from '../../hooks/reduxHook';
import { addEquivalentIng } from '../../redux/reducers/createRecipe.reducer';
import type { FoodServing } from '../../interfaces/recipe.interface';

interface FoodServingDevelop {
    id: number;
    name?: string;
    serving: number;
    weight?: string;
}
interface PropsIngredientCard {
    main: FoodServingDevelop;
    equivalents: FoodServingDevelop[];
}

interface IngredientCardProps {
    ingredient: PropsIngredientCard;
    expanded: boolean;
    onToggle: (id: number) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
    ingredient,
    expanded,
    onToggle,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { main, equivalents } = ingredient;
    const dispatch = atminDispatch();
    return (
        <div className="bg-gray-50 rounded w-[812px]">
            <div className="flex items-center justify-between p-3 border border-gray-200 ">
                <div className="flex items-center gap-3 flex-1">
                    <button
                        onClick={() => {
                            onToggle(ingredient.main.id);
                            setIsModalOpen(false);
                        }}
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
                        {main.serving} serving of {main.name} ({main.weight} g)
                    </span>
                </div>
                <button className="text-gray-400 hover:text-gray-800">
                    <FaTrash className="w-4 h-4 hover:text-red-500 cursor-pointer" />
                </button>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div>
                            {equivalents.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center pl-6 gap-2 text-gray-500 p-3 bg-white w-[812px] border-b border-x border-gray-200"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <SwapOutlined className="text-emerald-500 text-lg" />
                                        <span className="text-sm font-medium">
                                            {item.serving} serving of {item.name} ({item.weight} g)
                                        </span>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <FaTrash className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
                                    </button>
                                </div>
                            ))}

                            <div className="pl-6 pr-3 py-3 border-b border-x border-gray-200">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(!isModalOpen);
                                    }}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-500 cursor-pointer"
                                >
                                    <Plus className="w-5 h-5 cursor-pointer" />
                                    <span>Add new food equivalent</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                            // onClose={() => setIsModalOpen(false)}
                            onAddEquivalentIng={(
                                id: number,
                                equivalent: FoodServing
                            ) =>
                                dispatch(
                                    addEquivalentIng({ mainId: id, equivalent })
                                )
                            }
                            currentMainId={main.id}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IngredientCard;
