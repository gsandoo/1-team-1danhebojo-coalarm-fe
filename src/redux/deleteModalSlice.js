// src/store/deleteModalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const deleteModalSlice = createSlice({
    name: 'deleteModal',
    initialState: {
        isOpen: false,
        alertId: null,
    },
    reducers: {
        openDeleteModal: (state, action) => {
            state.isOpen = true;
            state.alertId = action.payload;
        },
        closeDeleteModal: (state) => {
            state.isOpen = false;
            state.alertId = null;
        },
    },
});

export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;
export default deleteModalSlice;