// ─────────────────────────────────────────────────────────────
//  The exhibition. Each entry is one framed work: a concept
//  redesign rendered to PNG (public/examples/*-after.png), with the
//  original captured as *-before.png for the case-study pages.
// ─────────────────────────────────────────────────────────────

export type Work = {
  id: string;
  /** Section anchor + ProgressLine tick target (home). */
  anchor: string;
  /** Case-study route: /realizacje/<slug>. */
  slug: string;
  nr: string;
  name: string;
  sector: string;
  district: string;
  /** One-line curatorial note under the caption. */
  note: string;
  /** Rendered concept design, 16:10. */
  image: string;
  /** The original site/state, same aspect ratio, for before/after. */
  before: string;
  alt: string;
  /** One-line framing of what was wrong before. */
  problem: string;
  /** Short case-study story. */
  story: string[];
  /** "Co się zmieniło" bullets. */
  changes: string[];
  /** Matching industry page slug (internal link). */
  industrySlug: string;
};

export const WORKS: Work[] = [
  {
    id: "bambino",
    anchor: "praca-01",
    slug: "bar-bambino",
    nr: "01",
    name: "Bar Bambino",
    sector: "Bar mleczny",
    district: "Śródmieście",
    note: "Domowe jedzenie jak za dawnych lat: ciepło, menu i ceny widoczne od progu.",
    image: "/examples/bambino-after.png",
    before: "/examples/bambino-before.png",
    alt: "Projekt strony dla baru mlecznego Bar Bambino — ciepła, apetyczna strona główna z menu i cenami",
    problem:
      "Bar z wierną klientelą, ale w internecie prawie niewidoczny. Menu i godziny tylko na kartce w witrynie.",
    story: [
      "Bar Bambino gotuje to samo od lat i ludzie wracają po smak, nie po grafikę. Chciałem, żeby strona działała tak samo: ciepło, bez udawania, z jedzeniem na pierwszym planie.",
      "Zamiast slajdera z ozdobnikami zrobiłem prostą stronę, na której od razu widać dzisiejsze menu, ceny i godziny. Zdjęcia własne, nie ze stocka, bo to one budują apetyt.",
    ],
    changes: [
      "Menu i ceny widoczne od razu, bez klikania w podstrony",
      "Godziny otwarcia i adres nad pierwszą zakładką",
      "Krótka historia baru, żeby budować zaufanie nowych gości",
      "Wersja mobilna, bo większość sprawdza jedzenie w telefonie",
    ],
    industrySlug: "strony-dla-restauracji",
  },
  {
    id: "fryzjer",
    anchor: "praca-02",
    slug: "fryzjer-pulawska",
    nr: "02",
    name: "Fryzjer Puławska",
    sector: "Salon fryzjerski",
    district: "Mokotów",
    note: "Klasyczne rzemiosło od 1946: mocny kontrast, cennik i rezerwacja w dwa kliknięcia.",
    image: "/examples/fryzjer-after.png",
    before: "/examples/fryzjer-before.png",
    alt: "Projekt strony dla salonu Fryzjer Puławska — ciemna, elegancka strona z rezerwacją online",
    problem:
      "Rzemiosło z tradycją, ale rezerwacja tylko przez telefon i żadnego cennika w internecie.",
    story: [
      "Klasyczny zakład, w którym liczy się dobra robota i stały klient. Strona miała oddać ten spokój, a nie krzyczeć promocjami.",
      "Postawiłem na mocny kontrast, jeden wyraźny przycisk rezerwacji i pełny cennik. Nowy klient w dwa kliknięcia wie, ile zapłaci i kiedy może przyjść.",
    ],
    changes: [
      "Rezerwacja online zamiast wyłącznie telefonu",
      "Pełny cennik usług, bez chowania cen",
      "Ciemna, elegancka oprawa pasująca do charakteru miejsca",
      "Mapa i godziny zawsze pod ręką",
    ],
    industrySlug: "strony-dla-barbera",
  },
  {
    id: "julia",
    anchor: "praca-03",
    slug: "kwiaciarnia-julia",
    nr: "03",
    name: "Kwiaciarnia Julia",
    sector: "Kwiaciarnia",
    district: "Warszawa",
    note: "Kwiaty, które mówią bez słów: bukiety, ceny i dostawa tego samego dnia.",
    image: "/examples/julia-after.png",
    before: "/examples/julia-before.png",
    alt: "Projekt strony dla Kwiaciarni Julia — jasna, delikatna strona z bukietami i zamówieniem z dostawą",
    problem:
      "Piękne bukiety, ale online tylko profil z kilkoma zdjęciami. Zamówienia ginęły w wiadomościach.",
    story: [
      "Kwiaty sprzedają się emocją, więc strona musiała być lekka i pełna zdjęć, a jednocześnie prowadzić prosto do zamówienia.",
      "Dodałem jasny układ z bukietami, cenami i dostawą tego samego dnia. Klient wybiera i pisze, bez przeglądania dziesiątek wiadomości.",
    ],
    changes: [
      "Bukiety z cenami zamiast samych zdjęć",
      "Wyraźna informacja o dostawie tego samego dnia",
      "Proste zamówienie przez jeden formularz",
      "Delikatna, jasna oprawa pod sezonowe kwiaty",
    ],
    industrySlug: "strony-dla-kwiaciarni",
  },
];

export function getWork(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}
