import { api } from "./api";
import { CarsResponse } from "@/types/car";


export interface CarsParams{
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
    page?: number;
    perPage?: number;
}

export const fetchCars = async (
    params: CarsParams = {}
): Promise<CarsResponse> => {
    const { data } = await api.get<CarsResponse>("/cars", {
        params,
        
    });
    return data;
};