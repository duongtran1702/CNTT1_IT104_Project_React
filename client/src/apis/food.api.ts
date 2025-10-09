import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import type {
    DataFilter,
    FilterFoodPayload,
    Food,
} from '../interfaces/foods.interface';

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

export const filterFoods = createAsyncThunk(
    'food/filterFoods',
    async (payload: FilterFoodPayload) => {
        const query = new URLSearchParams();

        if (payload.keyword.trim()) {
            query.append('name_like', payload.keyword.trim());
        }

        if (payload.category && payload.category !== 'All') {
            query.append('category', payload.category);
        }

        if (payload.sort.by) {
            query.append('_sort', payload.sort.by);
            query.append(
                '_order',
                payload.sort.order === 'increase' ? 'asc' : 'desc'
            );
        }

        if (payload.page) {
            query.append('_page', payload.page);
            query.append('_limit', '5');
        }

        const url = query.toString() ? `foods?${query.toString()}` : 'foods';

        const res = await api.get(url);
        const data: DataFilter<Food> = {
            data: res.data,
            url,
            totalItems: parseInt(res.headers['x-total-count'], 10),
        };
        return data;
    }
);
