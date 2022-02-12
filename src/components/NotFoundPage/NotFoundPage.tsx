import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';

import './NotFoundPage.css'

const NotFoundPage:FC = () => {
    return (
        <div className={'notFoundPage flex'}>
            <h1>Not Found Page</h1>
            <Link to={'/'}>
                <Button variant="contained" color="error">go to home</Button>
            </Link>
        </div>
    );
};

export {NotFoundPage};