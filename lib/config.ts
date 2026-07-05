// ─────────────────────────────────────────────────────────────
//  Single place to edit your contact details.
//  Instagram DM is the primary contact channel for this site.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  brand: "Sitelab Warsaw",
  instagram: "warsaw.sitelab", // without the @
  email: "sitelab.warsaw@google.com",
  city: "Warszawa",
  weeklySlots: 3,
};

/** Public Instagram profile. */
export const igLink = `https://instagram.com/${CONTACT.instagram}`;

/** Direct "open a DM with me" deep link (opens the Instagram message thread). */
export const igDmLink = `https://ig.me/m/${CONTACT.instagram}`;

export const mailLink = `mailto:${CONTACT.email}`;

/**
 * Ready-to-send message the visitor pastes into the DM.
 * Instagram (unlike WhatsApp) can't pre-fill a message, so we copy this to the
 * clipboard on submit and open the DM thread for them to paste + send.
 */
export function dmMessage(business: string, link?: string): string {
  return (
    `Cześć! Piszę w sprawie darmowego projektu strony.\n` +
    `Firma: ${business}` +
    (link ? `\nInstagram / strona: ${link}` : "")
  );
}
