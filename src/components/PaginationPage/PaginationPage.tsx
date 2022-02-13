import React, {FC, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useLocation, useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {addPage} from "../../store";

const PaginationPage:FC = () => {
    const {movies,moviesWithGenre} = useAppSelector(state => state.moviesReducer);
    const {results} = useAppSelector(state => state.providerRegionReducer);
    const dispatch = useAppDispatch();

    const {pathname} = useLocation();
    const category = pathname.includes('category');

    const [query, setQuery] = useSearchParams();
    const pageQuery = Number(query.get('page'));

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setQuery( {page: value.toString()})
    };

    useEffect(()=>{

        if(page !==1 && !!movies.length && !category) {
            dispatch(addPage({page:page}))
        } else if (!pageQuery && page === 1 && !!movies.length && !category ) {
            dispatch(addPage({page: null}))
        } else if( page === 1 && pageQuery && !!movies.length && !category) {
            dispatch(addPage({page:page}))
            return
        }

        if (pageQuery && page === 1 && !movies.length && !category && !results.length) {
            dispatch(addPage({page:pageQuery}))
            setPage(pageQuery);
        } else if (page !== 1 && pageQuery && !!movies.length && !category) {
            dispatch(addPage({page:page}))
            return
        }

        if(page !==1 && !!moviesWithGenre.length && category) {
            dispatch(addPage({page:page}))
        } else if (!pageQuery && page === 1 && !!moviesWithGenre.length && category ) {
            dispatch(addPage({page: null}))
        } else if( page === 1 && pageQuery && !!moviesWithGenre.length && category) {
            dispatch(addPage({page:page}))
            return
        }

        if (pageQuery && page === 1 && !moviesWithGenre.length && category && !results.length) {
            dispatch(addPage({page:pageQuery}))
            setPage(pageQuery);
        } else if (page !== 1 && pageQuery && !!moviesWithGenre.length && category) {
            dispatch(addPage({page:page}))
            return
        }

    },[page])

    useEffect(()=> {
        if(!pageQuery && !category) {
            setPage(1)
        }
    }, [pageQuery])

    return (
        <Stack spacing={2}>
            <Pagination count={500} page={page} onChange={handleChange} />
        </Stack>
    );
};

export {PaginationPage};