import {combineReducers, configureStore} from '@reduxjs/toolkit';

import providerRegionReducer from './slices/providerRegion.slice';
import arrowReducer from './slices/arrowTop.slice';
import moviesReducer from './slices/movie.slice';
import genreReducer from './slices/genre.slice';

const rootReducer = combineReducers({
    providerRegionReducer,
    arrowReducer,
    moviesReducer,
    genreReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export {rootReducer,setupStore,store}