"use client";

import { useState } from "react";
import { fetchCars } from "@/lib/api/cars";
import { useInfiniteQuery } from "@tanstack/react-query";
import CarList from "../CarList/CarList";
import Filters, {
  type FilterValues,
} from "@/components/Filters/Filters";
import EmptyState from "../EmptyState/EmptyState";
import CatalogLoader from "../CatalogLoader/CatalogLoader";

import css from "./CatalogClient.module.css";


export default function CatalogClient() {
    const [filters, setFilters] = useState<FilterValues>({});
    const [resetKey, setResetKey] = useState(0);


    const {
        data,
        isPending,
        isError,
        error,
        isFetching,
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

    function handleReset() {
        setFilters({});
        setResetKey((prev) => prev + 1);
    }

    return (
        <section className={css.catalog}>

            <Filters
                key={resetKey}
                onSearch={setFilters}
            />
           
             <div className={css.results}>
        {isError ? (
          <p className={css.message}>
            Error: {error.message}
          </p>
        ) : (
          <>
            {cars.length > 0 && (<CarList cars={cars} />)}

            {!isPending && cars.length === 0 && (
              <EmptyState onReset={handleReset} />
            )}

            {!isPending && cars.length > 0 && hasNextPage && (
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

            {isFetching && <CatalogLoader />}
          </>
        )}
      </div>
    </section>
  );
}