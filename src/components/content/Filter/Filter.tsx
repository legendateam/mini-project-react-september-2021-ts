import React, {FC, useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {LinearProgress} from "@mui/material";

import './Filter.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllGenresThunk, getId} from "../../../store/slices/genre.slice";
import {AsyncStateEnum} from "../../../enums";

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

    const [movieName, setMovieName] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);

    const {genres,error, status, id} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(!genres.length) {
            dispatch(getAllGenresThunk())
        }
    },[]);

    const handleChange = (event: SelectChangeEvent<typeof movieName>) => {
        if(!checked) {
            setMovieName(event.target.value);
        }
    };

    const handleClick = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!!movieName.length) {
            setChecked(e.target.checked);
            dispatch(getId(movieName))
            setMovieName('');
        } else if (checked) {
            setChecked(e.target.checked);
        }
    }

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
                        renderValue={(selected) => selected}
                        MenuProps={MenuProps}
                    >
                    </Select>
                </FormControl>

                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id='demo2-multiple-checkbox-label'>Genres</InputLabel>
                    <Select
                        labelId='demo2-multiple-checkbox-label'
                        id='demo2-multiple-checkbox'
                        value={movieName}
                        onChange={handleChange}
                        input={<OutlinedInput label='Genres'/>}
                        renderValue={(selected) => selected}
                        MenuProps={MenuProps}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.name}>
                                <Checkbox checked={movieName.indexOf(genre.name) > -1}/>
                                <ListItemText primary={genre.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Checkbox checked={checked} onChange={handleClick} inputProps={{ 'aria-label': 'controlled' }}/>
                {id && <Link to={`list/category/${id.toString()}`} state={id}><button>go </button></Link>}
            </div>
            }

            <Outlet/>
        </div>
    );
}

export {Filter}
