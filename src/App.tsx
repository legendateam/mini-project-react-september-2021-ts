import React, {FC} from 'react';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';

import './App.css';
import {Filter,HomePage, Layout, MovieDetails, MoviesListCards, NotFoundPage} from './components';
import {useAppDispatch, useAppSelector} from "./hooks";
import {setAddNightHeader, setClass} from "./store";

const App:FC = () => {
    const {addClass,checked} = useAppSelector(state => state.toggleThemeReducer);
    const dispatch = useAppDispatch();
    if(checked) {
        dispatch(setClass({addClass:'night dark-scheme'}))
        dispatch(setAddNightHeader(({addHeader:'night__header'})))
    } else if (!checked) {
        dispatch(setClass(({addClass:''})))
        dispatch(setAddNightHeader(({addHeader:''})))
    }
    return (
        <div className={`${addClass}`}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={':movie'} element={<MovieDetails/>}/>
                    <Route path={'movies'} element={<Filter/>}>
                        <Route path={'list'} element={<MoviesListCards/>}/>
                        <Route path={'list/category/:genre'} element={<MoviesListCards/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;