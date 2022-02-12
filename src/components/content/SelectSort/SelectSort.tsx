import React, {FC, useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';

import {useAppDispatch} from '../../../hooks';
import {sortMoviesWithGenre, sortMovies} from '../../../store';
import {useLocation, useSearchParams} from 'react-router-dom';
import {IMenuProps} from '../../../intefaces';

const SelectSort: FC<IMenuProps> = ({MenuProps}) => {

    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {pathname} = useLocation();
    const category = pathname.includes('category');

    const [sort, setSort] = useState<string>('');
    const menuSort: string[] = ['A-Z', 'Z-A', 'Top Popular', 'Useless'];

    useEffect(() => {
        if (!!sort.length && !category) {
            dispatch(sortMovies({sortBy: sort}))
        } else if (!!sort.length && category) {
            dispatch(sortMoviesWithGenre({sortBy: sort}))
        }
    }, [sort]);

    const handleChangeSort = (event: SelectChangeEvent<string>) => {
        setSort(event.target.value);
        setQuery({sort:event.target.value})
    };

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