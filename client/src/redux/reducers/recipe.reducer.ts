import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    InitialRecipeProps,
    Recipe,
} from '../../interfaces/recipe.interface';
import { createRecipe, filterRecipes, getRecipes } from '../../apis/recipe.api';
import type { DataFilter } from '../../interfaces/foods.interface';

const initialState: InitialRecipeProps = {
    recipes: [],
    recipeDetail: null,
    loading: false,
    status: 'idle',
    error: null,
    url: '',
    totalItems: 0,
    recipeFilter: [],
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getRecipes.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(
                getRecipes.fulfilled,
                (state, action: PayloadAction<Recipe[]>) => {
                    state.status = 'success';
                    state.recipes = action.payload;
                }
            )
            .addCase(getRecipes.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(
                createRecipe.fulfilled,
                (state, action: PayloadAction<Recipe>) => {
                    state.recipes.unshift(action.payload);
                }
            )
            .addCase(
                filterRecipes.fulfilled,
                (state, action: PayloadAction<DataFilter<Recipe>>) => {
                    state.recipeFilter = action.payload.data;
                    state.url = action.payload.url;
                    state.totalItems = action.payload.totalItems;
                }
            );
    },
});

export const recipeStore = recipeSlice.reducer;
