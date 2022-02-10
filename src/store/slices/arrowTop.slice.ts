import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IInitialStateArrowTop} from "../../intefaces";

const initialState:IInitialStateArrowTop = {
    showArrow: false
}

const arrowTopSlice = createSlice({
    name: 'arrowTopSlice',
    initialState,
    reducers: {
        changeState: (state, action:PayloadAction<IInitialStateArrowTop>) => {
            state.showArrow = action.payload.showArrow
        }
    }
});

const arrowReducer = arrowTopSlice.reducer;
export const {changeState} = arrowTopSlice.actions;

export default arrowReducer