import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {
    IToggle,
    IToggleActionSetAddNightHeader,
    IToggleActionSetChecked,
    IToggleActionSetClass
} from "../../intefaces";

const initialState:IToggle = {
    checked: false,
    addClass: '',
    NightHeader: ''
}

const toggleThemeMode = createSlice({
    name: 'toggleThemeMode',
    initialState,
    reducers: {
        setChecked: (state, action:PayloadAction<IToggleActionSetChecked>) => {
            state.checked = action.payload.checked
        },
        setClass: (state, action:PayloadAction<IToggleActionSetClass>) => {
            state.addClass = action.payload.addClass
        },
        setAddNightHeader: (state, action:PayloadAction<IToggleActionSetAddNightHeader>) => {
            state.NightHeader = action.payload.addHeader
        }
    }
});


const toggleThemeReducer = toggleThemeMode.reducer;
export const {setClass,setChecked,setAddNightHeader} = toggleThemeMode.actions;

export default toggleThemeReducer