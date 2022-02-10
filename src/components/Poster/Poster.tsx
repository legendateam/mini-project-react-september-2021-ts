import React, {FC} from 'react';

import {IPoster} from "../../intefaces/propsComponents/poster.inteface";
import {urls} from "../../configs";

const Poster:FC<IPoster> = ({poster,title}) => {
    return (
        <div>
            <img src={`${urls.posterW500}${poster}`} alt={`${title}`}/>
        </div>
    );
};

export {Poster};