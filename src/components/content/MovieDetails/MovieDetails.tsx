import React, {FC, useEffect, useState} from 'react';

import './MovieDetails.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllCreditsThunk, getMovieDetailsThunk} from "../../../store";
import { IResultsMovie, IVideos} from "../../../intefaces";
import {Poster} from "../../Poster/Poster";
import {VideoDetail} from "../../VideoDetail/VideoDetail";
import {Company} from "../../Company/Company";
import {Country} from "../../Country/Country";
import {Genres} from "../../nav/Genres/Genres";
import {StarRating} from "../../styles/StarsRating/StarRating";
import {urls} from "../../../configs";
import {Credits} from "../Credits/Credits";
import {AsyncStateEnum} from "../../../enums";

const MovieDetails:FC = () => {
    const {status,error,movieDetail, movie, id} = useAppSelector(state => state.moviesReducer);
    const dispatch = useAppDispatch();
    const [copyMovie, setCopyMovie] = useState<IResultsMovie>();

    useEffect(()=> {
        if(movie) {
            setCopyMovie(movie)
        }
        if(id) {
            dispatch(getMovieDetailsThunk(id))
            dispatch(getAllCreditsThunk(id))
        }
    },[])

    const find:IVideos|undefined = movieDetail?.videos.results.find(video =>video.type === 'Trailer');
    return (
        <div className={'movie__details flex'}>
            {status === AsyncStateEnum.rejected && <h1>{error}</h1> }
            <div style={{
                backgroundImage: `url(${urls.poster}${movieDetail?.backdrop_path})`,
            }}>
                <div className={'wrapper__movie_details flex'} >
                    <div className={'wrapper__movie_details-poster'}>
                        <Poster poster={movieDetail?.poster_path} title={movieDetail?.title}/>
                    </div>

                    <div className={'movie__details-content flex'}>
                        <h1>{movieDetail?.title}</h1>
                        <div className={'movie__details_title flex'}>
                            {copyMovie && <StarRating rating={copyMovie.vote_average}/>}
                            <div className={'movie__details_title_genres'}>
                                {copyMovie && <Genres movie={copyMovie}/>}
                            </div>
                            <h5>{movieDetail?.release_date}</h5>
                            {
                                movieDetail?.production_countries.map(country =>
                                    <div className={'movie__details-country'}><Country key={country.name} country={country}/></div>)
                            }
                        </div>
                        <p>{movieDetail?.overview}</p>
                        <Credits/>
                        <div className={'movie__details-company flex'}>
                            {
                                movieDetail?.production_companies.map(company =>
                                    <div className={'movie__details-genres flex'}><Company key={company.id} company={company}/></div>)
                            }
                        </div>
                    </div>
                </div>
                <VideoDetail video={find}/>
            </div>
        </div>
    );
};

export {MovieDetails};