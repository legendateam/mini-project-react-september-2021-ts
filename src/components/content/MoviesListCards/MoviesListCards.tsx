import React, {FC, useEffect} from 'react';
import {LinearProgress} from "@mui/material";

import './MoviesListCards.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllMoviesThunk} from "../../../store";
import {MovieCard} from "../MovieCard/MovieCard";
import {AsyncStateEnum} from "../../../enums";

const MoviesListCards:FC = () => {
    const {movies,status,error} = useAppSelector(state => state.moviesReducer);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(!movies.length) {
            dispatch(getAllMoviesThunk());
        }
    },[])

    return (
        <>
            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}

                {/*{status === AsyncStateEnum.fulfilled && <Filter/>}*/}
                {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}

                <div className={'movies__list_nav-cards flex'}>
                    {
                        movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    }
                </div>

        </>
    );
};

export {MoviesListCards};