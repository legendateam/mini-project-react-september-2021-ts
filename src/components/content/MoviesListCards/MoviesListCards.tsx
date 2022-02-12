import React, {FC, useEffect} from 'react';
import {LinearProgress} from '@mui/material';
import {useLocation} from 'react-router-dom';

import './MoviesListCards.css';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
    getAllMoviesPaginationThunk,
    getAllMoviesThunk,
    getMoviesWithGenrePaginationThunk,
    getMoviesWithGenreThunk
} from '../../../store';
import {MovieCard} from '../MovieCard/MovieCard';
import {AsyncStateEnum} from '../../../enums';

const MoviesListCards:FC = () => {
    const {movies,status,error,moviesWithGenre,pageQ} = useAppSelector(state => state.moviesReducer);
    const {genres} = useAppSelector( state => state.genreReducer )
    const {id} = useAppSelector(state => state.genreReducer);

    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const category = pathname.includes('category');

    useEffect(()=> {
        if(!movies.length && !category) {
            dispatch(getAllMoviesThunk());
        } else if (movies.length && !category && pageQ) {
            dispatch(getAllMoviesPaginationThunk(pageQ))
        } else if(!movies.length && !category && pageQ) {
            dispatch(getAllMoviesPaginationThunk(pageQ))
            return
        }

        if(id && category) {
            dispatch(getMoviesWithGenreThunk(id))
        } else if (!id && category && genres.length) {
            const find = genres.find(genre => pathname.includes(`${genre.name}`) );
            if(find?.id) {
                dispatch(getMoviesWithGenreThunk(find.id))
            }
        } else if(id && category && pageQ) {
            dispatch(getMoviesWithGenrePaginationThunk({genre:id, page:pageQ}))
        } else if (!id && category && genres.length && pageQ) {
            const find = genres.find(genre => pathname.includes(`${genre.name}`) );
            if(find?.id) {
                dispatch(getMoviesWithGenrePaginationThunk({genre:find.id, page:pageQ}))
            }
        }
    },[id,genres,pageQ])

    // useEffect(()=> {
    //     if(!movies.length && !category) {
    //         dispatch(getAllMoviesThunk());
    //         return
    //     }
    //     if(id && category) {
    //         dispatch(getMoviesWithGenreThunk(id))
    //     } else if (!id && category && genres.length) {
    //         const find = genres.find(genre => pathname.includes(`${genre.name}`) );
    //         if(find?.id) {
    //             dispatch(getMoviesWithGenreThunk(find.id))
    //         }
    //     }
    // },[id,genres])

    return (
        <>
            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}

                {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}

                <div className={'movies__list_nav-cards flex'}>
                    {
                        !category &&
                        movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    }

                    {
                        !!moviesWithGenre.length && category &&
                        moviesWithGenre.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    }

                </div>

        </>
    );
};

export {MoviesListCards};