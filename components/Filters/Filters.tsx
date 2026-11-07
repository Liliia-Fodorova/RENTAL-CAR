"use client";

import { useState, type SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import Select, { type StylesConfig } from "react-select";
import toast from "react-hot-toast";
import { fetchCarFilters } from "@/lib/api/cars";
import css from "./Filters.module.css";

export interface FilterValues {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

interface FiltersProps {
  onSearch: (filters: FilterValues) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    height: 44,
    border: state.isFocused
      ? "1px solid var(--filter-focus, #00aad4)"
      : "1px solid transparent",
    borderRadius: 12,
    backgroundColor: "var(--filter-bg, #ffffff)",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "var(--filter-focus, #00aad4)",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--filter-text, #101828)",
    fontSize: 16,
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--filter-text, #101828)",
    fontSize: 16,
    fontWeight: 500,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "0 12px",
    color: "var(--filter-text, #101828)",
    transform: state.selectProps.menuIsOpen
      ? "rotate(180deg)"
      : "rotate(0deg)",
    transition: "transform 0.2s ease",
    "&:hover": {
      color: "var(--filter-text, #101828)",
    },
  }),

  menu: (base) => ({
    ...base,
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: "var(--filter-bg, #ffffff)",
    boxShadow: "0 4px 36px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    zIndex: 20,
  }),

  menuList: (base) => ({
    ...base,
    padding: "8px 0",
    scrollbarWidth: "thin",
  }),

  option: (base, state) => ({
    ...base,
    padding: "4px 16px",
    backgroundColor: state.isFocused
      ? "var(--filter-hover, #f2f4f7)"
      : "transparent",
    color: state.isSelected
      ? "var(--filter-text, #101828)"
      : "var(--filter-muted, #8d929a)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "20px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "var(--filter-hover, #f2f4f7)",
    },
  }),
};

export default function Filters({ onSearch }: FiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const {
    data: filterOptions,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["carFilters"],
    queryFn: fetchCarFilters,
    staleTime: 1000 * 60 * 30,
  });

  const brandOptions: SelectOption[] =
    filterOptions?.brands.map((item) => ({
      value: item,
      label: item,
    })) ?? [];

  const minPrice = filterOptions
    ? Math.ceil(filterOptions.price.min / 10) * 10
    : 0;

  const maxPrice = filterOptions
    ? filterOptions.price.max
    : 0;

  const prices =
    filterOptions && minPrice <= maxPrice
      ? Array.from(
          {
            length:
              Math.floor((maxPrice - minPrice) / 10) + 1,
          },
          (_, index) => minPrice + index * 10
        )
      : [];

  const priceOptions: SelectOption[] = prices.map(
    (value) => ({
      value: String(value),
      label: String(value),
    })
  );

  const selectedBrand =
    brandOptions.find((option) => option.value === brand) ??
    null;

  const selectedPrice =
    priceOptions.find((option) => option.value === price) ??
    null;

 function handleSearch(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const min = minMileage === "" ? undefined : Number(minMileage);
  const max = maxMileage === "" ? undefined : Number(maxMileage);

  
  if (
    (min !== undefined && (!Number.isFinite(min) || min < 0)) ||
    (max !== undefined && (!Number.isFinite(max) || max < 0))
  ) {
    toast.error("Mileage must be zero or greater.");
    return;
  }

  
  if (
    min !== undefined &&
    max !== undefined &&
    min > max
  ) {
    toast.error(
      "Minimum mileage cannot exceed maximum mileage."
    );
    return;
  }

  
  onSearch({
    brand: brand.trim() || undefined,
    price: price ? Number(price) : undefined,
    minMileage: min,
    maxMileage: max,
  });
}

  function handleClear() {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    onSearch({});
  }

  return (
    <form className={css.filters} onSubmit={handleSearch}>
      {/* BRAND */}
      <div className={css.field}>
        <label htmlFor="brand" className={css.label}>
          Car brand
        </label>

        <Select<SelectOption, false>
          inputId="brand"
          instanceId="brand-select"
          className={css.brand}
          styles={selectStyles}
          options={brandOptions}
          value={selectedBrand}
          onChange={(option) =>
            setBrand(option?.value ?? "")
          }
          placeholder={
            isPending
              ? "Loading brands..."
              : isError
                ? "Failed to load brands"
                : "Choose a brand"
          }
          isDisabled={isPending || isError}
          isSearchable={false}
          isClearable={false}
          maxMenuHeight={272}
          noOptionsMessage={() => "No brands found"}
        />
      </div>

      {/* PRICE */}
      <div className={css.field}>
        <label htmlFor="price" className={css.label}>
          Price / 1 hour
        </label>

        <Select<SelectOption, false>
          inputId="price"
          instanceId="price-select"
          className={css.price}
          styles={selectStyles}
          options={priceOptions}
          value={
            selectedPrice
              ? {
                  ...selectedPrice,
                  label: `To $${selectedPrice.value}`,
                }
              : null
          }
          onChange={(option) =>
            setPrice(option?.value ?? "")
          }
          placeholder="Choose a price"
          isDisabled={isPending || isError}
          isSearchable={false}
          isClearable={false}
          maxMenuHeight={188}
          noOptionsMessage={() => "No prices found"}
        />
      </div>

      {/* MILEAGE */}
      <div className={css.field}>
        <span className={css.label}>Car mileage / km</span>

        <div className={css.mileageGroup}>
          <input
            id="minMileage"
            className={`${css.input} ${css.mileageFrom}`}
            type="number"
            min="0"
            placeholder="From"
            aria-label="Minimum mileage"
            value={minMileage}
            onChange={(event) =>
              setMinMileage(event.target.value)
            }
          />

          <input
            id="maxMileage"
            className={`${css.input} ${css.mileageTo}`}
            type="number"
            min="0"
            placeholder="To"
            aria-label="Maximum mileage"
            value={maxMileage}
            onChange={(event) =>
              setMaxMileage(event.target.value)
            }
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className={css.actions}>
        <button
          type="submit"
          className={css.searchButton}
        >
          Search
        </button>

        <button
          type="button"
          className={css.clearButton}
          onClick={handleClear}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}