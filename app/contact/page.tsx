import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactClient from "./ContactClient";
import { fetchContactInfo } from "@/lib/supabase/queries";

export const revalidate = 3600;

export default async function ContactPage() {
  const info = await fetchContactInfo();

  return (
    <main className="min-h-screen section-cream">
      <Navbar />
      <ContactClient
        info={{
          email: info.email,
          shipping_text: info.shipping_text,
          response_time_text: info.response_time_text,
          location_headline_1: info.location_headline_1,
          location_headline_2: info.location_headline_2,
          location_body: info.location_body,
          instagram_url: info.instagram_url,
          facebook_url: info.facebook_url,
        }}
      />
      <Footer />
    </main>
  );
}
