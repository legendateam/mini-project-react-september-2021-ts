import React, {FC, useEffect} from 'react';
import {LinearProgress} from "@mui/material";

import './MoviesListCards.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllMoviesThunk, getMoviesWitchGenreThunk} from "../../../store";
import {MovieCard} from "../MovieCard/MovieCard";
import {AsyncStateEnum} from "../../../enums";

const MoviesListCards:FC = () => {
    const {movies,status,error,moviesWitchGenre} = useAppSelector(state => state.moviesReducer);
    const {id} = useAppSelector(state => state.genreReducer);

    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(!movies.length && !id) {
            dispatch(getAllMoviesThunk());
            return
        }
        if(id) {
            dispatch(getMoviesWitchGenreThunk(id))
        }
    },[id])

    return (
        <>
            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}

                {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}

                <div className={'movies__list_nav-cards flex'}>
                    {
                        !moviesWitchGenre.length &&
                        movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    }

                    {
                        !!moviesWitchGenre.length &&
                        moviesWitchGenre.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    }
                </div>

        </>
    );
};

export {MoviesListCards};