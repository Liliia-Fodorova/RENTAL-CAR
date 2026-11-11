import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/types/car";
import css from "./CarCard.module.css";



interface CarCardProps{
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    return (
        <article className={css.card}>
            <Image
                className={css.image}
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={276}
                height={268}
            />
        
            <div className={css.titleRow}>
                <h3 className={css.title}>
                    {car.brand} <span className={ css.model}>{car.model}</span>,{" "} {car.year}
                </h3>

                <p className={css.price}>${car.rentalPrice}</p>
            </div>

            <div className={css.details}>
                <p className={css.detailsRow}>
                    <span>{car.location.city}</span>
                    <span>{car.location.country}</span>
                    <span>{car.rentalCompany}</span>
                </p>

                <p className={css.detailsRow}>
                    <span>{car.type}</span>
                    <span>{car.mileage.toLocaleString("uk-UA")} км</span>
                </p>
            </div>

            <Link
                className={css.button}
                href={`/catalog/${car.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Read more
            </Link>
        </article>
    );
}