import React, {FC, useEffect} from 'react';
import {LinearProgress} from "@mui/material";

import './HomePage.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {AsyncStateEnum} from "../../enums";
import {ProviderRegion} from "../content/ProviderRegion/ProviderRegion";
import {getAllProvidersRegionsThunk} from "../../store";

const HomePage:FC = () => {
    const {results,status,error} = useAppSelector(state => state.providerRegionReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!results.length) {
            dispatch(getAllProvidersRegionsThunk())
        }
    },[])

    return (
        <div className={'home__page'}>

            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}

            <div className={'home__page_content flex'}>

                {status === AsyncStateEnum.fulfilled && <h1>List of all of the countries we have watch provider (OTT/streaming)</h1>}
                {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}

                <div className={'home__page__country flex'}>
                    {
                        results.map(result => <ProviderRegion key={result.iso_3166_1} result={result}/>)
                    }
                </div>

            </div>

        </div>
    );
};

export {HomePage};
