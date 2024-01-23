import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Verdex",
  description: "Verdex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white text-center">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
