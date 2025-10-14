import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import type {
    FilterRecipePayload,
    FilterWithFavorites,
    Recipe,
} from '../interfaces/recipe.interface';
import type { DataFilter } from '../interfaces/foods.interface';

export const getRecipes = createAsyncThunk('recipe/getRecipes', async () => {
    const res = await api.get('recipes');
    return res.data;
});

export const createRecipe = createAsyncThunk(
    'recipe/createRecipe',
    async (newRecipe: Recipe) => {
        const res = await api.post('recipes', newRecipe);
        return res.data;
    }
);

export const filterRecipes = createAsyncThunk(
    'recipe/filterRecipes',
    async (payload: FilterRecipePayload) => {
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
            query.append('_limit', payload.sort.itemsPerPage);
        }

        const url = query.toString()
            ? `recipes?${query.toString()}`
            : 'recipes';

        const res = await api.get(url);
        const data: DataFilter<Recipe> = {
            data: res.data,
            url,
            totalItems: parseInt(res.headers['x-total-count'], 10),
        };
        return data;
    }
);

export const updateTotalLike = createAsyncThunk(
    'recipe/updateTotalLike',
    async (data: { totalLike: number; recipeId: string }) => {
        const res = await api.patch(`recipes/${data.recipeId}`, {
            like: data.totalLike,
        });
        return res.data;
    }
);

export const filterWithFavorites = createAsyncThunk(
    'recipe/filterRecipes',
    async (payload: FilterWithFavorites) => {
        if (!payload.favorites || payload.favorites.length === 0) {
            return {
                data: [],
                url: '',
                totalItems: 0,
            } as DataFilter<Recipe>;
        }

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
            query.append('_limit', payload.sort.itemsPerPage);
        }

        if (payload.favorites && payload.favorites.length > 0) {
            payload.favorites.forEach((id) => query.append('id', id));
        }

        const url = `recipes?${query.toString()}`;

        const res = await api.get(url);
        const data: DataFilter<Recipe> = {
            data: res.data,
            url,
            totalItems: parseInt(res.headers['x-total-count'], 10),
        };
        return data;
    }
);
