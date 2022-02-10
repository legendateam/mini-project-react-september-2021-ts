import axiosInstance from "./axios.cervice";
import {urls} from "../configs";
import {IMovie} from "../intefaces";

const moviesService = {
    getAll: ()=> axiosInstance.get<IMovie>(`${urls.discover}${urls.movie}${urls.key}`)
};

export {moviesService}