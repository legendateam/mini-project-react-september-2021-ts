import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Switch} from '@mui/material';

import './Header.css';
import Logo from '../styles/Logo/Logo';
import {useAppDispatch, useAppSelector} from "../../hooks";
import { setChecked} from "../../store";

const Header: FC = () => {
    const {checked,NightHeader} = useAppSelector(state => state.toggleThemeReducer);
    const dispatch = useAppDispatch();

    const handleChange = () => {
        dispatch(setChecked({checked:!checked}))
    }

    return (
        <header className={`header ${NightHeader}`}>
            <ul className={'header__ul flex'}>
                <Link to={'/'}><li><Logo/></li></Link>

                <li>
                    <ul className={'header__ul_child-ul flex'}>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'movies/list'}>Movies</Link></li>
                    </ul>
                </li>

                <li>
                    <span className={'header__ul_child-checked'}>
                        Dark theme:
                        {!checked ? 'OFF' : 'ON'}
                    </span>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'controlled'}}/>
                </li>

            </ul>
        </header>
    );
};

export {Header};