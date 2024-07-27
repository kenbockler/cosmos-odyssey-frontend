// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import travelSlice from './slices/travelSlice.jsx';
import reservationSlice from './slices/reservationSlice.jsx';

export const store = configureStore({
    reducer: {
        travel: travelSlice,
        reservation: reservationSlice,
    },
});
