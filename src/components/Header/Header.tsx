import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {Switch} from "@mui/material";

import './Header.css';
import Logo from "./Logo/Logo";


const Header:FC = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked)
    }

    return (
        <header className={'header'}>
            <ul className={'header__ul flex'}>
                <li><Logo/></li>
                <li>
                    <ul className={'header__ul_child-ul flex'}>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/'}>Movies</Link></li>
                    </ul>
                </li>
                <li>
                    <span className={'header__ul_child-checked'}>
                        Dark theme:
                        {!checked? 'OFF': 'ON'}
                    </span>
                    <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}/>
                </li>
            </ul>
        </header>
    );
};

export {Header};