// ─────────────────────────────────────────────────────────────
//  The exhibition. Each entry is one framed work; the matching
//  mockup component is registered in components/Exhibition.tsx.
// ─────────────────────────────────────────────────────────────

export type WorkId = "restauracja" | "barber" | "kwiaciarnia";

export type Work = {
  id: WorkId;
  /** Section anchor + ProgressLine tick target. */
  anchor: string;
  nr: string;
  name: string;
  sector: string;
  district: string;
  /** One-line curatorial note under the caption. */
  note: string;
};

export const WORKS: Work[] = [
  {
    id: "restauracja",
    anchor: "praca-01",
    nr: "01",
    name: "Złoty Widelec",
    sector: "Restauracja",
    district: "Śródmieście",
    note: "Ciepło, apetyt i rezerwacja w zasięgu kciuka.",
  },
  {
    id: "barber",
    anchor: "praca-02",
    nr: "02",
    name: "Antracyt",
    sector: "Barbershop",
    district: "Mokotów",
    note: "Ostry kontrast, cennik bez owijania, wizyta w dwa kliknięcia.",
  },
  {
    id: "kwiaciarnia",
    anchor: "praca-03",
    nr: "03",
    name: "Pracownia Mila",
    sector: "Kwiaciarnia",
    district: "Żoliborz",
    note: "Sklep od pierwszego spojrzenia: bukiety, ceny, dostawa tego samego dnia.",
  },
];
