import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import type { User } from '../interfaces/user.interface';

export const getUsers = createAsyncThunk('auth/getUsers', async () => {
    const res = await api.get('users');
    return res.data;
});

export const createUser = createAsyncThunk(
    'auth/loadUsers',
    async (newUser: User) => {
        const res = await api.post('users', newUser);
        return res.data;
    }
);


