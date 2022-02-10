import React, {FC} from 'react';
import ReactCountryFlag from "react-country-flag"

import './ProviderRegion.css';
import {ProviderRegionComponent} from "../../../intefaces";

const ProviderRegion:FC<ProviderRegionComponent> = ({result:{iso_3166_1,native_name,english_name}}) => {
    return (
        <>
            <div className={'provider__region flex'}>
                <ReactCountryFlag countryCode={`${iso_3166_1}`} svg className={'provider__region-flag'} />
                {english_name}
            </div>
        </>
    );
};

export {ProviderRegion};
