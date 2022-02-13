import axiosInstance from "./axios.service";
import {urls} from "../configs";
import {ICredits} from "../intefaces";

const creditsService = {
    getAll: (id:number) => axiosInstance.get<ICredits>(`${urls.movie}/${id}${urls.credits}${urls.key}`)
}

export {creditsService}