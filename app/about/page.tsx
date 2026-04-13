import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutClient from "./AboutClient";

export const revalidate = 60;

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutClient />
      <Footer />
    </main>
  );
}
