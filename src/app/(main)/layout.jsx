import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Verdex",
  description: "Verdex",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-500 text-white text-center font-poppins">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
