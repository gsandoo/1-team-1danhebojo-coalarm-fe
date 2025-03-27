// src/store/createAlertModalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const createAlertModalSlice = createSlice({
    name: 'createAlertModal',
    initialState: {
        isOpen: false
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = createAlertModalSlice.actions;
export default createAlertModalSlice;