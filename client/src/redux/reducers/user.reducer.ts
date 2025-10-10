import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InitialUserProps, User } from '../../interfaces/user.interface';
import { createUser, getUsers } from '../../apis/user.api';
import { updateAvatar } from '../../apis/avata.api';

const initialState: InitialUserProps = {
    users: [],
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(
                getUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.status = 'success';
                    state.users = action.payload;
                }
            )
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(
                createUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.users.push(action.payload);
                }
            )
            .addCase(
                updateAvatar.fulfilled,
                (state, action: PayloadAction<User>) => {
                    const index = state.users.findIndex(
                        (u) => u.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.users[index] = action.payload;
                    }
                }
            );
    },
});

export const userStore = userSlice.reducer;
