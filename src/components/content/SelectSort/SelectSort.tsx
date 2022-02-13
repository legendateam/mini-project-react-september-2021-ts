import React, {FC, useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {sortMoviesWithGenre, sortMovies} from '../../../store';
import {useLocation, useSearchParams} from 'react-router-dom';
import {IMenuProps} from '../../../intefaces';

const SelectSort: FC<IMenuProps> = ({MenuProps}) => {

    const {pageQ} = useAppSelector(state => state.moviesReducer);
    const {movies,moviesWithGenre} = useAppSelector(state => state.moviesReducer);

    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {pathname} = useLocation();

    const category = pathname.includes('category');
    const sortQuery = query.get('sort');

    const [sort, setSort] = useState<string>('');

    const menuSort: string[] = ['A-Z', 'Z-A', 'Top Popular', 'Useless'];
    useEffect(() => {
        if (!!sort.length && !category && !pageQ) {
            dispatch(sortMovies({sortBy: sort}))
            console.log('aaaaaaaaaaaaaaaaaa')
            setQuery({sort:sort})
        } else if (!!sort.length && !category && pageQ) {
            dispatch(sortMovies({sortBy: sort}))
            console.log('dupa')
            setQuery({sort:sort, page: pageQ.toString()})
        }

        if (!!sort.length && category && !pageQ) {
            dispatch(sortMoviesWithGenre({sortBy: sort}))
            console.log('bbbbbbbbbbbbbbb')
        } else if (!!sort.length && category && pageQ) {
            dispatch(sortMoviesWithGenre({sortBy: sort}))
            console.log('pizda')
            setQuery({sort:sort, page: pageQ.toString()})
        }

        if(!movies.length && !category && !sort.length && sortQuery && !pageQ) {
            setSort(sortQuery)
            dispatch(sortMovies({sortBy: sort}))
            setQuery({sort:sort})
            console.log('eeeeeeeeeeeeeeee')
        } else if(!moviesWithGenre.length && category && !sort.length && sortQuery && !pageQ) {
            setSort(sortQuery)
            dispatch(sortMoviesWithGenre({sortBy: sort}))
            setQuery({sort:sort})
            console.log('ddddddddddddddddddddd')
        }   else if(!movies.length && !category && !sort.length && sortQuery && pageQ) {
            setSort(sortQuery)
            dispatch(sortMovies({sortBy: sort}))
            setQuery({sort:sort, page: pageQ.toString()})
            console.log('eeeeeeeeeeeeeeee')
        } else if(!moviesWithGenre.length && category && !sort.length && sortQuery && pageQ) {
            setSort(sortQuery)
            dispatch(sortMoviesWithGenre({sortBy: sort}))
            setQuery({sort:sort, page: pageQ.toString()})
            console.log('ddddddddddddddddddddd')
        }

    }, [sort,movies,moviesWithGenre]);

    const handleChangeSort = (event: SelectChangeEvent<string>) => {
        setSort(event.target.value);
        if(!pageQ){
            setQuery({sort:event.target.value})
        }
        if(pageQ) {
            setQuery({page:pageQ.toString(), sort:event.target.value})
        }
    };
    console.log(sortQuery);

    return (
        <FormControl sx={{m: 1, width: 150}}>
            <InputLabel id='demo-multiple-checkbox-label'>Sort By</InputLabel>
            <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                value={sort}
                onChange={handleChangeSort}
                input={<OutlinedInput label='Sort By'/>}
                renderValue={(selected) => selected}
                MenuProps={MenuProps}
            >
                {menuSort.map(select => (
                    <MenuItem key={select} value={select}>
                        <Checkbox checked={sort.indexOf(select) > -1}/>
                        <ListItemText primary={select}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export {SelectSort};