import Image from "next/image";
import {
  FiMapPin,
  FiCheckCircle,
  FiCalendar,
  FiTruck,
  FiSettings,
} from "react-icons/fi";
import { BsFuelPump } from "react-icons/bs";
import { MdOutlineSpeed } from "react-icons/md";
import RentalForm from "@/components/RentalForm/RentalForm";
import type { Car } from "@/types/car";
import css from "./CarDetails.module.css";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <section className={css.details}>
      <div className={css.leftColumn}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          className={css.carImage}
        />
              
        <RentalForm carId={car.id} />
      </div>

      <div className={css.rightColumn}>
        <div className={css.heading}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>

          <span className={css.article}>
            Article: {car.id.slice(0, 4)}
          </span>
        </div>

        <p className={css.location}>
          <FiMapPin aria-hidden="true" />
          {car.location.city}, {car.location.country}
        </p>

        <p className={css.price}>
          ${car.rentalPrice}
        </p>

        <p className={css.description}>
          {car.description}
        </p>

        <div className={css.infoSection}>
          <h2>Rental Conditions:</h2>

          <ul>
            {car.rentalConditions.map((condition) => (
              <li key={condition}>
                <FiCheckCircle aria-hidden="true" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.infoSection}>
          <h2>Car Specifications:</h2>

          <ul>
            <li>
              <FiCalendar aria-hidden="true" />
              <span>Year: {car.year}</span>
            </li>

            <li>
              <FiTruck aria-hidden="true" />
              <span>Type: {car.type}</span>
            </li>

            <li>
              <BsFuelPump aria-hidden="true" />
              <span>Fuel Consumption: {car.fuelConsumption}</span>
            </li>

            <li>
              <FiSettings aria-hidden="true" />
              <span>Engine: {car.engine}</span>
            </li>

            <li>
              <MdOutlineSpeed aria-hidden="true" />
              <span>
                Mileage: {car.mileage.toLocaleString("en-US")} km
              </span>
            </li>
          </ul>
        </div>

        <div className={css.infoSection}>
          <h2>Features</h2>

          <ul>
            {car.features.map((feature) => (
              <li key={feature}>
                <FiCheckCircle aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}