// ─────────────────────────────────────────────────────────────
//  The exhibition. Each entry is one framed work: a concept
//  redesign rendered to PNG (public/examples/*-after.png).
// ─────────────────────────────────────────────────────────────

export type Work = {
  id: string;
  /** Section anchor + ProgressLine tick target. */
  anchor: string;
  nr: string;
  name: string;
  sector: string;
  district: string;
  /** One-line curatorial note under the caption. */
  note: string;
  /** Rendered concept design, 16:10. */
  image: string;
  alt: string;
};

export const WORKS: Work[] = [
  {
    id: "bambino",
    anchor: "praca-01",
    nr: "01",
    name: "Bar Bambino",
    sector: "Bar mleczny",
    district: "Śródmieście",
    note: "Domowe jedzenie jak za dawnych lat: ciepło, menu i ceny widoczne od progu.",
    image: "/examples/bambino-after.png",
    alt: "Projekt strony dla baru mlecznego Bar Bambino — ciepła, apetyczna strona główna z menu i cenami",
  },
  {
    id: "fryzjer",
    anchor: "praca-02",
    nr: "02",
    name: "Fryzjer Puławska",
    sector: "Salon fryzjerski",
    district: "Mokotów",
    note: "Klasyczne rzemiosło od 1946: mocny kontrast, cennik i rezerwacja w dwa kliknięcia.",
    image: "/examples/fryzjer-after.png",
    alt: "Projekt strony dla salonu Fryzjer Puławska — ciemna, elegancka strona z rezerwacją online",
  },
  {
    id: "julia",
    anchor: "praca-03",
    nr: "03",
    name: "Kwiaciarnia Julia",
    sector: "Kwiaciarnia",
    district: "Warszawa",
    note: "Kwiaty, które mówią bez słów: bukiety, ceny i dostawa tego samego dnia.",
    image: "/examples/julia-after.png",
    alt: "Projekt strony dla Kwiaciarni Julia — jasna, delikatna strona z bukietami i zamówieniem z dostawą",
  },
];
