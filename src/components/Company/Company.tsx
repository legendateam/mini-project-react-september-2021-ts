import React, {FC} from 'react';

import {ICompanyProps} from "../../intefaces";
import {urls} from "../../configs";

const Company:FC<ICompanyProps> = ({company}) => {
    return (
        <div>
            <img src={`${urls.posterW500}${company.logo_path}`} alt={`${company.name}`}/>
        </div>
    );
};

export {Company};