import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import type { User } from '../interfaces/user.interface';

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    const res = await api.get('users');
    return res.data;
});

export const createUser = createAsyncThunk(
    'user/loadUsers',
    async (newUser: User) => {
        const res = await api.post('users', newUser);
        return res.data;
    }
);

export const updateLike = createAsyncThunk(
    'user/updateLike',
    async (data: { likes: string[]; userId: string }) => {
        const res = await api.patch(`users/${data.userId}`, {
            likes: data.likes,
        });
        return res.data;
    }
);

export const updateFavorite = createAsyncThunk(
    'user/updateFavorite',
    async (data: { favorites: string[]; userId: string }) => {
        const res = await api.patch(`users/${data.userId}`, {
            favorites: data.favorites,
        });
        return res.data;
    }
);

export const loadUser = createAsyncThunk(
    'user/loadUser',
    async (id: string) => {
        const res = await api.patch(`users/${id}`);
        return res.data;
    }
);
