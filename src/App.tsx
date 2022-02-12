import React, {FC} from 'react';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';

import './App.css';
import {Filter, Footer, HomePage, Layout, MoviesListCards, NotFoundPage} from './components';

const App:FC = () => {
    return (
        <div className={'background__color-white'}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'movies'} element={<Filter/>}>
                        <Route path={'list'} element={<MoviesListCards/>}/>
                        <Route path={'list/category/:genre'} element={<MoviesListCards/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;


// import React, {FC} from 'react';
// import {Routes} from 'react-router-dom';
// import {Route} from 'react-router-dom';
//
// import './App.css';
// import {HomePage, Layout, MoviesListCards, NotFoundPage} from './components';
//
// const App:FC = () => {
//     return (
//         <div className={'background__color-white'}>
//             <Routes>
//                 <Route path={'/'} element={<Layout/>}>
//                     <Route path={'/'} element={<HomePage/>}/>
//                     <Route path={'movies'} element={<MoviesListCards/>}/>
//                     <Route path={'movies:genres'} element={<MoviesListCards/>}/>
//                     <Route path={'*'} element={<NotFoundPage/>}/>
//                 </Route>
//             </Routes>
//         </div>
//     );
// };
//
// export default App;
