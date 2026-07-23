// ─────────────────────────────────────────────────────────────
//  Industry landing pages. One object per niche → one page at
//  /<slug> and one entry in the sitemap. Copy is unique per niche.
// ─────────────────────────────────────────────────────────────

export type Need = { title: string; desc: string };
export type FaqItem = { q: string; a: string };

export type Industry = {
  /** Route + URL: /<slug>. */
  slug: string;
  /** Short internal key. */
  key: string;
  /** Label in nav/footer/hub. */
  navLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** PageHero kicker caption. */
  kicker: string;
  /** PageHero sub-line. */
  lead: string;
  intro: string[];
  needs: Need[];
  /** WORKS id used as the on-page example. */
  exampleWorkId: string;
  faq: FaqItem[];
  /** District slugs to cross-link. */
  relatedDistricts: string[];
  /** Article slug to cross-link. */
  relatedArticleSlug?: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "strony-dla-kawiarni",
    key: "kawiarnia",
    navLabel: "Kawiarnie",
    h1: "Strony internetowe dla kawiarni w Warszawie",
    metaTitle: "Strony internetowe dla kawiarni w Warszawie | Sitelab",
    metaDescription:
      "Strona dla kawiarni, która oddaje klimat miejsca: menu, zdjęcia, godziny i dojazd od progu. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Oferta · Kawiarnie",
    lead: "Strona, która oddaje klimat Twojej kawiarni i sprowadza gości z okolicy.",
    intro: [
      "Kawiarnię wybiera się sercem i lokalizacją. Zanim ktoś wejdzie, sprawdza w telefonie zdjęcia, godziny i to, czy jest miejsce do pracy albo na spotkanie ze znajomymi. Jeśli tego nie znajdzie, idzie do sąsiada.",
      "Robię strony, które w kilka sekund pokazują atmosferę miejsca, ofertę kawy i najważniejsze informacje. Bez przeładowania, za to z Twoimi zdjęciami i Twoim charakterem.",
    ],
    needs: [
      { title: "Klimat od pierwszego ekranu", desc: "Duże, prawdziwe zdjęcia wnętrza i kawy zamiast stocka. Gość od razu czuje, czy to miejsce dla niego." },
      { title: "Menu i ceny bez szukania", desc: "Aktualna oferta kawy, ciast i śniadań w jednym miejscu, czytelna na telefonie." },
      { title: "Godziny i dojazd", desc: "Godziny otwarcia, adres i mapa nad pierwszą zakładką, bo tego szuka się najczęściej." },
      { title: "Wpięty Instagram", desc: "Profil połączony ze stroną, żeby świeże zdjęcia pracowały na Ciebie." },
    ],
    exampleWorkId: "goodly",
    faq: [
      { q: "Czy muszę mieć gotowe zdjęcia?", a: "Nie. Jeśli masz dobre zdjęcia z telefonu, wykorzystamy je. Jeśli nie, podpowiem, co i jak sfotografować, żeby kawiarnia wyglądała apetycznie." },
      { q: "Czy dodasz menu, które sam zmienię?", a: "Tak. Menu układam tak, żeby dało się je łatwo aktualizować, kiedy zmieniasz ofertę albo ceny." },
      { q: "Ile to trwa?", a: "Darmowy projekt strony głównej dostajesz w 24 godziny. Jeśli się spodoba, gotowa strona powstaje w 72 godziny." },
      { q: "Mam już profil na Instagramie, po co mi strona?", a: "Strona i Instagram grają razem. Profil wpinamy w stronę, a stronę linkujemy z profilu, żeby ludzie z Google trafiali prosto do Ciebie." },
    ],
    relatedDistricts: ["srodmiescie", "mokotow", "wola"],
    relatedArticleSlug: "strona-internetowa-czy-instagram",
  },
  {
    slug: "strony-dla-restauracji",
    key: "restauracja",
    navLabel: "Restauracje i bary",
    h1: "Strony internetowe dla restauracji w Warszawie",
    metaTitle: "Strony internetowe dla restauracji w Warszawie | Sitelab",
    metaDescription:
      "Strona dla restauracji z menu, cenami i rezerwacją widocznymi od razu. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Oferta · Restauracje i bary",
    lead: "Menu, ceny i rezerwacja od progu. Strona, która zapełnia stoliki.",
    intro: [
      "Zanim ktoś zarezerwuje stolik, chce zobaczyć menu i ceny. Jeśli strona każe ich szukać albo otwiera PDF, który nie działa na telefonie, gość rezygnuje i szuka dalej.",
      "Projektuję strony restauracji tak, żeby najważniejsze rzeczy były od razu: aktualne menu, ceny, godziny i prosty sposób na rezerwację lub kontakt.",
    ],
    needs: [
      { title: "Menu widoczne od razu", desc: "Aktualne dania i ceny bez PDF-ów i klikania. Czytelne na telefonie, gdzie ląduje większość ruchu." },
      { title: "Rezerwacja lub szybki kontakt", desc: "Wyraźny przycisk do rezerwacji albo telefonu, zawsze pod ręką." },
      { title: "Apetyczne zdjęcia", desc: "Prawdziwe zdjęcia jedzenia i wnętrza, które budują apetyt i zaufanie." },
      { title: "Godziny i lokalizacja", desc: "Godziny otwarcia, adres i mapa od pierwszego ekranu." },
    ],
    exampleWorkId: "bambino",
    faq: [
      { q: "Mam menu w PDF, wystarczy?", a: "Lepiej mieć menu wprost na stronie. Przepisuję je w czytelnej formie, która działa na telefonie i pomaga w Google. PDF mogę zostawić dodatkowo do druku." },
      { q: "Czy podłączycie rezerwacje online?", a: "Tak, mogę wpiąć system rezerwacji, z którego korzystasz, albo zrobić prosty formularz i kontakt telefoniczny, jeśli wolisz." },
      { q: "Jak często można aktualizować menu?", a: "Kiedy tylko chcesz. Układam menu tak, żeby zmiana dań i cen była szybka." },
      { q: "Ile kosztuje taka strona?", a: "Strona wizytówka to 399 zł i cenę znasz przed startem. Projekt strony głównej robię za darmo, żebyś zobaczył efekt bez ryzyka." },
    ],
    relatedDistricts: ["srodmiescie", "praga-poludnie", "wola"],
    relatedArticleSlug: "czego-potrzebuje-strona-restauracji",
  },
  {
    slug: "strony-dla-barbera",
    key: "barber",
    navLabel: "Barber i fryzjer",
    h1: "Strony internetowe dla barberów i fryzjerów w Warszawie",
    metaTitle: "Strony dla barbera i fryzjera w Warszawie | Sitelab",
    metaDescription:
      "Strona dla barbera i fryzjera z rezerwacją online, cennikiem i galerią efektów. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Oferta · Barber i fryzjer",
    lead: "Rezerwacja w dwa kliknięcia, jasny cennik i galeria efektów.",
    intro: [
      "Klient barbera i fryzjera rezerwuje z telefonu, często wieczorem. Chce zobaczyć cennik, przykłady pracy i umówić wizytę bez dzwonienia.",
      "Robię strony, które prowadzą prosto do rezerwacji: mocne zdjęcia, czytelny cennik i jeden wyraźny przycisk. Bez zbędnych kroków.",
    ],
    needs: [
      { title: "Rezerwacja online", desc: "Wyraźny przycisk rezerwacji, wpięty w Twój system albo prosty formularz. Klient umawia się o każdej porze." },
      { title: "Jasny cennik", desc: "Pełne ceny usług, bez chowania. To pierwsze, czego szuka nowy klient." },
      { title: "Galeria efektów", desc: "Zdjęcia strzyżeń i stylizacji, które pokazują poziom i przekonują." },
      { title: "Opinie i lokalizacja", desc: "Oceny, adres i godziny w widocznym miejscu." },
    ],
    exampleWorkId: "fryzjer",
    faq: [
      { q: "Podłączycie mój system rezerwacji?", a: "Tak. Wpinam Booksy, Moment albo inny system, z którego korzystasz. Jeśli nie masz żadnego, zrobię prosty formularz i kontakt." },
      { q: "Nie mam profesjonalnych zdjęć.", a: "Wystarczą dobre zdjęcia telefonem. Podpowiem, jak ustawić światło i kadr, żeby efekty wyglądały mocno." },
      { q: "Czy strona pomoże w Google?", a: "Tak. Strona z cennikiem i lokalizacją pomaga pojawiać się na hasła w rodzaju barber i dzielnica. Zajmuję się też podstawową stroną techniczną." },
      { q: "Ile to kosztuje?", a: "Strona wizytówka to 399 zł i cenę znasz przed startem. Projekt strony głównej dostajesz najpierw za darmo." },
    ],
    relatedDistricts: ["mokotow", "praga-poludnie", "zoliborz"],
    relatedArticleSlug: "strona-internetowa-czy-instagram",
  },
  {
    slug: "strony-dla-salonu-kosmetycznego",
    key: "salon-kosmetyczny",
    navLabel: "Salony kosmetyczne",
    h1: "Strony internetowe dla salonów kosmetycznych w Warszawie",
    metaTitle: "Strony dla salonu kosmetycznego w Warszawie | Sitelab",
    metaDescription:
      "Strona dla salonu beauty z rezerwacją, cennikiem zabiegów i galerią efektów. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Oferta · Salony kosmetyczne",
    lead: "Rezerwacja, cennik zabiegów i estetyka, która buduje zaufanie.",
    intro: [
      "W beauty liczy się zaufanie i wygoda. Klientka chce zobaczyć zabiegi, ceny i efekty, a potem umówić się bez dzwonienia w godzinach pracy.",
      "Projektuję strony salonów tak, żeby były zadbane jak samo miejsce: spokojna estetyka, czytelny cennik i prosta rezerwacja.",
    ],
    needs: [
      { title: "Rezerwacja online", desc: "Umawianie wizyt przez system albo formularz, dostępne całą dobę." },
      { title: "Cennik zabiegów", desc: "Przejrzysta lista zabiegów z cenami i krótkim opisem." },
      { title: "Galeria i efekty", desc: "Zdjęcia efektów i wnętrza, które budują zaufanie do salonu." },
      { title: "Estetyka spójna z marką", desc: "Kolory i typografia dobrane do charakteru miejsca, nie z szablonu." },
    ],
    exampleWorkId: "lila",
    faq: [
      { q: "Czy dodasz rezerwację online?", a: "Tak. Wpinam system rezerwacji, którego używasz, albo robię prosty formularz zgłoszeniowy." },
      { q: "Mam dużo zabiegów, jak to poukładać?", a: "Grupuję zabiegi w czytelne kategorie z cenami, żeby klientka szybko znalazła to, czego szuka." },
      { q: "Czy strona będzie pasować do mojego Instagrama?", a: "Tak. Dobieram kolory i styl tak, żeby strona i profil wyglądały jak jedna, spójna marka." },
      { q: "Ile trwa realizacja?", a: "Darmowy projekt w 24 godziny, gotowa strona w 72 godziny od akceptacji." },
    ],
    relatedDistricts: ["mokotow", "srodmiescie", "ochota"],
    relatedArticleSlug: "strona-internetowa-czy-instagram",
  },
  {
    slug: "strony-dla-kwiaciarni",
    key: "kwiaciarnia",
    navLabel: "Kwiaciarnie",
    h1: "Strony internetowe dla kwiaciarni w Warszawie",
    metaTitle: "Strony internetowe dla kwiaciarni w Warszawie | Sitelab",
    metaDescription:
      "Strona dla kwiaciarni z bukietami, cenami i dostawą tego samego dnia. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Oferta · Kwiaciarnie",
    lead: "Bukiety, ceny i dostawa tego samego dnia. Strona, która zbiera zamówienia.",
    intro: [
      "Kwiaty kupuje się szybko i pod wpływem chwili. Klient chce zobaczyć bukiety, poznać cenę i sprawdzić, czy zdążysz z dostawą na dziś.",
      "Robię strony kwiaciarni lekkie i pełne zdjęć, które prowadzą prosto do zamówienia. Bez gubienia klienta w wiadomościach.",
    ],
    needs: [
      { title: "Bukiety z cenami", desc: "Galeria kompozycji z cenami, żeby klient wiedział, na co się decyduje." },
      { title: "Dostawa tego samego dnia", desc: "Wyraźna informacja o dostawie i terminach, bo to często decyduje o zakupie." },
      { title: "Proste zamówienie", desc: "Jeden formularz albo szybki kontakt zamiast długiej wymiany wiadomości." },
      { title: "Sezonowa oprawa", desc: "Delikatny, jasny układ, który dobrze pokazuje kolory kwiatów." },
    ],
    exampleWorkId: "julia",
    faq: [
      { q: "Czy zrobicie sklep online?", a: "Na start wystarczy czytelna galeria bukietów z cenami i zamówieniem przez formularz lub wiadomość. Pełny sklep możemy dodać później, gdy będzie potrzebny." },
      { q: "Jak pokazać dostawę na dziś?", a: "Umieszczam informację o dostawie tego samego dnia w widocznym miejscu, razem z godziną graniczną na zamówienie." },
      { q: "Zdjęcia zmieniają się co sezon.", a: "Układam galerię tak, żeby wymiana zdjęć bukietów była szybka i nie psuła układu." },
      { q: "Ile to kosztuje?", a: "Strona wizytówka to 399 zł i cenę znasz przed startem. Projekt strony głównej robię najpierw za darmo." },
    ],
    relatedDistricts: ["srodmiescie", "zoliborz", "ochota"],
    relatedArticleSlug: "strona-internetowa-czy-instagram",
  },
  {
    slug: "strony-dla-piekarni",
    key: "piekarnia",
    navLabel: "Piekarnie i cukiernie",
    h1: "Strony internetowe dla piekarni i cukierni w Warszawie",
    metaTitle: "Strony dla piekarni i cukierni w Warszawie | Sitelab",
    metaDescription:
      "Strona dla piekarni i cukierni z ofertą, zamówieniami na okazje i lokalizacją. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
    kicker: "Oferta · Piekarnie i cukiernie",
    lead: "Świeża oferta, zamówienia na torty i lokalizacja od progu.",
    intro: [
      "Do piekarni i cukierni wraca się po smak i świeżość. W internecie klient szuka oferty, cen zamówień na okazje i tego, gdzie oraz kiedy jesteś otwarty.",
      "Projektuję strony, które od razu pokazują ofertę i ułatwiają zamówienie tortu czy pieczywa na większą okazję.",
    ],
    needs: [
      { title: "Apetyczna oferta", desc: "Zdjęcia wypieków i krótkie opisy, które budują ochotę na zakup." },
      { title: "Zamówienia na okazje", desc: "Prosty sposób na zamówienie tortu albo pieczywa na wydarzenie, z wyprzedzeniem." },
      { title: "Lokalizacje i godziny", desc: "Adresy punktów, godziny i mapa, jeśli masz więcej niż jedno miejsce." },
      { title: "Wersja mobilna", desc: "Szybka strona na telefon, bo tam klient sprawdza cię po drodze." },
    ],
    exampleWorkId: "chlebikawa",
    faq: [
      { q: "Mam kilka punktów, da się to pokazać?", a: "Tak. Układam listę lokalizacji z godzinami i mapą, żeby klient znalazł najbliższy punkt." },
      { q: "Chcę przyjmować zamówienia na torty.", a: "Robię prosty formularz zamówienia z wyborem terminu i opcji, żeby zgłoszenia nie ginęły." },
      { q: "Czy strona pomoże w Google?", a: "Tak. Strona z ofertą i lokalizacją pomaga pojawiać się na hasła typu piekarnia albo cukiernia i okolica." },
      { q: "Ile trwa realizacja?", a: "Darmowy projekt w 24 godziny, gotowa strona w 72 godziny od akceptacji." },
    ],
    relatedDistricts: ["wola", "praga-poludnie", "ochota"],
    relatedArticleSlug: "ile-kosztuje-strona-internetowa-dla-firmy",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
