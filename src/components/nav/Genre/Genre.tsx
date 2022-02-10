import React, {FC} from 'react';

import {IGenreComponent} from "../../../intefaces";

const Genre:FC<IGenreComponent> = ({genre:{name}}) => {
    return (
        <li>
            <p><strong>{name}</strong></p>
        </li>
    );
};

export {Genre};