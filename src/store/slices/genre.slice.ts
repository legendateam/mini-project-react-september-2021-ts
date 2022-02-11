import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGenresState, IGenresAction, IError} from "../../intefaces";
import {genresService} from "../../services/genres.service";
import {AsyncStateEnum} from "../../enums";

const initialState:IGenresState = {
    genres: [],
    id: null,
    status: null,
    error: null
}

const getAllGenresThunk = createAsyncThunk(
    'genreSlice/getAllGenresThunk',
    async (_,{dispatch,rejectWithValue}) => {
        try {
            const {data} = await genresService.getALL();
            dispatch(setGenres({genres:data.genres}))
        } catch (e) {
            return rejectWithValue(dispatch(errorGenre({error: (e as Error).message })))
        }
    }
);

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<IGenresAction>) => {
            state.genres = action.payload.genres
        },
        getId: (state, action:PayloadAction<string>) => {
            const find = state.genres.find(genre => genre.name === action.payload);
            if(find !== undefined) {
                state.id  = find.id
            }
        },
        errorGenre: (state, action:PayloadAction<IError>) => {
            state.error = action.payload.error
        }
    },
    extraReducers:builder => {
        builder.addCase(getAllGenresThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getAllGenresThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error  = null
        });
        builder.addCase(getAllGenresThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected;
        })
    }
});

const genreReducer = genreSlice.reducer;

export const {setGenres, errorGenre, getId} = genreSlice.actions;
export default genreReducer;
export {getAllGenresThunk}