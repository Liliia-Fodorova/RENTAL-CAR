"use client";

import { useState, type SubmitEvent  } from "react";
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

export default function Filters({ onSearch }: FiltersProps) {
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [minMileage, setMinMileage] = useState("");
    const [maxMileage, setMaxMileage] = useState("");

    function handleSearch(event: SubmitEvent <HTMLFormElement>) {
        event.preventDefault();
    

        onSearch({
            brand: brand.trim() || undefined,
            price: price ? Number(price) : undefined,
            minMileage: minMileage ? Number(minMileage) : undefined,
            maxMileage: maxMileage ? Number(maxMileage) : undefined,
        });
    };

    function handleClear() {
        setBrand("");
        setPrice("");
        setMinMileage("");
        setMaxMileage("");
        onSearch({});
    };

    return (
        <form
            onSubmit={handleSearch}
            className={css.filters}
        >
            <div className={css.field}>
                <label htmlFor="brand" className={css.label}>Car brand</label>
                <input
                    id="brand"
                    className={`${css.input} ${css.brand}`}
                    type="text"
                    placeholder="Choose a brand"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                />
            </div>

            <div className={css.field}>
                <label htmlFor="price" className={css.label}>Price / 1 hour</label>
                <select
                    id="price"
                    className={`${css.select} ${css.price}`}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}>
                    <option value="">Choose a price</option>
                    {[30, 40, 50, 60, 70, 80].map((value) => (
                        <option key={value} value={value}>
                            ${value}
                        </option>
                    ))}
                </select>
            </div>

            <div className={css.field}>
                <label
                    htmlFor="minMileage"
                    className={css.label}>
                    Car mileage
                </label>
                <input
                    id="minMileage"
                    className={`${css.input} ${css.mileage}`}
                    type="number"
                    min="0"
                    placeholder="From"
                    value={minMileage}
                    onChange={(event) => setMinMileage(event.target.value)}
                />
            </div>

            <div className={css.field}>
                <label
                    htmlFor="maxMileage"
                    className={css.label}
                >
                    Car mileage / км

                </label>
                <input
                    id="maxMileage"
                    className={`${css.input} ${css.mileage}`}
                    type="number"
                    min="0"
                    placeholder="To"
                    value={maxMileage}
                    onChange={(event) => setMaxMileage(event.target.value)}
                />
            </div>

            <div className={css.actions}>
                <button
                    type="submit"
                    className={css.searchButton}>
                    Search
                </button>

                <button
                    type="button"
                    className={css.clearButton} onClick={handleClear}
                >
                    Clear filters
                </button>
            </div>

        </form>
    );

}