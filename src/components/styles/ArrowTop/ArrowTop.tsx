import React, {FC, useEffect} from 'react';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import './ArrowTop.css'
import {useAppDispatch, useAppSelector} from '../../../hooks';
import { changeState } from '../../../store';


const ArrowTop:FC = () => {
    const {showArrow} = useAppSelector(state => state.arrowReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 200) {
                dispatch(changeState({showArrow: true}));
            } else {
                dispatch(changeState({showArrow: false}));
            }
        });
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {showArrow && <ArrowCircleUpIcon className={'back-to-top'} fontSize={'large'} onClick={scrollToTop}/>}
        </>
    );
};

export {ArrowTop};