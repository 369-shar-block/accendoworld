export type Product = {
  id: string;
  title: string;
  category: string;
  image_path: string;
  display_order: number;
  is_visible: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  bestseller_label: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactInfo = {
  key: string;
  value: string;
};

export type ContactInfoMap = Record<string, string>;

// Default values used when a contact_info key is missing from the DB
export const CONTACT_DEFAULTS: ContactInfoMap = {
  email: "info@accendoworld.com",
  shipping_text: "Global shipping available worldwide",
  response_time_text: "We respond within 24\u201348 hours",
  footer_description:
    "Premium comfort footwear crafted for the entire family. Where style meets comfort in every step you take.",
  footer_website: "www.accendoworld.com",
  footer_shipping_note: "Global Shipping Available",
  location_headline_1: "Based in India,",
  location_headline_2: "Serving the World",
  location_body:
    "From our workshop in India, ACCENDO ships premium comfort footwear to customers across the globe. No matter where you are, a step ahead is just an order away.",
  instagram_url: "#",
  facebook_url: "#",
  twitter_url: "#",
};

export const CONTACT_FIELD_META: Array<{
  key: keyof typeof CONTACT_DEFAULTS;
  label: string;
  description: string;
  multiline?: boolean;
}> = [
  { key: "email", label: "Contact email", description: "Shown on the contact page and in the footer" },
  { key: "shipping_text", label: "Shipping message", description: "Contact page info card" },
  { key: "response_time_text", label: "Response time", description: "Contact page info card" },
  { key: "footer_description", label: "Footer tagline", description: "The paragraph under ACCENDO in the footer", multiline: true },
  { key: "footer_website", label: "Website URL label", description: "Shown as plain text in the footer" },
  { key: "footer_shipping_note", label: "Footer shipping note", description: "Short line under the contact list" },
  { key: "location_headline_1", label: "Location headline (line 1)", description: "Dark section on the contact page" },
  { key: "location_headline_2", label: "Location headline (line 2)", description: "Rendered in italics" },
  { key: "location_body", label: "Location description", description: "Body copy under the location headline", multiline: true },
  { key: "instagram_url", label: "Instagram URL", description: "Shown as a card on the contact page and in the footer. Leave as # to hide" },
  { key: "facebook_url", label: "Facebook URL", description: "Shown as a card on the contact page and in the footer. Leave as # to hide" },
];
