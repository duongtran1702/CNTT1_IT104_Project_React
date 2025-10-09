import React, { useEffect, useState, type ChangeEvent } from 'react';
import { Modal, Button, message } from 'antd';
import { categories, initialFoodValues, nutrients } from '../data/helpData';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import type { Food } from '../interfaces/foods.interface';
import { createFood, updateFood } from '../apis/food.api';
import { toast } from 'react-toastify';
import { resetDetailFood } from '../redux/reducers/food.reducer';

interface AddFoodModalProps {
    open: boolean;
    onClose: () => void;
}

export const ModalAddFood: React.FC<AddFoodModalProps> = ({
    open,
    onClose,
}) => {
    const dispatch = atminDispatch();
    const foodDetail: Food | null = atminSelector((s) => s.food.foodDetail);
    const [formFood, setFormFood] =
        useState<Omit<Food, 'id'>>(initialFoodValues);
    const [initialForm, setInitialForm] =
        useState<Omit<Food, 'id'>>(initialFoodValues);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (foodDetail) {
            setFormFood(foodDetail);
            setInitialForm(foodDetail); // 🟢 lưu snapshot ban đầu
        } else {
            setFormFood(initialFoodValues);
            setInitialForm(initialFoodValues);
        }
    }, [foodDetail]);

    const dataLocal = localStorage.getItem('currentUser');
    const userLocal = dataLocal ? JSON.parse(dataLocal) : null;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormFood((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        // 🕒 debounce 300ms để tránh check liên tục
        const timer = setTimeout(() => {
            const hasChanged =
                JSON.stringify(formFood) !== JSON.stringify(initialForm);
            setIsChanged(hasChanged);
        }, 300);

        return () => clearTimeout(timer);
    }, [formFood, initialForm]);

    const handleSubmit = async () => {
        // Kiểm tra empty
        const allFields = Object.keys(formFood) as (keyof typeof formFood)[];
        const emptyFields = allFields.filter(
            (key) =>
                formFood[key] === null ||
                formFood[key] === undefined ||
                formFood[key].toString().trim() === ''
        );
        if (emptyFields.length > 0) {
            message.error('Please fill in all fields!');
            return;
        }

        // Tạo bản copy
        const newFormFood = { ...formFood };

        // Loại bỏ số 0 đứng đầu cho tất cả các trường số
        const allNumberFields: (keyof typeof formFood)[] = [
            'quantity',
            'calories',
            'fat',
            'carbohydrate',
            'protein',
            ...nutrients.map((n) => n.key as keyof typeof formFood),
        ];

        allNumberFields.forEach((key) => {
            if (newFormFood[key] && Number(newFormFood[key]) >= 1) {
                const value = newFormFood[key].toString();
                newFormFood[key] = value.replace(/^0+/, '') || '0';
            }
        });

        // Kiểm tra 4 trường > 0
        const positiveFields: (keyof typeof formFood)[] = [
            'calories',
            'fat',
            'carbohydrate',
            'protein',
        ];

        const invalidPositiveFields = positiveFields.filter((key) => {
            const value = Number(newFormFood[key]);
            return isNaN(value) || value <= 0;
        });

        if (invalidPositiveFields.length > 0) {
            message.error(
                'Please enter valid numbers greater than 0 for calories, fat, carbohydrate, and protein!'
            );
            return;
        }

        // Tạo object final
        let newFood: Food = {
            id: Math.floor(Math.random() * 1000),
            ...newFormFood,
            source: userLocal.username,
        };

        try {
            if (foodDetail) {
                newFood = { ...newFood, id: foodDetail.id };
                await dispatch(updateFood(newFood)).unwrap();
                toast.success('Update food successful!');
                dispatch(resetDetailFood());
            } else {
                await dispatch(createFood(newFood)).unwrap();
                toast.success('Create food successful!');
            }
            onClose();
            setFormFood(initialFoodValues);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title={null}
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={900}
        >
            <div className="relative bg-white max-h-[85vh] flex flex-col">
                {/* Title */}
                <div className="text-center text-2xl font-semibold text-gray-700">
                    {foodDetail === null ? 'Add new Food' : 'Food information'}
                </div>
                <div className="text-center text-gray-600 mb-6">
                    {foodDetail === null
                        ? ' Fill in the fields below with the food information'
                        : 'Check and update the+ information about the food'}
                </div>
                <form className=" overflow-y-auto custom-scroll">
                    {/* Box 1 */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between w-[820px]">
                            <div className="flex border border-gray-300 rounded-[5px] w-fit overflow-hidden">
                                <div className="w-[120px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300">
                                    Name
                                </div>
                                <input
                                    type="text"
                                    className="w-[330px] outline-none px-2"
                                    placeholder="Tên món ăn"
                                    name="name"
                                    value={formFood.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex border border-gray-300 rounded-[5px] w-fit overflow-hidden">
                                <div className="w-[120px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300">
                                    Source
                                </div>
                                <input
                                    type="text"
                                    className="w-[198px] outline-none px-2 bg-gray-100"
                                    placeholder="Nguồn"
                                    value={formFood.source}
                                    readOnly
                                    name="source"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-[820px]">
                            <div className="flex border border-gray-300 rounded-[5px] w-fit overflow-hidden">
                                <div className="w-[120px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300 ">
                                    Category
                                </div>
                                <select
                                    className="w-[330px] outline-none px-2"
                                    value={formFood.category}
                                    name="category"
                                    onChange={handleChange}
                                >
                                    <option
                                        key={'Chọn danh mục của nguyên liệu'}
                                        value=""
                                    >
                                        Chọn danh mục của nguyên liệu
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex border border-gray-300 rounded-[5px] overflow-hidden w-fit">
                                <div className="w-[120px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300">
                                    Quantity
                                </div>
                                <input
                                    type="text"
                                    className="w-[118px] outline-none px-2"
                                    placeholder="100"
                                    value={formFood.quantity}
                                    name="quantity"
                                    onChange={handleChange}
                                />
                                <div className="w-[80px] h-10 bg-gray-100 flex items-center justify-center border-l border-gray-300">
                                    grams
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="mt-6 border p-4 border-gray-400 rounded-[5px] w-[820px] h-6 flex items-center justify-center text-[15px] text-emerald-600 font-medium">
                        Nutritional value per 100 g
                    </div>

                    <div className="mt-6 text-center text-xl font-semibold text-gray-700">
                        Macronutrients
                    </div>
                    <div className="flex flex-col gap-3 mt-2 ">
                        <div className="flex justify-between w-[820px] ">
                            {[
                                ['Energy', 'kcal', 'calories'],
                                ['Fat', 'g', 'fat'],
                            ].map(([label, unit, key]) => (
                                <div
                                    key={label}
                                    className="flex border border-gray-300 rounded-[5px] w-fit overflow-hidden"
                                >
                                    <div className="w-[120px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300">
                                        {label}
                                    </div>
                                    <input
                                        type="text"
                                        className="w-[230px] outline-none px-2"
                                        onChange={handleChange}
                                        name={key}
                                        value={
                                            formFood[
                                                key as keyof typeof formFood
                                            ] || ''
                                        }
                                    />
                                    <div className="w-[34px] h-10 bg-gray-100 flex items-center justify-center border-l border-gray-300">
                                        {unit}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between w-[820px]">
                            {[
                                ['Carbohydrate', 'g', 'carbohydrate'],
                                ['Protein', 'g', 'protein'],
                            ].map(([label, unit, key]) => (
                                <div
                                    key={label}
                                    className="flex border border-gray-300 rounded-[5px] w-fit overflow-hidden"
                                >
                                    <div className="w-[120px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300">
                                        {label}
                                    </div>
                                    <input
                                        type="text"
                                        className="w-[230px] outline-none px-2"
                                        value={
                                            formFood[
                                                key as keyof typeof formFood
                                            ] || ''
                                        }
                                        onChange={handleChange}
                                        name={key}
                                    />
                                    <div className="w-[34px] h-10 bg-gray-100 flex items-center justify-center border-l border-gray-300">
                                        {unit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className="mt-8 text-center text-xl font-semibold text-gray-700">
                        Micronutrients (Vitamins & Minerals)
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        {Array.from(
                            { length: Math.ceil(nutrients.length / 3) },
                            (_, i) => nutrients.slice(i * 3, i * 3 + 3)
                        ).map((group, i) => (
                            <div
                                key={i}
                                className="flex justify-between w-[820px]  gap-[15px]"
                            >
                                {group.map((row) => (
                                    <div
                                        key={row.name}
                                        className="flex border border-gray-300 rounded-[5px] w-fit overflow-hidden"
                                    >
                                        <div className="w-[107.5px] h-10 bg-gray-100 flex items-center pl-3 border-r border-gray-300">
                                            {row.name}
                                        </div>
                                        <input
                                            type="text"
                                            className="w-[120px] outline-none px-2"
                                            value={
                                                formFood[
                                                    row.key as keyof typeof formFood
                                                ] || ''
                                            }
                                            onChange={handleChange}
                                            name={row.key}
                                        />
                                        <div className="w-[34px] h-10 bg-gray-100 flex items-center justify-center border-l border-gray-300">
                                            {row.unit}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </form>
                <div className="flex justify-end mt-6 gap-3 mr-5">
                    <Button onClick={onClose} className="border-gray-400">
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={foodDetail !== null && !isChanged}
                        className={`transition-all duration-300 ${
                            foodDetail === null
                                ? ''
                                : isChanged
                                ? '!bg-emerald-500 !hover:bg-emerald-600 !text-white'
                                : '!bg-gray-300 !text-gray-600 !cursor-not-allowed'
                        }`}
                        onClick={handleSubmit}
                    >
                        {foodDetail === null
                            ? 'Save and close'
                            : 'Update and close'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
