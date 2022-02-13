import React, {FC} from 'react';

import {IPosterDetail} from '../../intefaces/propsComponents/poster.inteface';
import {urls} from '../../configs';


const Poster:FC<IPosterDetail> = ({poster,title}) => {
    return (
        <div>
            <img src={`${urls.posterW500}${poster}`} alt={`${title}`}/>
        </div>
    );
};

export {Poster};