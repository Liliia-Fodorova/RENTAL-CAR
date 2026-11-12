"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";
import Image from "next/image";


export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                     <Image
                        src="/images/Logo.svg"
                        alt="RentalCar"
                        width={104}
                        height={16}
                        priority
                    />
                </Link>
                
                <div className={styles.actions}>
                <nav className={styles.nav}>
                        <Link
                            href="/"
                            className={pathname === "/" ? styles.active : ""}
                        >
                            Home
                        </Link>

                        <Link
                            href="/catalog"
                            className={pathname.startsWith("/catalog") ? styles.active : ""}
                        >
                            Catalog
                        </Link>

                    </nav>
                    <ThemeToggle/>
                </div>    
            </div>
        </header>
    );
}