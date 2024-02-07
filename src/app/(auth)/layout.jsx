import Footer from "@/components/footer";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-t from-dark-900 to-blue-700 text-white text-center font-poppins">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
