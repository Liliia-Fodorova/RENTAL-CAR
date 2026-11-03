import Link from "next/link";
import styles from "./Header.module.css";


export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    RentalCar
                </Link>

                <nav className={styles.nav}>
                    <Link href="/">Home</Link>
                    <Link href="/catalog">Catalog</Link>

                </nav>
            </div>
        </header>
    );
}