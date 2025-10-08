import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    InitialRecipeProps,
    Recipe,
} from '../../interfaces/recipe.interface';
import { createRecipe, getRecipes } from '../../apis/recipe.api';

const initialState: InitialRecipeProps = {
    recipes: [],
    recipeDetail: null,
    loading: false,
    status: 'idle',
    error: null,
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
                    state.recipes.push(action.payload);
                }
            );
    },
});

export const recipeStore = recipeSlice.reducer;
