import { Rubik } from "next/font/google";
import './globals.css';
import { AuthProvider } from "./context/AuthContext";
import Navigations from "./components/Navigations";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Include the weights you need
  variable: "--font-rubik",
});

export const metadata = {
  title: "Meetups",
  description: "Connecting with peoples",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <style>
          {`
            :root {
              font-size: clamp(14px, 1.5vw, 16px); /* Auto-scale font size */
            }
            body {
              zoom: calc(100vw / 1440); /* Scale based on 1440px (laptop screen) */
            }
          `}
        </style>
      </head>
      <body
        className={`${rubik.variable} antialiased bg-black font-rubik`}
      >
        <AuthProvider>
          <Navigations />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
