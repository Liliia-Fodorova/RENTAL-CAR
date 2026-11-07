import type {Metadata} from "next";
import Hero from "@/components/Hero/Hero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Find your perfect rental car with RentalCar. Browse our selection of vehicles and start your next adventure.",
};

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}