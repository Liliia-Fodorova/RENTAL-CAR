"use client";

import { useState } from "react";
import { fetchCars } from "@/lib/api/cars";
import { useInfiniteQuery } from "@tanstack/react-query";
import CarList from "../CarList/CarList";
import Filters, {
  type FilterValues,
} from "@/components/Filters/Filters";
import css from "./CatalogClient.module.css";


export default function CatalogClient() {
    const [filters, setFilters] = useState<FilterValues>({});


    const {
        data,
        isPending,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["cars", filters],
        initialPageParam: 1,

        queryFn: ({ pageParam }) =>
            fetchCars({
                ...filters,
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

    const cars = data?.pages.flatMap((page) => page.cars) ?? [];

    return (
        <section className={css.catalog}>

            <Filters onSearch={setFilters} />
           
            {isPending ? (
                <p className={css.message}>Loading cars...</p>
            ) : isError ? (
                <p className={css.message}>Error: {error.message}</p>
            ) : (
                <>
                            
                    {cars.length === 0 ? (
                        <p className={css.message}>No cars found. Try changing your filters.</p>
                    ) : (
                      <CarList cars={cars} />
                    )}
                            
                    {hasNextPage && (
                        <div className={css.loadMoreWrapper}>
                            <button
                            className={css.loadMoreButton}
                            type="button"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                           >
                            {isFetchingNextPage ? "Loading..." : "Load More"}
                           </button>
                        </div>        
                    )}
                </>
            )}
        </section>
    );
}