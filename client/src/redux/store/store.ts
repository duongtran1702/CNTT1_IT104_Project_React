import { configureStore } from '@reduxjs/toolkit';
import { userStore } from '../reducers/user.reducer';
import { foodStore } from '../reducers/food.reducer';
import { createRecipeReducer } from '../reducers/createRecipe.reducer';

export const store = configureStore({
    reducer: {
        user: userStore,
        food: foodStore,
        createRecipe: createRecipeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
