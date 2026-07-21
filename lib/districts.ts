// ─────────────────────────────────────────────────────────────
//  Warsaw district pages. One object per dzielnica → one page at
//  /strony-internetowe/<slug>. Intros are written per district
//  (local character + typical businesses), never templated.
// ─────────────────────────────────────────────────────────────

export type District = {
  /** Route: /strony-internetowe/<slug>. */
  slug: string;
  /** Display name, e.g. "Mokotów". */
  name: string;
  /** Grammatical locative phrase, e.g. "na Mokotowie". */
  locative: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  lead: string;
  intro: string[];
  typicalBusinesses: string[];
  /** WORKS ids featured on the page. */
  featuredWorkIds: string[];
  /** Industry slugs to cross-link. */
  relatedIndustrySlugs: string[];
};

export const DISTRICTS: District[] = [
  {
    slug: "mokotow",
    name: "Mokotów",
    locative: "na Mokotowie",
    h1: "Strony internetowe dla firm na Mokotowie",
    metaTitle: "Strony internetowe dla firm na Mokotowie | Sitelab",
    metaDescription:
      "Projektuję strony dla lokalnych firm na Mokotowie: kawiarni, salonów, barberów i usług. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Warszawa · Mokotów",
    lead: "Strony dla mokotowskich firm, które chcą być pierwszym wyborem w okolicy.",
    intro: [
      "Mokotów to jedna z największych i najbardziej zróżnicowanych dzielnic Warszawy. Biura na Służewcu, kameralne uliczki wokół Puławskiej i mnóstwo lokalnych usług sprawiają, że o klienta rywalizuje się na każdym rogu.",
      "Dobra strona pomaga wyróżnić się wśród sąsiadów i trafić do osób, które szukają w Google konkretnej usługi w tej okolicy. Projektuję ją tak, żeby od razu było widać, czym się zajmujesz, gdzie jesteś i dlaczego warto wybrać właśnie Ciebie.",
    ],
    typicalBusinesses: [
      "Kawiarnie",
      "Salony fryzjerskie i barber shopy",
      "Salony kosmetyczne",
      "Restauracje i bary",
      "Usługi lokalne",
    ],
    featuredWorkIds: ["fryzjer"],
    relatedIndustrySlugs: [
      "strony-dla-barbera",
      "strony-dla-salonu-kosmetycznego",
      "strony-dla-kawiarni",
    ],
  },
  {
    slug: "srodmiescie",
    name: "Śródmieście",
    locative: "w Śródmieściu",
    h1: "Strony internetowe dla firm w Śródmieściu",
    metaTitle: "Strony internetowe dla firm w Śródmieściu | Sitelab",
    metaDescription:
      "Strony dla firm w centrum Warszawy: restauracji, kawiarni, kwiaciarni i usług. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Warszawa · Śródmieście",
    lead: "Strony dla firm z centrum, gdzie o uwagę klienta jest najtrudniej.",
    intro: [
      "Śródmieście żyje ruchem: biura, turyści, mieszkańcy i klienci z całego miasta. To ogromny potencjał, ale też największa konkurencja, zwłaszcza w gastronomii i usługach.",
      "Strona firmowa w centrum musi działać szybko i mówić konkretem. Projektuję ją tak, żeby ktoś, kto szuka miejsca na lunch, kawę albo szybką usługę w pobliżu, w kilka sekund wiedział, że trafił dobrze.",
    ],
    typicalBusinesses: [
      "Restauracje i bary",
      "Kawiarnie",
      "Kwiaciarnie",
      "Salony i usługi",
      "Gastronomia biurowa",
    ],
    featuredWorkIds: ["bambino"],
    relatedIndustrySlugs: [
      "strony-dla-restauracji",
      "strony-dla-kawiarni",
      "strony-dla-kwiaciarni",
    ],
  },
  {
    slug: "wola",
    name: "Wola",
    locative: "na Woli",
    h1: "Strony internetowe dla firm na Woli",
    metaTitle: "Strony internetowe dla firm na Woli | Sitelab",
    metaDescription:
      "Strony dla firm na Woli: nowej gastronomii, kawiarni, piekarni i usług przy biurowcach. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Warszawa · Wola",
    lead: "Strony dla firm z Woli, dzielnicy, która rośnie najszybciej w mieście.",
    intro: [
      "Wola zmieniła się nie do poznania. Wokół Ronda Daszyńskiego wyrosły biurowce i nowe osiedla, a razem z nimi tysiące młodych mieszkańców i pracowników szukających dobrej kawy, lunchu i usług blisko domu.",
      "To dzielnica, w której nowa firma może szybko zdobyć klientów, jeśli jest widoczna w internecie. Projektuję strony, które trafiają do tych osób, zanim zrobi to sieciówka za rogiem.",
    ],
    typicalBusinesses: [
      "Kawiarnie",
      "Restauracje i bary",
      "Piekarnie i cukiernie",
      "Usługi przy biurowcach",
      "Lokale na nowych osiedlach",
    ],
    featuredWorkIds: ["bambino"],
    relatedIndustrySlugs: [
      "strony-dla-restauracji",
      "strony-dla-kawiarni",
      "strony-dla-piekarni",
    ],
  },
  {
    slug: "praga-poludnie",
    name: "Praga-Południe",
    locative: "na Pradze-Południe",
    h1: "Strony internetowe dla firm na Pradze-Południe",
    metaTitle: "Strony internetowe dla firm na Pradze-Południe | Sitelab",
    metaDescription:
      "Strony dla firm z Pragi-Południe i Saskiej Kępy: restauracji, kawiarni, barberów i usług. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Warszawa · Praga-Południe",
    lead: "Strony dla firm z Pragi-Południe, z klimatem Saskiej Kępy w tle.",
    intro: [
      "Praga-Południe to dzielnica z charakterem. Saska Kępa słynie z kameralnych restauracji i kawiarni, a okoliczne osiedla to wierni, lokalni klienci, którzy chętnie wybierają miejsca z sąsiedztwa.",
      "Taka publiczność docenia autentyczność. Projektuję strony, które oddają klimat miejsca i jednocześnie ułatwiają podstawowe rzeczy: sprawdzenie menu, cennika, godzin i szybki kontakt.",
    ],
    typicalBusinesses: [
      "Restauracje i bary",
      "Kawiarnie",
      "Barber shopy i salony",
      "Kwiaciarnie",
      "Usługi osiedlowe",
    ],
    featuredWorkIds: ["bambino"],
    relatedIndustrySlugs: [
      "strony-dla-restauracji",
      "strony-dla-barbera",
      "strony-dla-kawiarni",
    ],
  },
  {
    slug: "ochota",
    name: "Ochota",
    locative: "na Ochocie",
    h1: "Strony internetowe dla firm na Ochocie",
    metaTitle: "Strony internetowe dla firm na Ochocie | Sitelab",
    metaDescription:
      "Strony dla firm na Ochocie: kawiarni, salonów, piekarni i lokalnych usług. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Warszawa · Ochota",
    lead: "Strony dla ochockich firm, blisko mieszkańców i studentów.",
    intro: [
      "Ochota to gęsto zamieszkana, codzienna część Warszawy. Pobliskie uczelnie i kamienice oznaczają stały strumień mieszkańców i studentów, którzy szukają sprawdzonych miejsc niedaleko domu.",
      "To wdzięczna okolica dla lokalnych usług i gastronomii. Projektuję strony, które łapią tych klientów w Google i pokazują im najważniejsze: ofertę, ceny, godziny i dojazd.",
    ],
    typicalBusinesses: [
      "Kawiarnie",
      "Salony kosmetyczne i fryzjerskie",
      "Piekarnie i cukiernie",
      "Restauracje i bary",
      "Usługi lokalne",
    ],
    featuredWorkIds: ["julia"],
    relatedIndustrySlugs: [
      "strony-dla-kawiarni",
      "strony-dla-salonu-kosmetycznego",
      "strony-dla-piekarni",
    ],
  },
  {
    slug: "zoliborz",
    name: "Żoliborz",
    locative: "na Żoliborzu",
    h1: "Strony internetowe dla firm na Żoliborzu",
    metaTitle: "Strony internetowe dla firm na Żoliborzu | Sitelab",
    metaDescription:
      "Strony dla kameralnych firm z Żoliborza: kawiarni, kwiaciarni, salonów i usług. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Warszawa · Żoliborz",
    lead: "Strony dla kameralnych firm z Żoliborza, blisko stałych klientów.",
    intro: [
      "Żoliborz jest spokojny i kameralny, z rodzinną atmosferą i przywiązaniem do lokalnych miejsc. Mieszkańcy chętnie wracają tam, gdzie czują się dobrze obsłużeni, i polecają je dalej.",
      "W takiej okolicy liczy się dobre pierwsze wrażenie i zaufanie. Projektuję strony, które oddają kameralny charakter miejsca, a przy tym ułatwiają kontakt i rezerwację.",
    ],
    typicalBusinesses: [
      "Kawiarnie",
      "Kwiaciarnie",
      "Salony fryzjerskie i barber",
      "Restauracje osiedlowe",
      "Usługi lokalne",
    ],
    featuredWorkIds: ["julia"],
    relatedIndustrySlugs: [
      "strony-dla-kawiarni",
      "strony-dla-kwiaciarni",
      "strony-dla-barbera",
    ],
  },
];

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}
