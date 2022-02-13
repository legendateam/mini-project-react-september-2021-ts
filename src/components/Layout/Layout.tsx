import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../Header/Header';
import {ArrowTop} from '../styles/ArrowTop/ArrowTop';
import {Footer} from "../Footer/Footer";

const Layout:FC = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <ArrowTop/>
            <Footer/>
        </div>
    );
};

export {Layout};