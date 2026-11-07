"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchCars } from "@/lib/api/cars";
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
    isFetchNextPageError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
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
      const currentPage = Number(lastPage.page);
      const totalPages = Number(lastPage.totalPages);

      if (
        !Number.isFinite(currentPage) ||
        !Number.isFinite(totalPages)
      ) {
        console.warn("Invalid pagination response:", lastPage);
        return undefined;
      }

      return currentPage < totalPages
        ? currentPage + 1
        : undefined;
    },
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  function handleSearch(nextFilters: FilterValues) {
    setFilters(nextFilters);
  }

  function handleReset() {
    setFilters({});
    setResetKey((prev) => prev + 1);
  }

  return (
    <section className={css.catalog}>
      <Filters
        key={resetKey}
        onSearch={handleSearch}
      />

      <div className={css.results}>
        {isPending ? (
          <CatalogLoader />
        ) : isError && cars.length === 0 ? (
          <div className={css.message} role="alert">
            <p>
              Failed to load cars: {error.message}
            </p>

            <button
                type="button"
                className={css.retryButton}
                onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {cars.length > 0 && <CarList cars={cars} />}

            {cars.length === 0 && (
              <EmptyState onReset={handleReset} />
            )}

            {isFetchNextPageError && (
              <p className={css.message} role="alert">
                Failed to load more cars. Please try again.
              </p>
            )}

           {cars.length > 0 && (
            <div className={css.loadMoreWrapper}>
              {hasNextPage ? (
              <button
                className={css.loadMoreButton}
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
               {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
          ) : (
              <button
                className={css.backToTopButton}
                type="button"
                onClick={() => {
                  window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                 });
               }}
              >
               ↑ Back to top
              </button>
             )}
            </div>
            )}

            {isFetching &&
              !isFetchingNextPage &&
              <CatalogLoader />}
          </>
        )}
      </div>
    </section>
  );
}