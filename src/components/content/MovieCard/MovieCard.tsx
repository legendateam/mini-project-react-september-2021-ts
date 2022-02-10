import React, {FC} from 'react';

import './MovieCard.css';
import {IMovieCardProps} from "../../../intefaces/propsComponents/movieCardProps.interface";
import {Poster} from "../../Poster/Poster";
import {StarRating} from "../../styles/StarsRating/StarRating";
import {Genres} from "../../nav/Genres/Genres";

const MovieCard:FC<IMovieCardProps> = ({movie}) => {
    return (
        <div className={'movie__card flex'}>
            <Poster poster={movie.poster_path} title={movie.title}/>
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


// import React, {FC, useEffect, useState} from 'react';
//
// import './MovieCard.css';
// import {IMovieCardProps} from "../../../intefaces/propsComponents/movieCardProps.interface";
// import {Poster} from "../../Poster/Poster";
// import {StarRating} from "../../styles/StarsRating/StarRating";
// import {useAppSelector} from "../../../hooks";
//
// const MovieCard:FC<IMovieCardProps> = ({movie}) => {
//     const {genres} = useAppSelector(state => state.genreReducer);
//     const [newGenres,setNewGenres] = useState<string[]>([]);
//
//     useEffect(()=> {
//         for(let i = 0; i <= movie.genre_ids.length-1; i++) {
//             const filterGenres = genres.filter(genre => genre.id === movie.genre_ids[i]);
//             filterGenres.map(filter => setNewGenres(prevState => [...prevState, filter.name + ' ']))
//         }
//     },[genres])
//
//     return (
//         <div className={'movie__card flex'}>
//             <Poster poster={movie.poster_path} title={movie.title}/>
//             <div  className={'movie__card_title flex'}>
//                 <h4>{movie.title}</h4>
//                 <StarRating rating={movie.vote_average}/>
//                 <div className={'movie__card_preview flex'}>
//                     <p><strong>{newGenres}</strong></p>
//                     <p>{movie.release_date}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export {MovieCard};