import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IError, IMovies,IAllMovies} from "../../intefaces";
import {moviesService} from "../../services";
import {AsyncStateEnum} from "../../enums";

const initialState:IMovies = {
    movies: [],
    status: null,
    error: null
}

const getAllMoviesThunk = createAsyncThunk(
      'moviesSlice/getAllMoviesThunk',
      async(_,{dispatch,rejectWithValue}) => {
          try{
                const {data} = await moviesService.getAll();
                dispatch(getAllMovies({movies:data.results}))
          } catch (e) {
              return rejectWithValue(dispatch(rejectMovie({error:(e as Error).message})))
          }
      }
);

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        getAllMovies: (state, action:PayloadAction<IAllMovies>) => {
            state.movies = action.payload.movies
        },
        rejectMovie: (state, action:PayloadAction<IError>) => {
            state.error = action.payload.error
        }
    },
    extraReducers:builder => {
        builder.addCase(getAllMoviesThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getAllMoviesThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error = null
        });
        builder.addCase(getAllMoviesThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected
        })
    }
});

const moviesReducer = moviesSlice.reducer;
export const {rejectMovie, getAllMovies} = moviesSlice.actions;

export default moviesReducer;
export {getAllMoviesThunk}