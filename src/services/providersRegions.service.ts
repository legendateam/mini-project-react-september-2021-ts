import axiosInstance from './axios.cervice';
import {urls} from '../configs';
import {IProvidersRegionsService} from '../intefaces/servicesIntefaces/providersRegionsService.interface';

const providersRegionsServices = {
    getAll: ()=> axiosInstance.get<IProvidersRegionsService>(`${urls.watch}${urls.providers}${urls.regions}${urls.key}`)
}

export {providersRegionsServices}