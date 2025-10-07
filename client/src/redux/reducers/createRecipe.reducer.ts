import { createSlice } from '@reduxjs/toolkit';
import type { Recipe } from '../../interfaces/recipe.interface';

export const initialRecipeValues: Omit<Recipe, 'id'> = {
    image: null,
    like: '',
    category: '',

    name: '',
    description: '',
    totalTime: '',
    prepTime: '',
    finalWeight: '0',
    protions: '',
    
    ingredients: [],
    cookingSteps: [],
};

export const createRecipeStore = createSlice({
    name: 'createRecipe',
    initialState: initialRecipeValues,
    reducers: {
        setCreateRecipe: (state, action) => {
            state= { ...state, ...action.payload };
            console.log('state', state);
            return state;
        },
        resetCreateRecipe: () => {
            return initialRecipeValues;
        },
    },
});

export const { setCreateRecipe, resetCreateRecipe } = createRecipeStore.actions;

export const createRecipeReducer = createRecipeStore.reducer;
