import React, {FC, useEffect} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {LinearProgress} from "@mui/material";

import './Filter.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllGenresThunk} from "../../../store/slices/genre.slice";
import {AsyncStateEnum} from "../../../enums";
import {SelectGenres} from "../SelectGenres/SelectGenres";
import {SelectSort} from "../SelectSort/SelectSort";
import {IPropsSelect} from "../../../intefaces";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps:IPropsSelect = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Filter: FC = () => {

    const {genres, error, status, id} = useAppSelector(state => state.genreReducer);

    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const category = pathname.includes('category');

    useEffect(() => {
        if (!genres.length) {
            dispatch(getAllGenresThunk())
        }
    }, []);

    return (
        <div className={'movies__list flex'}>

            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}
            {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}
            {status === AsyncStateEnum.fulfilled &&
            <div className={'filter flex'}>
                <SelectSort MenuProps={MenuProps}/>
                <SelectGenres MenuProps={MenuProps}/>
                {id && category &&
                <div className={'filter__return'}>
                    <Link to={'/movies/list'}><h4>Return to the list of films of different genres</h4></Link>
                </div>
                }
            </div>
            }
            <Outlet/>
        </div>
    );
}

export {Filter}





// import React, {FC, useEffect} from 'react';
// import {Link, Outlet, useLocation} from 'react-router-dom';
// // import React, {FC, useEffect, useState} from 'react';
// // import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputLabel from '@mui/material/InputLabel';
// // import MenuItem from '@mui/material/MenuItem';
// // import FormControl from '@mui/material/FormControl';
// // import ListItemText from '@mui/material/ListItemText';
// // import Select, {SelectChangeEvent} from '@mui/material/Select';
// // import Checkbox from '@mui/material/Checkbox';
// import {LinearProgress} from "@mui/material";
//
// import './Filter.css'
// import {useAppDispatch, useAppSelector} from "../../../hooks";
// import {getAllGenresThunk} from "../../../store/slices/genre.slice";
// // import {getAllGenresThunk, getId} from "../../../store/slices/genre.slice";
// import {AsyncStateEnum} from "../../../enums";
// // import {moviesWitchGenre, sortMovies} from "../../../store";
// import {SelectGenres} from "../SelectGenres/SelectGenres";
// import {SelectSort} from "../SelectSort/SelectSort";
// import {IPropsSelect} from "../../../intefaces/propsComponents/propsSelect.interface";
//
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps:IPropsSelect = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };
//
// const Filter: FC = () => {
//
//     // const [genreName, setGenreName] = useState<string>('');
//     // const [checked, setChecked] = useState<boolean>(false);
//     // const [sort, setSort] = useState<string>('');
//
//     const {genres, error, status, id} = useAppSelector(state => state.genreReducer);
//     // const menuSort:string[] = ['A-Z', 'Z-A', 'Top Popular', 'Useless'];
//
//     const dispatch = useAppDispatch();
//     // const navigate = useNavigate();
//
//     const {pathname} = useLocation();
//     const category = pathname.includes('category');
//
//     useEffect(() => {
//         if (!genres.length) {
//             dispatch(getAllGenresThunk())
//         }
//     }, []);
//
//     // useEffect(() => {
//     //     if(!!sort.length && !category) {
//     //         dispatch(sortMovies({sortBy:sort}))
//     //     } else if(!!sort.length && category) {
//     //         dispatch(moviesWitchGenre({sortBy:sort}))
//     //     }
//     // }, [sort]);
//
//     // const handleChangeGenres = (event: SelectChangeEvent<typeof genreName>) => {
//     //     if (!checked) {
//     //         setGenreName(event.target.value);
//     //     }
//     // };
//
//     // const handleChangeSort = (event: SelectChangeEvent<typeof genreName>) => {
//     //     setSort(event.target.value);
//     // };
//
//     // const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     if (!!genreName.length) {
//     //         setChecked(e.target.checked);
//     //         dispatch(getId({genreName:genreName}));
//     //         navigate(`/movies/list/category/${genreName}`);
//     //         setGenreName('')
//     //     } else if (checked) {
//     //         setChecked(e.target.checked);
//     //     }
//     // }
//
//     return (
//         <div className={'movies__list flex'}>
//
//             {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}
//             {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}
//             {status === AsyncStateEnum.fulfilled &&
//             <div className={'filter flex'}>
//                 <SelectSort MenuProps={MenuProps}/>
//                 <SelectGenres MenuProps={MenuProps}/>
//                 {/*<FormControl sx={{m: 1, width: 150}}>*/}
//                 {/*    <InputLabel id='demo-multiple-checkbox-label'>Sort By</InputLabel>*/}
//                 {/*    <Select*/}
//                 {/*        labelId='demo-multiple-checkbox-label'*/}
//                 {/*        id='demo-multiple-checkbox'*/}
//                 {/*        value={sort}*/}
//                 {/*        onChange={handleChangeSort}*/}
//                 {/*        input={<OutlinedInput label='Sort By'/>}*/}
//                 {/*        renderValue={(selected) => selected}*/}
//                 {/*        MenuProps={MenuProps}*/}
//                 {/*    >*/}
//                 {/*        {menuSort.map(select => (*/}
//                 {/*            <MenuItem key={select} value={select}>*/}
//                 {/*                <Checkbox checked={sort.indexOf(select) > -1}/>*/}
//                 {/*                <ListItemText primary={select}/>*/}
//                 {/*            </MenuItem>*/}
//                 {/*        ))}*/}
//                 {/*    </Select>*/}
//                 {/*</FormControl>*/}
//
//                 {/*<FormControl sx={{m: 1, width: 300}}>*/}
//                 {/*    <InputLabel id='demo2-multiple-checkbox-label'>Genres</InputLabel>*/}
//                 {/*    <Select*/}
//                 {/*        labelId='demo2-multiple-checkbox-label'*/}
//                 {/*        id='demo2-multiple-checkbox'*/}
//                 {/*        value={genreName}*/}
//                 {/*        onChange={handleChangeGenres}*/}
//                 {/*        input={<OutlinedInput label='Genres'/>}*/}
//                 {/*        renderValue={(selected) => selected}*/}
//                 {/*        MenuProps={MenuProps}*/}
//                 {/*    >*/}
//                 {/*        {genres.map((genre) => (*/}
//                 {/*            <MenuItem key={genre.id} value={genre.name}>*/}
//                 {/*                <Checkbox checked={genreName.indexOf(genre.name) > -1}/>*/}
//                 {/*                <ListItemText primary={genre.name}/>*/}
//                 {/*            </MenuItem>*/}
//                 {/*        ))}*/}
//                 {/*    </Select>*/}
//                 {/*</FormControl>*/}
//                 {/*<Checkbox checked={checked} onChange={handleClickCheckBox} inputProps={{'aria-label': 'controlled'}}/>*/}
//                 {id && category &&
//                 <div className={'filter__return'}>
//                     <Link to={'/movies/list'}><h4>Return to the list of films of different genres</h4></Link>
//                 </div>
//                 }
//             </div>
//             }
//
//             <Outlet/>
//         </div>
//     );
// }
//
// export {Filter}
