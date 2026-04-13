import { fetchContactInfo } from "@/lib/supabase/queries";
import { CONTACT_FIELD_META } from "@/lib/supabase/types";
import ContactAdminClient from "./ContactAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const info = await fetchContactInfo();

  // Map field meta → current values
  const fields = CONTACT_FIELD_META.map((meta) => ({
    ...meta,
    value: info[meta.key] ?? "",
  }));

  return (
    <div className="p-10 lg:p-14 max-w-[900px]">
      <p className="text-[10px] tracking-[0.5em] uppercase text-brand-red mb-4 font-sans">
        Site content
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-black mb-4">
        Contact info
      </h1>
      <p className="text-brand-muted text-sm font-sans mb-12 max-w-xl">
        Edit the text shown on the public contact page and in the footer.
        Changes go live on the next request (up to 60 seconds after saving).
      </p>

      <ContactAdminClient fields={fields} />
    </div>
  );
}
