import React, {FC, useEffect, useState} from 'react';

import './Genres.css'
import {useAppSelector} from "../../../hooks";
import {Genre} from "../Genre/Genre";
import {IMovieCardProps} from "../../../intefaces/propsComponents/movieCardProps.interface";
import {IGenre} from "../../../intefaces";
import {AsyncStateEnum} from '../../../enums';

const Genres: FC<IMovieCardProps> = ({movie}) => {
    const {genres,error,status} = useAppSelector(state => state.genreReducer);
    const [newGenres,setNewGenres] = useState<IGenre[]>([]);

    useEffect(()=> {
        if(!newGenres.length) {
            for(let i = 0; i <= movie.genre_ids.length-1; i++) {
                const filterGenres = genres.filter(genre => genre.id === movie.genre_ids[i]);
                filterGenres.map(filter => setNewGenres(prevState => [...prevState, filter]))
            }
        }
    },[genres])

    return (
        <ol className={'genres'}>
            {status === AsyncStateEnum.rejected && <h4 className={'reject__error'}>{error}</h4>}
            {
                newGenres.map(genre => <Genre key={new Date().getDate()+ genre.id} genre={genre}/>)
            }
        </ol>
    );
};

export {Genres};