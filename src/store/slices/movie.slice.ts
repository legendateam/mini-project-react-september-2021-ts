import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IError, IMovies, IAllMovies, ISortBy,IPage} from '../../intefaces';
import {moviesService} from '../../services';
import {AsyncStateEnum} from '../../enums';

const initialState:IMovies = {
    movies: [],
    moviesWithGenre: [],
    pageQ: null,
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

const getMoviesWithGenreThunk = createAsyncThunk<void,number>(
    'moviesSlice,getAllMoviesThunk',
    async (id, {dispatch,rejectWithValue}) => {
        try {
            const {data} = await moviesService.getListWithGenre(id);
            dispatch(getMoviesWithGenre({movies: data.results}))
        } catch (e) {
            return rejectWithValue(dispatch(rejectMovie({error: (e as Error).message})))
        }
    }
);

const getAllMoviesPaginationThunk = createAsyncThunk<void,number>(
    'moviesSlice/getAllMoviesPaginationThunk',
    async(id, {dispatch,rejectWithValue}) => {
        try {
            const {data} = await moviesService.getAllWithPage(id);
            dispatch(getAllMovies({movies:data.results}))
        } catch (e) {
            return rejectWithValue(dispatch(rejectMovie({error: (e as Error).message})))
        }
    }
);

const getMoviesWithGenrePaginationThunk = createAsyncThunk<void, { genre:number, page: number }>(
    'moviesSlice/getMoviesWithGenrePaginationThunk',
    async({genre,page}, {dispatch,rejectWithValue}) => {
        try {
            const {data} = await moviesService.getWithGenreAndPage(genre, page);
            dispatch(getMoviesWithGenre({movies:data.results}))
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
        getMoviesWithGenre: (state, action:PayloadAction<IAllMovies>) => {
            state.moviesWithGenre = action.payload.movies
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
        sortMoviesWithGenre: (state, action:PayloadAction<ISortBy>) => {
            switch (action.payload.sortBy) {
                case 'A-Z':
                    const sortMoviesAz = state.movies.sort((a,b) => {
                        if(b.title > a.title) {
                            return -1
                        }
                        return 1
                    });
                    state.moviesWithGenre  = sortMoviesAz;
                    break;
                case 'Z-A':
                    const sortMoviesZa = state.movies.sort((a,b) => {
                        if(a.title > b.title) {
                            return -1
                        }
                        return 1
                    });
                    state.moviesWithGenre  = sortMoviesZa;
                    break;
                case 'Top Popular':
                    const sortPopular = state.movies.sort((a,b) => b.vote_average - a.vote_average)
                    state.moviesWithGenre = sortPopular;
                    break;
                case 'Useless':
                    const sortUseless = state.movies.sort((a, b) => a.vote_average - b.vote_average);
                    state.moviesWithGenre = sortUseless;
                    break;
                default :
                    state.moviesWithGenre = []
            }
        },
        addPage: (state, action:PayloadAction<IPage>) => {
            state.pageQ = action.payload.page
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

        builder.addCase(getMoviesWithGenreThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getMoviesWithGenreThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error = null
        });
        builder.addCase(getMoviesWithGenreThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected
        });

        builder.addCase(getAllMoviesPaginationThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getAllMoviesPaginationThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error = null
        });
        builder.addCase(getAllMoviesPaginationThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected
        });

        builder.addCase(getMoviesWithGenrePaginationThunk.pending, state => {
            state.status = AsyncStateEnum.pending;
            state.error = null
        });
        builder.addCase(getMoviesWithGenrePaginationThunk.fulfilled, state => {
            state.status = AsyncStateEnum.fulfilled;
            state.error = null
        });
        builder.addCase(getMoviesWithGenrePaginationThunk.rejected, state => {
            state.status = AsyncStateEnum.rejected
        });
    }
});

const moviesReducer = moviesSlice.reducer;
export const {rejectMovie,sortMoviesWithGenre,sortMovies,getAllMovies,getMoviesWithGenre,addPage} = moviesSlice.actions;

export default moviesReducer;
export {getAllMoviesThunk,getMoviesWithGenreThunk,getAllMoviesPaginationThunk,getMoviesWithGenrePaginationThunk}