import React, {FC} from 'react';

import './Credits.css'
import {useAppSelector} from "../../../hooks";
import {Credit} from "../Credit/Credit";

const Credits:FC = () => {
    const {credits} = useAppSelector(state => state.creditsReducer);
    return (
        <div className={'credits flex'}>
            {
                credits?.map(credit => <Credit key={credit.id} credit={credit}/>)
            }
        </div>
    );
};

export {Credits};