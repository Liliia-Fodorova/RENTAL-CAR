import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";


export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoRental}>Rental</span>
                    <span className={styles.logoCar}>Car</span>
                </Link>
                
                <div className={styles.actions}>
                <nav className={styles.nav}>
                    <Link href="/">Home</Link>
                    <Link href="/catalog">Catalog</Link>

                    </nav>
                    <ThemeToggle/>
                </div>    
            </div>
        </header>
    );
}