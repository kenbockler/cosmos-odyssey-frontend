// src/redux/slices/travelSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const travelSlice = createSlice({
    name: 'travel',
    initialState: { prices: [], loading: false, error: null },
    reducers: {
        setTravelPrices(state, action) {
            state.prices = action.payload;
        },
    },
});

export const { setTravelPrices } = travelSlice.actions;
export default travelSlice.reducer;
