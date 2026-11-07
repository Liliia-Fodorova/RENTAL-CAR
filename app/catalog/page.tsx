import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient/CatalogClient";

export const metadata: Metadata = {
  title: "Car Catalog",
  description:
    "Browse rental cars by brand, price, and mileage. Compare available vehicles and find the right car for your journey.",
};

export default function CatalogPage() {
  return (
    <main>
      <CatalogClient />
    </main>
  );
}