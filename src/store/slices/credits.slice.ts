import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IError, ICreditsState, ICreditAction} from '../../intefaces';
import {AsyncStateEnum} from '../../enums';
import {creditsService} from "../../services";

const initialState:ICreditsState = {
    credits: null,
    status: null,
    error: null
}

const getAllCreditsThunk = createAsyncThunk<void, number>(
    'creditsSlice/getAllCreditsThunk',
    async (id,{dispatch,rejectWithValue}) => {
        try {
            const {data} = await creditsService.getAll(id);
            dispatch(setCredits({credits:data.cast}))
        } catch (e) {
            return rejectWithValue(dispatch(errorCredits({error: (e as Error).message })))
        }
    }
);

const creditsSlice = createSlice({
    name: 'creditsSlice',
    initialState,
    reducers: {
        setCredits: (state, action: PayloadAction< ICreditAction>) => {
            state.credits = action.payload.credits
        },
        errorCredits: (state, action:PayloadAction<IError>) => {
            state.error = action.payload.error
        }
    },
    extraReducers:builder => {
        builder.addCase(getAllCreditsThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getAllCreditsThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error  = null
        });
        builder.addCase(getAllCreditsThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected;
        })
    }
});

const creditsReducer = creditsSlice.reducer;

export const {setCredits,errorCredits} = creditsSlice.actions;
export default creditsReducer;
export {getAllCreditsThunk}