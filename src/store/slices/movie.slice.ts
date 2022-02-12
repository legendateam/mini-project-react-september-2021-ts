import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IError, IMovies, IAllMovies, ISortBy} from "../../intefaces";
import {moviesService} from "../../services";
import {AsyncStateEnum} from "../../enums";

const initialState:IMovies = {
    movies: [],
    moviesWitchGenre: [],
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

const getMoviesWitchGenreThunk = createAsyncThunk<void,number>(
    'moviesSlice,getAllMoviesThunk',
    async (id, {dispatch,rejectWithValue}) => {
        try {
            const {data} = await moviesService.getListWithGenre(id);
            dispatch(getMoviesWitchGenre({movies: data.results}))
        } catch (e) {
            return rejectWithValue(dispatch(rejectMovie({error: (e as Error).message})))
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
        getMoviesWitchGenre: (state, action:PayloadAction<IAllMovies>) => {
            state.moviesWitchGenre = action.payload.movies
        },
        sortMovies: (state, action:PayloadAction<ISortBy>) => {
            switch (action.payload.sortBy) {
                case 'A-Z':
                    const sortMoviesAz = state.movies.sort((a,b) => {
                                if(b.title > a.title) {
                                    return -1
                                }
                                return 1
                            });
                    state.movies  = sortMoviesAz;
                    break;
                case 'Z-A':
                    const sortMoviesZa = state.movies.sort((a,b) => {
                        if(a.title > b.title) {
                            return -1
                        }
                        return 1
                    });
                    state.movies  = sortMoviesZa;
                    break;
                case 'Top Popular':
                    const sortPopular = state.movies.sort((a,b) => b.vote_average - a.vote_average)
                    state.movies  = sortPopular;
                    break;
                case 'Useless':
                    const sortUseless = state.movies.sort((a, b) => a.vote_average - b.vote_average);
                    state.movies  = sortUseless;
                    break;
                default :
                    state.movies = []
            }
        },
        moviesWitchGenre: (state, action:PayloadAction<ISortBy>) => {
            switch (action.payload.sortBy) {
                case 'A-Z':
                    const sortMoviesAz = state.movies.sort((a,b) => {
                        if(b.title > a.title) {
                            return -1
                        }
                        return 1
                    });
                    state.moviesWitchGenre  = sortMoviesAz;
                    break;
                case 'Z-A':
                    const sortMoviesZa = state.movies.sort((a,b) => {
                        if(a.title > b.title) {
                            return -1
                        }
                        return 1
                    });
                    state.moviesWitchGenre  = sortMoviesZa;
                    break;
                case 'Top Popular':
                    const sortPopular = state.movies.sort((a,b) => b.vote_average - a.vote_average)
                    state.moviesWitchGenre = sortPopular;
                    break;
                case 'Useless':
                    const sortUseless = state.movies.sort((a, b) => a.vote_average - b.vote_average);
                    state.moviesWitchGenre = sortUseless;
                    break;
                default :
                    state.moviesWitchGenre = []
            }
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
        });

        builder.addCase(getMoviesWitchGenreThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getMoviesWitchGenreThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error = null
        });
        builder.addCase(getMoviesWitchGenreThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected
        });
    }
});

const moviesReducer = moviesSlice.reducer;
export const {rejectMovie,moviesWitchGenre,sortMovies,getAllMovies,getMoviesWitchGenre} = moviesSlice.actions;

export default moviesReducer;
export {getAllMoviesThunk,getMoviesWitchGenreThunk}