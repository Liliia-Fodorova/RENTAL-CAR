import css from "./CatalogLoader.module.css";

export default function CatalogLoader() {
  return (
    <div className={css.overlay} role="status" aria-live="polite">
      <div className={css.loader}>
        <div className={css.spinner} />

        <h2 className={css.title}>Loading cars...</h2>

        <p className={css.description}>
          Please wait while we fetch the best
          <br />
          cars for you
        </p>
      </div>
    </div>
  );
}