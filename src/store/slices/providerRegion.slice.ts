import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IError, IProvidersRegions,IProviderRegionSliceActionsetProvidersRegions} from "../../intefaces";
import {providersRegionsServices} from "../../services";
import {AsyncStateEnum} from '../../enums';

const initialState:IProvidersRegions = {
    results: [],
    status: null,
    error: null
}

const getAllProvidersRegionsThunk = createAsyncThunk(
    'providerRegionSlice/getAllProvidersRegionsThunk',
    async (_,{dispatch,rejectWithValue})=> {
        try {
            const {data} = await providersRegionsServices.getAll();
            dispatch(setProvidersRegions({country:data.results}))
        } catch (e) {
            dispatch(errorAction({error: ((e as Error).message)}))
            return rejectWithValue(-1)
        }
    }
);

const providerRegionSlice = createSlice({
    name: 'providerRegionSlice',
    initialState,
    reducers: {
        setProvidersRegions: (state, action:PayloadAction<IProviderRegionSliceActionsetProvidersRegions>) => {
            state.results = action.payload.country
        },
        errorAction: (state, action:PayloadAction<IError>) => {
            state.error = action.payload.error
        }
    },
    extraReducers:builder => {
        builder.addCase(getAllProvidersRegionsThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getAllProvidersRegionsThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error = null
        });
        builder.addCase(getAllProvidersRegionsThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected
        })
    }
});

const providerRegionReducer = providerRegionSlice.reducer;

export default providerRegionReducer;
export const {setProvidersRegions, errorAction} = providerRegionSlice.actions;
export {getAllProvidersRegionsThunk}