import { api } from "./api";
import type { Car, CarsResponse } from "@/types/car";


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

export const fetchCarById = async (id: string): Promise<Car> => {
    const { data } = await api.get<Car>(`/cars/${id}`);

    return data;
}

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

export interface BookingResponse {
  message: string;
}

export const createBookingRequest = async (
  carId: string,
  booking: BookingRequest
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    booking
  );

  return data;
};

export interface CarFiltersResponse {
    brands: string[];
    price: {
        min: number;
        max: number;
    };
}

export const fetchCarFilters = async (): Promise<CarFiltersResponse> => {
    const { data } = await api.get<CarFiltersResponse>("/cars/filters");

    return data;
}