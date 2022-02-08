import React, {FC} from 'react';
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";

import './App.css';
import {HomePage, Layout, NotFoundPage} from "./components";

const App:FC = () => {
    return (
        <div className={'background__color-white'}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;