import React, {FC,useState} from 'react';
import {useNavigate} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getId} from "../../../store/slices/genre.slice";
import {IMenuProps} from "../../../intefaces";

const SelectGenres:FC<IMenuProps> = ({MenuProps}) => {

    const {genres} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [genreName, setGenreName] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);

    const handleChangeGenres = (event: SelectChangeEvent<typeof genreName>) => {
        if (!checked) {
            setGenreName(event.target.value);
        }
    };

    const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!!genreName.length) {
            setChecked(e.target.checked);
            dispatch(getId({genreName: genreName}));
            navigate(`/movies/list/category/${genreName}`);
            setGenreName('')
        } else if (checked) {
            setChecked(e.target.checked);
        }
    }

    return (
       <>
           <FormControl sx={{m: 1, width: 300}}>
               <InputLabel id='demo2-multiple-checkbox-label'>Genres</InputLabel>
               <Select
                   labelId='demo2-multiple-checkbox-label'
                   id='demo2-multiple-checkbox'
                   value={genreName}
                   onChange={handleChangeGenres}
                   input={<OutlinedInput label='Genres'/>}
                   renderValue={(selected) => selected}
                   MenuProps={MenuProps}
               >
                   {genres.map((genre) => (
                       <MenuItem key={genre.id} value={genre.name}>
                           <Checkbox checked={genreName.indexOf(genre.name) > -1}/>
                           <ListItemText primary={genre.name}/>
                       </MenuItem>
                   ))}
               </Select>
           </FormControl>
           <Checkbox checked={checked} onChange={handleClickCheckBox} inputProps={{'aria-label': 'controlled'}}/>
       </>
    );
};

export {SelectGenres};