import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/types/car";



interface CarCardProps{
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    return (
        <article>
            <Image
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={276}
                height={268}
            />
        
            <div>
                <h3>
                    {car.brand} {car.model}, {car.year}
                </h3>

                <p>${car.rentalPrice}</p>
            </div>

            <div>
                <p>
                    {car.location.city} | {car.location.country} |{" "}
                    {car.rentalCompany}
                </p>

                <p>
                    {car.type} | {car.mileage.toLocaleString("en-us")} км
                </p>
            </div>

            <Link href={`/catalog/${car.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Read more
            </Link>
        </article>
    );
}