import React, {FC} from 'react';
import {Link} from "react-router-dom";

import './MovieCard.css';
import {IMovieCardProps} from '../../../intefaces/propsComponents/movieCardProps.interface';
import {Poster} from '../../Poster/Poster';
import {StarRating} from '../../styles/StarsRating/StarRating';
import {Genres} from '../../nav/Genres/Genres';
import {useAppDispatch} from "../../../hooks";
import {setIdDetail, setMovie} from "../../../store";

const MovieCard:FC<IMovieCardProps> = ({movie}) => {
    const dispatch = useAppDispatch();
    const onClickPoster = () => {
        dispatch(setIdDetail({id:movie.id}))
        dispatch(setMovie({movie}))
    }
    return (
        <div className={'movie__card flex'}>
            <Link to={`/${movie.title}`} onClick={onClickPoster}>
                <Poster poster={movie.poster_path} title={movie.title}/>
            </Link>
            <div className={'movie__card_title flex'}>
                <h4>{movie.title}</h4>
                <div className={'movie__card_preview flex'}>
                    <StarRating rating={movie.vote_average}/>
                    <p>{movie.release_date}</p>
                    <Genres movie={movie}/>
                </div>
            </div>
        </div>
    );
};

export {MovieCard};