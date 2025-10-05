import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import type { Food } from '../interfaces/foods.interface';

export const getFoods = createAsyncThunk('food/getFoods', async () => {
    const res = await api.get('foods');
    return res.data;
});

export const createFood = createAsyncThunk(
    'food/createFood',
    async (food: Food) => {
        const res = await api.post('foods', food);
        return res.data;
    }
);

export const updateFood = createAsyncThunk(
    'food/updateFood',
    async (food: Food) => {
        const res = await api.put(`foods/${food.id}`, food);
        return res.data;
    }
);
