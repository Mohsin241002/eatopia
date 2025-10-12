import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "EATOPIA - Vibe-Match Your Perfect Dining Experience",
  description: "EATOPIA curates restaurant recommendations based on your group type, vibe, and mood. It's not just food discovery—it's your digital friend with taste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ClientLayout>
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
