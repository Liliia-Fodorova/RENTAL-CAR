import CarCard from "@/components/CarCard/CarCard";
import type { Car } from "@/types/car";
import css from "./CarList.module.css"


interface CarListProps{
    cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
    return (
        <ul className={css.carList}>
            {cars.map((car) => (
                <li className={css.carItem} key={car.id}>
                    <CarCard car={car} />
                </li>    
            ))}
        </ul>
    );
}