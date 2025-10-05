import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Food, InitialFoodProps } from '../../interfaces/foods.interface';
import { createFood, getFoods, updateFood } from '../../apis/food.api';

const initialState: InitialFoodProps = {
    foods: [],
    status: 'idle',
    error: null,
    foodDetail: null,
};

const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        getDetaiFood: (state, action: PayloadAction<Food>) => {
            state.foodDetail = action.payload;
        },
        resetDetailFood: (state) => {
            state.foodDetail = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getFoods.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(
                getFoods.fulfilled,
                (state, action: PayloadAction<Food[]>) => {
                    state.status = 'success';
                    state.foods = action.payload;
                }
            )
            .addCase(getFoods.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(
                createFood.fulfilled,
                (state, action: PayloadAction<Food>) => {
                    state.foods.push(action.payload);
                }
            )
            .addCase(
                updateFood.fulfilled,
                (state, action: PayloadAction<Food>) => {
                    state.foods = state.foods.map((f) =>
                        f.id === action.payload.id ? action.payload : f
                    );
                }
            );
    },
});

export const foodStore = foodSlice.reducer;
export const { getDetaiFood, resetDetailFood } = foodSlice.actions;
