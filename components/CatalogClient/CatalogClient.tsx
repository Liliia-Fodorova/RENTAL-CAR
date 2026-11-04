"use client";

import { fetchCars } from "@/lib/api/cars";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function CatalogClient() {
    const {
        data,
        isPending,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["cars"],
        initialPageParam: 1,

        queryFn: ({ pageParam }) =>
            fetchCars({
                page: pageParam,
                perPage: 12,
            }),
        
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            }

            return undefined;
        },
    });

    if (isPending) {
        return <p>Loading cars...</p>
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    const cars = data.pages.flatMap((page) => page.cars);

    return (
        <section>
            <h1>Car catalog</h1>
            <p>Total loaded cars: {cars.length}</p>
            
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        {car.brand}{car.model} - ${car.rentalPrice}
                    </li>
                ))}
            </ul>

            {hasNextPage && (
                <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
            )}
        </section>
    );
}