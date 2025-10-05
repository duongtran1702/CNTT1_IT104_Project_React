import { configureStore } from '@reduxjs/toolkit';
import { userStore } from '../reducers/user.reducer';
import { foodStore } from '../reducers/food.reducer';

export const store = configureStore({
    reducer: { user: userStore, food: foodStore },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
