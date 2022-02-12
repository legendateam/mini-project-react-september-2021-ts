import React, {FC, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import {useAppDispatch} from "../../hooks";
import {addPage} from "../../store";

const PaginationPage:FC = () => {
    const dispatch = useAppDispatch();

    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const page = parseInt(query.get('page') || '1', 10);

    useEffect(()=>{
        if(page !== 1) {
            dispatch(addPage({page:page}))
        }
    },[page])

    return (
        <Pagination
            page={page}
            count={10}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/movies/list${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
};

export {PaginationPage};