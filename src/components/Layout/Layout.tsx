import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from "../Header/Header";
import {ArrowTop} from "../styles/ArrowTop/ArrowTop";

const Layout:FC = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <ArrowTop/>
        </div>
    );
};

export {Layout};