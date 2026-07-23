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
  /** The original site/state, same aspect ratio, for before/after.
      Omitted on after-only concept pieces (no before/after on the case study). */
  before?: string;
  alt: string;
  /** One-line framing of what was wrong before. */
  problem: string;
  /** Short case-study story. */
  story: string[];
  /** "Co się zmieniło" bullets. */
  changes: string[];
  /** Matching industry page slug (internal link). */
  industrySlug: string;
  /** Shown in the homepage exhibition. Category-only pieces omit this so
      the home gallery stays curated while /realizacje shows every work. */
  homepage?: boolean;
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
    image: "/examples/bambino-after.jpg",
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
    homepage: true,
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
    image: "/examples/fryzjer-after.jpg",
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
    homepage: true,
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
    image: "/examples/julia-after.jpg",
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
    homepage: true,
  },
  {
    id: "goodly",
    anchor: "praca-04",
    slug: "kawiarnia-goodly",
    nr: "04",
    name: "Goodly Specialty Coffee",
    sector: "Kawiarnia i palarnia",
    district: "Wola",
    note: "Specialty coffee bez ceregieli: kawa, ceny i godziny widoczne od progu.",
    image: "/examples/kawiarnia-after.jpg",
    alt: "Projekt strony dla kawiarni Goodly Specialty Coffee — ciepła, zielona strona główna z menu i cenami kawy",
    problem:
      "Kameralna palarnia z lojalnymi gośćmi, ale w internecie tylko Instagram. Menu, ceny i godziny trudno znaleźć, a nowy gość nie wie, czego się spodziewać.",
    story: [
      "Goodly żyje z powracających gości i dobrej kawy, nie z grafiki. Chciałem, żeby strona działała tak samo: ciepło, konkretnie, z kawą na pierwszym planie.",
      "Zamiast ogólników postawiłem menu i ceny od razu na stronie głównej, obok godzin i prawdziwych zdjęć z lokalu. Ktoś, kto szuka miejsca na flat white, w sekundę wie, że trafił dobrze.",
    ],
    changes: [
      "Menu i ceny kawy widoczne od razu, bez klikania w podstrony",
      "Godziny otwarcia i dzielnica nad pierwszą zakładką",
      "Prawdziwe zdjęcia z lokalu zamiast zdjęć ze stocka",
      "Wersja mobilna, bo kawiarni szuka się w telefonie",
    ],
    industrySlug: "strony-dla-kawiarni",
  },
  {
    id: "chlebikawa",
    anchor: "praca-05",
    slug: "cukiernia-chleb-i-kawa",
    nr: "05",
    name: "Chleb i Kawa",
    sector: "Cukiernia i piekarnia",
    district: "Żoliborz",
    note: "Świeże wypieki na pierwszym planie: co dziś na ladzie i za ile.",
    image: "/examples/piekarnia-after.jpg",
    alt: "Projekt strony dla cukierni i piekarni Chleb i Kawa — ciepła strona z tartami, wypiekami i cenami",
    problem:
      "Wypieki znikają do południa, ale w sieci nie widać oferty. Nowy klient nie wie, co jest świeże, o której i ile kosztuje.",
    story: [
      "Dobra piekarnia sprzedaje zapachem i świeżością. Strona miała oddać to samo: apetyczne zdjęcia wypieków i jasną informację, co dziś na ladzie.",
      "Dodałem widoczne ceny, godzinę porannego wypieku i prostą ścieżkę do zamówienia tortu. Zamiast przewijać wiadomości, klient od razu widzi ofertę i wie, kiedy przyjść po świeże.",
    ],
    changes: [
      "Wypieki i ceny widoczne od pierwszego ekranu",
      "Godzina porannego wypieku, żeby wiadomo było, kiedy jest świeże",
      "Zamówienie tortu przez jeden prosty formularz",
      "Ciepła, apetyczna oprawa zamiast surowego cennika",
    ],
    industrySlug: "strony-dla-piekarni",
  },
  {
    id: "lila",
    anchor: "praca-06",
    slug: "studio-urody-lila",
    nr: "06",
    name: "Lila",
    sector: "Studio urody i kosmetologii",
    district: "Wilanów",
    note: "Spokojna, premium oprawa z zabiegami, cenami i rezerwacją online.",
    image: "/examples/salon-after.jpg",
    alt: "Projekt strony dla studia urody Lila — jasna, elegancka strona z zabiegami i rezerwacją online",
    problem:
      "Zadbane zabiegi i stali klienci, ale rezerwacja tylko przez telefon i wiadomości. Cennika nigdzie nie widać, a strona nie oddaje spokoju gabinetu.",
    story: [
      "Studio urody sprzedaje spokój i zaufanie. Chciałem, żeby strona była tak samo wyciszona i uporządkowana jak dobry gabinet: dużo powietrza, delikatna paleta, żadnego krzyku.",
      "Ułożyłem zabiegi i ceny w czytelny sposób, z jednym wyraźnym przyciskiem rezerwacji. Nowa klientka w kilka sekund wie, co obejmuje wizyta, ile kosztuje i jak ją umówić.",
    ],
    changes: [
      "Rezerwacja online zamiast wyłącznie telefonu i wiadomości",
      "Czytelny cennik zabiegów, bez chowania cen",
      "Spokojna, premium oprawa pod charakter miejsca",
      "Osobne sekcje zabiegów: twarz, brwi i rzęsy, dłonie",
    ],
    industrySlug: "strony-dla-salonu-kosmetycznego",
  },
];

export function getWork(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}
