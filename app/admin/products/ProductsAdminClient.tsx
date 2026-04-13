"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import type { Product } from "@/lib/supabase/types";
import { createProduct, deleteProduct, updateProduct } from "../actions";

type AdminProduct = Product & { publicUrl: string };

const CATEGORY_OPTIONS = [
  "Men's Flip Flops",
  "Men's Slides",
  "Women's Clogs",
  "Women's Slides",
  "Women's Platforms",
  "Kids' Clogs",
  "Kids' Slides",
  "Kids' Flip Flops",
];

export default function ProductsAdminClient({
  products,
}: {
  products: AdminProduct[];
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const visible = products.filter((p) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

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

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-8">
        <input
          type="text"
          placeholder="Search by title or category\u2026"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 max-w-md px-4 py-3 bg-white border border-brand-black/10 text-sm font-sans focus:outline-none focus:border-brand-red"
        />
        <button
          type="button"
          onClick={() => {
            setShowAdd(true);
            setEditingId(null);
          }}
          className="btn-fill whitespace-nowrap"
        >
          + Add product
        </button>
      </div>

      {showAdd && (
        <AddProductForm
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            setMessage({ type: "ok", text: "Product created." });
          }}
          onError={(text) => setMessage({ type: "err", text })}
        />
      )}

      <div className="bg-white border border-brand-black/[0.06]">
        {visible.length === 0 ? (
          <div className="p-12 text-center text-brand-muted text-sm font-sans">
            No products match your filter.
          </div>
        ) : (
          <ul className="divide-y divide-brand-black/[0.06]">
            {visible.map((product) => (
              <li key={product.id} className="p-5">
                {editingId === product.id ? (
                  <EditProductForm
                    product={product}
                    onCancel={() => setEditingId(null)}
                    onSuccess={() => {
                      setEditingId(null);
                      setMessage({ type: "ok", text: "Product updated." });
                    }}
                    onError={(text) => setMessage({ type: "err", text })}
                  />
                ) : (
                  <ProductRow
                    product={product}
                    onEdit={() => setEditingId(product.id)}
                    onDelete={() =>
                      setMessage({ type: "ok", text: "Product deleted." })
                    }
                    onError={(text) => setMessage({ type: "err", text })}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

// ---------- Row (view mode) ----------

function ProductRow({
  product,
  onEdit,
  onDelete,
  onError,
}: {
  product: AdminProduct;
  onEdit: () => void;
  onDelete: () => void;
  onError: (text: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("id", product.id);
    fd.append("image_path", product.image_path);
    startTransition(async () => {
      const result = await deleteProduct(fd);
      if (result?.error) onError(result.error);
      else onDelete();
    });
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-20 h-24 flex-shrink-0 bg-brand-black/5 overflow-hidden">
        <Image
          src={product.publicUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="80px"
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.3em] uppercase text-brand-red font-sans mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-brand-black truncate">
          {product.title}
        </h3>
        <div className="flex gap-3 mt-2 text-[10px] uppercase tracking-[0.15em] font-sans">
          {!product.is_visible && (
            <span className="text-brand-muted">Hidden</span>
          )}
          {product.is_bestseller && (
            <span className="text-brand-red">Bestseller</span>
          )}
          {product.is_new_arrival && (
            <span className="text-brand-red">New arrival</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans border border-brand-black/20 hover:bg-brand-black hover:text-cream transition-colors"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white transition-colors disabled:opacity-50"
        >
          {isPending ? "\u2026" : "Delete"}
        </button>
      </div>
    </div>
  );
}

// ---------- Edit form ----------

function EditProductForm({
  product,
  onCancel,
  onSuccess,
  onError,
}: {
  product: AdminProduct;
  onCancel: () => void;
  onSuccess: () => void;
  onError: (text: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateProduct(fd);
      if (result?.error) onError(result.error);
      else onSuccess();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
      <input type="hidden" name="id" value={product.id} />

      <div className="md:col-span-2 relative w-20 h-24 bg-brand-black/5 overflow-hidden">
        <Image
          src={product.publicUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="80px"
          unoptimized
        />
      </div>

      <div className="md:col-span-5 space-y-3">
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={product.title}
            required
            className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
          />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
            Category
          </label>
          <CategoryInput defaultValue={product.category} />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
            Bestseller label (optional)
          </label>
          <input
            type="text"
            name="bestseller_label"
            defaultValue={product.bestseller_label ?? ""}
            placeholder="e.g., Designer Collection"
            className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
          />
        </div>
      </div>

      <div className="md:col-span-3 space-y-2 text-sm font-sans">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_visible"
            defaultChecked={product.is_visible}
            className="accent-brand-red"
          />
          Visible on site
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_bestseller"
            defaultChecked={product.is_bestseller}
            className="accent-brand-red"
          />
          Bestseller
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_new_arrival"
            defaultChecked={product.is_new_arrival}
            className="accent-brand-red"
          />
          New arrival
        </label>
      </div>

      <div className="md:col-span-2 flex flex-col gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans bg-brand-red text-white hover:bg-brand-red-dark transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving\u2026" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans border border-brand-black/20 hover:bg-brand-black hover:text-cream transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---------- Add form ----------

function AddProductForm({
  onClose,
  onSuccess,
  onError,
}: {
  onClose: () => void;
  onSuccess: () => void;
  onError: (text: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createProduct(fd);
      if (result?.error) onError(result.error);
      else onSuccess();
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  }

  return (
    <div className="mb-8 bg-white border border-brand-red/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-brand-black">
          Add new product
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-brand-muted hover:text-brand-black text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Image upload */}
        <div className="md:col-span-4">
          <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-2 font-sans">
            Product photo
          </label>
          <label className="block border-2 border-dashed border-brand-black/20 hover:border-brand-red/50 cursor-pointer transition-colors">
            {preview ? (
              <div className="relative aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[3/4] flex items-center justify-center text-brand-muted text-xs uppercase tracking-[0.2em] font-sans">
                Click to choose
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {/* Fields */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Pink Bow Clogs"
              className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
            />
          </div>

          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
              Category
            </label>
            <CategoryInput />
          </div>

          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mb-1 font-sans">
              Bestseller label (optional)
            </label>
            <input
              type="text"
              name="bestseller_label"
              placeholder="Override label shown on bestseller card"
              className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
            />
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-sans pt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_visible"
                defaultChecked
                className="accent-brand-red"
              />
              Visible on site
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="is_bestseller" className="accent-brand-red" />
              Bestseller
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="is_new_arrival" className="accent-brand-red" />
              New arrival
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="btn-fill disabled:opacity-50"
            >
              {isPending ? "Uploading\u2026" : "Create product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans border border-brand-black/20 hover:bg-brand-black hover:text-cream transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ---------- Category input with datalist for suggestions ----------

function CategoryInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <>
      <input
        type="text"
        name="category"
        defaultValue={defaultValue}
        required
        list="accendo-categories"
        placeholder="e.g., Women's Clogs"
        className="w-full px-3 py-2 bg-white border border-brand-black/20 text-sm font-sans focus:outline-none focus:border-brand-red"
      />
      <datalist id="accendo-categories">
        {CATEGORY_OPTIONS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </>
  );
}
