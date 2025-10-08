import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import type { Recipe } from '../interfaces/recipe.interface';

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
