import React, {FC, useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import './Filter.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllGenresThunk} from "../../../store/slices/genre.slice";
import {AsyncStateEnum} from "../../../enums";
import {LinearProgress} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Filter: FC = () => {

    const [movieName, setMovieName] = useState<string[]>([]);

    const {genres,error, status} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(!genres.length) {
            dispatch(getAllGenresThunk())
        }
    },[]);

    const handleChange = (event: SelectChangeEvent<typeof movieName>) => {
        const {
            target: {value},
        } = event;
        setMovieName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className={'movies__list flex'}>

            {status === AsyncStateEnum.pending && <LinearProgress className={'LinearProgress'}/>}
            {status === AsyncStateEnum.rejected && <h1 className={'reject__error'}>{error}</h1>}
            {status === AsyncStateEnum.fulfilled &&
            <div className={'filter flex'}>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id='demo-multiple-checkbox-label'>Sort By Popular</InputLabel>
                    <Select
                        labelId='demo-multiple-checkbox-label'
                        id='demo-multiple-checkbox'
                        multiple
                        onChange={handleChange}
                        input={<OutlinedInput label='Sort By Popular'/>}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                    </Select>
                </FormControl>

                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id='demo2-multiple-checkbox-label'>Genres</InputLabel>
                    <Select
                        labelId='demo2-multiple-checkbox-label'
                        id='demo2-multiple-checkbox'
                        multiple
                        value={movieName}
                        onChange={handleChange}
                        input={<OutlinedInput label='Genres'/>}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.name}>
                                <Checkbox checked={movieName.indexOf(genre.name) > -1}/>
                                <ListItemText primary={genre.name}/>
                            </MenuItem>
                        ))}
                        <button>SAVE</button>
                    </Select>
                </FormControl>
            </div>
            }


            <Outlet/>
        </div>
    );
}

export {Filter}