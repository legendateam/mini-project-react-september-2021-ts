import React, {FC, useEffect} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {LinearProgress} from '@mui/material';

import './Filter.css'
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getAllGenresThunk} from '../../../store/slices/genre.slice';
import {AsyncStateEnum} from '../../../enums';
import {IPropsSelect} from '../../../intefaces';
import {SelectSort} from '../SelectSort/SelectSort';
import {SelectGenres} from '../SelectGenres/SelectGenres';
import {PaginationPage} from '../../PaginationPage/PaginationPage'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps:IPropsSelect = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Filter: FC = () => {

    const {genres, error, status, id} = useAppSelector(state => state.genreReducer);
    const {movies} = useAppSelector(state => state.moviesReducer);

    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const category = pathname.includes('category');

    useEffect(() => {
        if (!genres.length) {
            dispatch(getAllGenresThunk())
        }
    }, []);

    return (
        <div className={'movies__list flex'}>

            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}
            {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}
            {status === AsyncStateEnum.fulfilled &&
            <div className={'filter flex'}>
                <SelectSort MenuProps={MenuProps}/>
                <SelectGenres MenuProps={MenuProps}/>
                {id && category && !!movies.length &&
                <div className={'filter__return'}>
                    <Link to={'/movies/list'}><h4>Return to the list of films of different genres</h4></Link>
                </div>
                }
            </div>
            }
            <PaginationPage/>
            <Outlet/>
        </div>
    );
}

export {Filter}
