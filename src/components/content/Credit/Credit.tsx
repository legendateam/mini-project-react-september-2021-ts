import React, {FC} from 'react';

import './Credit.css'
import {ICreditProps} from "../../../intefaces";
import {urls} from "../../../configs";

const Credit:FC<ICreditProps> = ({credit}) => {
    return (
        <div className={'credit'}>
            <img src={`${urls.posterW500}${credit.profile_path}`} alt={`${credit.name}`}/>
        </div>
    );
};

export {Credit};