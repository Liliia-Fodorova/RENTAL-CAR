import { fetchCarById } from "@/lib/api/cars";
import CarDetails from "@/components/CarDetails/CarDetails";
import { notFound } from "next/navigation";


interface CarDetailsPageProps {
  params: Promise<{
    carId: string;
  }>;
}

export default async function CarDetailsPage({
  params,
}: CarDetailsPageProps) {
  const { carId } = await params;

  const car = await fetchCarById(carId);

  if (!car) {
    notFound();
  }

  return (
      <main>
          <CarDetails car={car} />
      {/* <h1>
        {car.brand} {car.model}, {car.year}
      </h1>

      <p>Price: {car.rentalPrice}</p>

      <p>
        Location: {car.location.city}, {car.location.country}
      </p>

      <p>Mileage: {car.mileage.toLocaleString("en-US")} km</p>

      <p>{car.description}</p> */}
    </main>
  );
}