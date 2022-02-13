import React, {FC} from 'react';

import {ICountryProps} from "../../intefaces";

const Country:FC<ICountryProps> = ({country}) => {
    return (
        <div>
            {country.name}
        </div>
    );
};

export {Country};