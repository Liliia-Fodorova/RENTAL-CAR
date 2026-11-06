import Image from "next/image";
import css from "./EmptyState.module.css";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.emptyState}>
      <Image
        src="/images/no-cars.jpg"
        alt="No cars found"
        width={414}
        height={388}
        className={css.illustration}
      />

      <h2 className={css.title}>No cars found</h2>

      <p className={css.description}>
        We couldn&apos;t find any cars that match your current filters.
        Try changing your search criteria or reset the filters.
      </p>

      <button
        type="button"
        className={css.resetButton}
        onClick={onReset}
      >
        Reset filters
      </button>
    </div>
  );
}