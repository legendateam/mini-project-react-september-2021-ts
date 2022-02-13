import axios from 'axios';

import baseURL from '../configs/urls';

const axiosInstance = axios.create({baseURL});

export default axiosInstance
