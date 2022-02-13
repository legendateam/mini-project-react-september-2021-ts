import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getMovieDetailsThunk} from "../../../store";

const MovieDetails:FC = () => {
    const {status,error,movieDetail, id} = useAppSelector(state => state.moviesReducer);
    const dispatch = useAppDispatch();
    console.log(movieDetail);
    useEffect(()=> {
        if(id) {
            dispatch(getMovieDetailsThunk(id))
        }
    },[])
    return (
        <div>
            <div>{movieDetail?.title}</div>
            <div>{movieDetail?.adult}</div>
            <div>{movieDetail?.popularity}</div>
            <div>{movieDetail?.homepage}</div>
            <div>{movieDetail?.imdb_id}</div>
        </div>
    );
};

export {MovieDetails};