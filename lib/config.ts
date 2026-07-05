// ─────────────────────────────────────────────────────────────
//  Single place to edit your contact details.
//  Replace PHONE with your real WhatsApp number (country code, digits only,
//  no "+" and no spaces). Example for Poland: "48512345678".
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  brand: "Sitelab Warsaw",
  phone: "48000000000", // TODO: replace with your real WhatsApp number
  instagram: "sitelab.warsaw", // without the @
  email: "kontakt@sitelabwarsaw.pl",
  city: "Warszawa",
  weeklySlots: 3,
};

/** Builds a wa.me deep link with a pre-filled message. */
export function waLink(message: string): string {
  const base = `https://wa.me/${CONTACT.phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const igLink = `https://instagram.com/${CONTACT.instagram}`;
export const mailLink = `mailto:${CONTACT.email}`;

/** Default message used by the header / floating WhatsApp buttons. */
export const DEFAULT_WA_MESSAGE =
  "Cześć! Piszę ze strony Sitelab. Chcę darmowy projekt strony dla mojej firmy.";
