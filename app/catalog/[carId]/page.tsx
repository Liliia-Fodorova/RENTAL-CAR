import type { Metadata } from "next";
import { fetchCarById } from "@/lib/api/cars";
import CarDetails from "@/components/CarDetails/CarDetails";
import { notFound } from "next/navigation";


interface CarDetailsPageProps {
  params: Promise<{
    carId: string;
  }>;
}


export async function generateMetadata({
  params,
}: CarDetailsPageProps): Promise<Metadata> {
  const { carId } = await params;

  const car = await fetchCarById(carId);

  if (!car) {
    return {
      title: "Car Not Found",
      description: "The requested car could not be found.",
    };
  }

  return {
    title: `${car.brand} ${car.model} ${car.year}`,
    description: `Explore the ${car.brand} ${car.model} ${car.year} available for rent. View car specifications and submit a booking request with RentalCar.`,
  };
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
    </main>
  );
}