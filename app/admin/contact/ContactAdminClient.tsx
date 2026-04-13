"use client";

import { useState, useTransition } from "react";
import { updateContactInfo } from "../actions";

type Field = {
  key: string;
  label: string;
  description: string;
  multiline?: boolean;
  value: string;
};

export default function ContactAdminClient({ fields }: { fields: Field[] }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateContactInfo(fd);
      if (result?.error) {
        setMessage({ type: "err", text: result.error });
      } else {
        setMessage({ type: "ok", text: "Contact info updated." });
      }
    });
  }

  return (
    <>
      {message && (
        <div
          className={`mb-6 px-6 py-4 border ${
            message.type === "ok"
              ? "border-green-600/30 bg-green-50 text-green-700"
              : "border-brand-red/20 bg-brand-red/5 text-brand-red"
          }`}
        >
          <p className="text-sm font-sans">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-brand-black/[0.06] p-8">
        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`field-${field.key}`}
              className="block text-[9px] tracking-[0.3em] uppercase text-brand-red font-sans mb-1"
            >
              {field.label}
            </label>
            <p className="text-xs text-brand-muted font-sans mb-2">
              {field.description}
            </p>
            {field.multiline ? (
              <textarea
                id={`field-${field.key}`}
                name={`field:${field.key}`}
                defaultValue={field.value}
                rows={4}
                className="w-full px-4 py-3 bg-cream border border-brand-black/10 text-sm font-sans focus:outline-none focus:border-brand-red resize-none"
              />
            ) : (
              <input
                type="text"
                id={`field-${field.key}`}
                name={`field:${field.key}`}
                defaultValue={field.value}
                className="w-full px-4 py-3 bg-cream border border-brand-black/10 text-sm font-sans focus:outline-none focus:border-brand-red"
              />
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-brand-black/[0.06]">
          <button
            type="submit"
            disabled={isPending}
            className="btn-fill disabled:opacity-50"
          >
            {isPending ? "Saving\u2026" : "Save changes"}
          </button>
        </div>
      </form>
    </>
  );
}
