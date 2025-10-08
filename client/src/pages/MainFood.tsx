import { Button, Input, Pagination, Select } from 'antd';
import { useEffect, useState } from 'react';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { getFoods } from '../apis/food.api';
import type { Food } from '../interfaces/foods.interface';
import { getDetaiFood, resetDetailFood } from '../redux/reducers/food.reducer';
import CardFood from '../components/CardFood';
import { ModalAddFood } from '../components/ModalAddFood';

const { Search } = Input;
const { Option } = Select;

export const FoodMain = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = atminDispatch();
    const foods: Food[] = atminSelector((s) => s.food.foods);
    useEffect(() => {
        if (foods.length === 0) dispatch(getFoods());
    }, [dispatch,foods]);
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            {/* Title */}
            <h3 className="text-xl font-[500] text-gray-800 mb-1">Recipes</h3>
            <p className="text-gray-500 mb-4">
                Search, check and create new recipes
            </p>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Search
                    placeholder="Search food"
                    allowClear
                    enterButton
                    className="md:w-1/2"
                />
                <Select defaultValue="nutrient" className="md:w-1/4 w-full">
                    <Option value="nutrient">Sort by nutrient</Option>
                    <Option value="energy">Energy</Option>
                    <Option value="protein">Protein</Option>
                </Select>
                <Select defaultValue="all" className="md:w-1/4 w-full">
                    <Option value="all">Category</Option>
                    <Option value="vegetarian">Vegetarian</Option>
                    <Option value="desserts">Desserts</Option>
                </Select>
            </div>

            {/* Recipes Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '30px',
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                }}
            >
                <div className="flex flex-col gap-3 w-full">
                    {foods.map((food) => (
                        <CardFood
                            key={food.id}
                            data={food}
                            onClick={() => {
                                dispatch(getDetaiFood(food));
                                setOpen(true);
                            }}
                        />
                    ))}
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpen(true);
                            dispatch(resetDetailFood());
                        }}
                    >
                        Add new Food
                    </Button>

                    <ModalAddFood open={open} onClose={() => setOpen(false)} />
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    total={40}
                    pageSize={4}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};
