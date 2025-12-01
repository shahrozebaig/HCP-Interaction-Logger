import { createSlice } from "@reduxjs/toolkit";

const hcpSlice = createSlice({
    name: "hcp",
    initialState: {
        data: null,
    },
    reducers: {
        setHcp(state, action) {
            state.data = action.payload;
        }
    }
});

export const { setHcp } = hcpSlice.actions;
export default hcpSlice.reducer;
