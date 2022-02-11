import React, {FC, useEffect} from 'react';
import {LinearProgress} from "@mui/material";
import {useLocation} from "react-router-dom";

import './MoviesListCards.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllMoviesThunk, getMoviesWitchGenreThunk} from "../../../store";
import {MovieCard} from "../MovieCard/MovieCard";
import {AsyncStateEnum} from "../../../enums";


const MoviesListCards:FC = () => {
    const {movies,status,error,moviesWitchGenre} = useAppSelector(state => state.moviesReducer);
    const {id} = useAppSelector(state => state.genreReducer);

    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const category = pathname.includes('category');

    useEffect(()=> {
        if(!movies.length && !category) {
            dispatch(getAllMoviesThunk());
            return
        }
        if(id && category) {
            dispatch(getMoviesWitchGenreThunk(id))
        }
    },[id])

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
                        !!moviesWitchGenre.length && category &&
                        moviesWitchGenre.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    }

                </div>

        </>
    );
};

export {MoviesListCards};