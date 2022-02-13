import React, {FC, useEffect} from 'react';
import {LinearProgress} from '@mui/material';
import {useLocation, useSearchParams} from 'react-router-dom';

import './MoviesListCards.css';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
    addPage,
    getAllMoviesPaginationThunk,
    getAllMoviesThunk,
    getMoviesWithGenrePaginationThunk,
    getMoviesWithGenreThunk
} from '../../../store';
import {MovieCard} from '../MovieCard/MovieCard';
import {AsyncStateEnum} from '../../../enums';

const MoviesListCards:FC = () => {
    const {movies,status,error,moviesWithGenre,pageQ} = useAppSelector(state => state.moviesReducer);
    const {results} = useAppSelector(state => state.providerRegionReducer);
    const {genres, id} = useAppSelector( state => state.genreReducer )
    addPage({page:null})
    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams();
    const pageQuery = Number(query.get('page'));

    const {pathname} = useLocation();
    const category = pathname.includes('category');

    useEffect(()=> {
        if(!category) {
            if(!movies.length  && !pageQ && !!results.length) {
                dispatch(getAllMoviesThunk());
                console.log('case 1')
            } else if (!!movies.length && !!results.length && !pageQ) {
                dispatch(getAllMoviesThunk())
                console.log('case 2')
            }  else if (!!movies.length && !!moviesWithGenre.length && !pageQ) {
                dispatch(getAllMoviesThunk())
                console.log('case3')
            } else if (!!movies.length && pageQ) {
                dispatch(getAllMoviesPaginationThunk(pageQ))
                console.log('case 4')
                return
            }

           if(!movies.length && pageQ && !moviesWithGenre.length) {
                dispatch(getAllMoviesPaginationThunk(pageQ))
               console.log('case 5')
            } else if (!movies.length && pageQ && !!moviesWithGenre.length) {
               dispatch(getAllMoviesThunk())
               console.log('case 6')
               return
           }

           if(!results.length && !movies.length && !pageQuery) {
                dispatch(getAllMoviesThunk())
               console.log('case 7')
            }
        }

    },[id,pageQ,pageQuery])

    useEffect(()=> {
        if( category ) {
            if(id && !pageQ) {
                dispatch(getMoviesWithGenreThunk(id))
            } else if (!id && genres.length && !pageQuery && !pageQ) {
                const find = genres.find(genre => pathname.includes(`${genre.name}`) );
                if(find?.id) {
                    dispatch(getMoviesWithGenreThunk(find.id))
                }
            }

            if( pageQ && !id ) {
                const find = genres.find(genre => pathname.includes(`${genre.name}`) );
                if(find?.id) {
                    dispatch(getMoviesWithGenrePaginationThunk({genre: find.id, page: pageQ}))
                }
            } else if (pageQ && id ) {
                dispatch(getMoviesWithGenrePaginationThunk({genre:id, page: pageQ}))
            }

            if(pageQ && !pageQuery) {
                setQuery({page: pageQ.toString()})
            }
        }

    }, [id,genres, pageQ])

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