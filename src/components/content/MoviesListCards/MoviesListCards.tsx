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
            } else if (!!movies.length && !!results.length && !pageQ) {
                dispatch(getAllMoviesThunk())
            }  else if (!!movies.length && !!moviesWithGenre.length && !pageQ) {
                dispatch(getAllMoviesThunk())
            } else if (!!movies.length && pageQ) {
                dispatch(getAllMoviesPaginationThunk(pageQ))
                return
            }

            // if (!!movies.length && pageQ) {
            //     dispatch(getAllMoviesPaginationThunk(pageQ))
            //     console.log('dfdsfsdf')
            // } else if(!movies.length && pageQ) {
            //     dispatch(getAllMoviesPaginationThunk(pageQ))
            //     console.log('dfdsfsdf')
            // }

           if(!movies.length && pageQ && !moviesWithGenre.length) {
                dispatch(getAllMoviesPaginationThunk(pageQ))
            } else if (!movies.length && pageQ && !!moviesWithGenre.length) {
               dispatch(getAllMoviesThunk())
               return
           }


           if(!results.length && !movies.length && !pageQuery) {
                dispatch(getAllMoviesThunk())
            }
        }

        // if(!movies.length && !category && !pageQ) {
        //     dispatch(getAllMoviesThunk());
        // } else if (!!movies.length && !!results.length && !pageQ && !category) {
        //     dispatch(getAllMoviesThunk())
        // }  else if (!!movies.length && !!moviesWithGenre.length && !category) {
        //     dispatch(getAllMoviesThunk())
        //     return
        // }
        //
        // if (!!movies.length && pageQ && !category) {
        //     dispatch(getAllMoviesPaginationThunk(pageQ))
        // } else if(!movies.length && !category && pageQ) {
        //     dispatch(getAllMoviesPaginationThunk(pageQ))
        // }
        // if(!movies.length && !category) {
        //     dispatch(getAllMoviesThunk());
        //     return
        // }
        //
        // if (!!movies.length && !category && pageQuery !==1 && pageQ) {
        //     dispatch(getAllMoviesPaginationThunk(pageQ))
        // } else if(!!movies.length && !category && pageQ === 1) {
        //     return
        // }
        //
        // if(!movies.length && !category && pageQ) {
        //     dispatch(getAllMoviesPaginationThunk(pageQ))
        //     return
        // }
        //
        // if(id && category) {
        //     dispatch(getMoviesWithGenreThunk(id))
        // } else if (!id && category && genres.length) {
        //     const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //     if(find?.id) {
        //         dispatch(getMoviesWithGenreThunk(find.id))
        //     }
        // } else if(id && category && pageQ) {
        //     dispatch(getMoviesWithGenrePaginationThunk({genre:id, page:pageQ}))
        // } else if (!id && category && genres.length && pageQ) {
        //     const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //     if(find?.id) {
        //         dispatch(getMoviesWithGenrePaginationThunk({genre:find.id, page:pageQ}))
        //     }
        // }
        // if(!movies.length && !category) {
        //     dispatch(getAllMoviesThunk());
        // } else if (!!movies.length && !category && pageQ) {
        //     dispatch(getAllMoviesPaginationThunk(pageQ))
        // } else if(!movies.length && !category && pageQ) {
        //     dispatch(getAllMoviesPaginationThunk(pageQ))
        //     return
        // }
        //
        // if(id && category) {
        //     dispatch(getMoviesWithGenreThunk(id))
        // } else if (!id && category && genres.length) {
        //     const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //     if(find?.id) {
        //         dispatch(getMoviesWithGenreThunk(find.id))
        //     }
        // } else if(id && category && pageQ) {
        //     dispatch(getMoviesWithGenrePaginationThunk({genre:id, page:pageQ}))
        // } else if (!id && category && genres.length && pageQ) {
        //     const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //     if(find?.id) {
        //         dispatch(getMoviesWithGenrePaginationThunk({genre:find.id, page:pageQ}))
        //     }
        // }
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

        // if(category) {
        //     if(id && genres.length) {
        //         dispatch(getMoviesWithGenreThunk(id))
        //     } else if (!id && category && genres.length) {
        //         const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //         if(find?.id) {
        //             dispatch(getMoviesWithGenreThunk(find.id))
        //         }
        //     } else if (id && pageQ && !!moviesWithGenre.length) {
        //         dispatch(getMoviesWithGenrePaginationThunk({genre: id, page: pageQ}))
        //     } else if (!id && category && !moviesWithGenre.length && genres.length && pageQuery) {
        //         const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //         if(find?.id) {
        //             dispatch(getMoviesWithGenrePaginationThunk({genre: find.id, page: pageQuery}))
        //         }
        //     }
        // }
        // if(id && category && movies.length) {
        //     dispatch(getMoviesWithGenreThunk(id))
        // } else if (!id && category && genres.length) {
        //     const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //     if(find?.id) {
        //         dispatch(getMoviesWithGenreThunk(find.id))
        //     }
        // }
        //
        // if(id && category && pageQ && !!moviesWithGenre.length) {
        //     dispatch(getMoviesWithGenrePaginationThunk({genre: id, page: pageQ}))
        // } else if (!id && category && !moviesWithGenre.length && genres.length && pageQuery) {
        //     const find = genres.find(genre => pathname.includes(`${genre.name}`) );
        //     if(find?.id) {
        //         dispatch(getMoviesWithGenrePaginationThunk({genre: find.id, page: pageQuery}))
        //     }
        // }

    }, [id,genres, pageQ])

    // console.log(pageQuery, 'query');
    // console.log(pageQ, 'redux');
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