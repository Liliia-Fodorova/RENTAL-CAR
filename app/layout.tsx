import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RentalCar — Find Your Perfect Rental Car",
    template: "%s | RentalCar",
  },
  description:
    "Discover and rent your perfect car with RentalCar. Explore available vehicles, compare prices, and book your next journey.",
  applicationName: "RentalCar",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
         <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#ffffff",
        color: "#101828",
        border: "1px solid #DADDE1",
        borderRadius: "12px",
        padding: "16px",
      },
      success: {
        iconTheme: {
          primary: "#00AAD4",
          secondary: "#ffffff",
        },
      },
    }}
        />
        
        <TanStackProvider>
         <Header />
          {children}
        </TanStackProvider>  
      </body>
    </html>
  );
}
