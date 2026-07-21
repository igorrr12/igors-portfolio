// ─────────────────────────────────────────────────────────────
//  All page copy for „Galeria Sitelab". Polish, editorial tone.
// ─────────────────────────────────────────────────────────────

export const COVER = {
  kicker: "Warszawa 2026",
  /** Headline lines; `accent` overlaps the block as the oversized italic moment. */
  lines: ["Strony dla firm,", "które ogląda się"],
  accent: "jak sztukę",
  sub: "Sitelab. Pracownia stron internetowych dla lokalnych firm w Warszawie.",
  hint: "Przewiń, żeby zwiedzać",
};

export const EXHIBITION = {
  caption: "Wystawa",
  title: "Wybrane prace",
  /** Honest closing wall text. */
  note: "Prace na tej wystawie to projekty koncepcyjne dla prawdziwych warszawskich miejsc. Twoja strona powstaje tak samo: od charakteru Twojej firmy, nie od szablonu.",
};

export const CURATOR = {
  caption: "Nota kuratorska",
  title: "O podejściu",
  paragraphs: [
    "Dobra strona lokalnej firmy nie musi krzyczeć. Ma działać jak dobrze urządzone wnętrze: od progu wiadomo, gdzie jesteś, co dostaniesz i dlaczego warto zostać.",
    "Każdy projekt zaczynam od tego, co odróżnia Twoją firmę od sąsiada z tej samej ulicy. Potem dobieram typografię, kolor i rytm, aż strona wygląda jak Wasza, a nie jak szablon.",
  ],
};

export const PLACARD = {
  rows: [
    { label: "Projekt koncepcyjny", value: "darmowy, w 24 h" },
    { label: "Strona gotowa do publikacji", value: "od 399 zł" },
    { label: "Realizacja", value: "72 h" },
  ],
  note: "Cenę znasz przed startem. Na etapie projektu bez żadnych zobowiązań.",
};

export const PROCESS = {
  caption: "Proces",
  title: "Od rozmowy do gotowej strony",
  steps: [
    {
      nr: "01",
      title: "Rozmowa",
      desc: "Piszesz do mnie na Instagramie albo mailem. Kilka pytań o firmę, klientów i to, co strona ma robić.",
    },
    {
      nr: "02",
      title: "Projekt",
      desc: "W 24 godziny dostajesz darmowy projekt strony głównej. Oceniasz bez zobowiązań.",
    },
    {
      nr: "03",
      title: "Realizacja",
      desc: "Jeśli projekt się podoba, w 72 godziny powstaje całość: treści, wersja mobilna, szybkość.",
    },
    {
      nr: "04",
      title: "Publikacja",
      desc: "Strona trafia na Twoją domenę. Pomagam z Google i całą stroną techniczną.",
    },
  ],
};

export const CONTACT_SECTION = {
  caption: "Kontakt",
  title: "Napisz do mnie",
  sub: "Otworzę Twój czat na Instagramie z gotową wiadomością. Projekt strony głównej wraca do Ciebie w 24 godziny, za darmo.",
  fieldBusiness: "Nazwa Twojej firmy",
  fieldBusinessPlaceholder: "np. Barber Mokotów",
  fieldBusinessError: "Wpisz nazwę firmy, żebym wiedział, dla kogo projektuję.",
  fieldLink: "Instagram lub strona",
  fieldLinkOptional: "(opcjonalnie)",
  fieldLinkPlaceholder: "@twojafirma lub twojafirma.pl",
  submit: "Odbierz darmowy projekt",
  privacy: "Zero spamu. Jedna wiadomość, konkretna propozycja.",
  sentTitle: (business: string) => `Świetnie, ${business}!`,
  sentCopied:
    "Skopiowałem gotową wiadomość i otwieram Twój czat na Instagramie. Wklej ją i wyślij, a projekt wróci w 24 h.",
  sentManual:
    "Otwieram Twój czat na Instagramie. Skopiuj wiadomość poniżej i wyślij, a projekt wróci w 24 h.",
  copy: "Kopiuj wiadomość",
  copied: "Skopiowano",
  openInstagram: "Otwórz Instagram",
  preferEmail: "Wolisz e-mail?",
  altContactLead: "Nie używasz Instagrama?",
};

// ─── Cennik ───────────────────────────────────────────────────
export const CENNIK = {
  intro:
    "Bez ukrytych kosztów. Strona wizytówka to 399 zł, każde rozszerzenie ma cenę podaną z góry, a zanim cokolwiek zapłacisz, widzisz gotowy projekt strony głównej.",
  includes: [
    "Projekt strony głównej za darmo, zanim cokolwiek zapłacisz",
    "Gotowa strona wizytówka, dopasowana do Twojej firmy",
    "Wersja mobilna i szybkie ładowanie",
    "Treści napisane pod Twoich klientów i pod Google",
    "Podpięcie pod Twoją domenę i pomoc techniczna",
    "Podstawowa optymalizacja pod wyszukiwarkę",
  ],
  excludes: [
    "Rozbudowany sklep internetowy z płatnościami",
    "Systemy rezerwacji na abonamencie (mogę wpiąć Twój)",
    "Zdjęcia z profesjonalnej sesji (doradzę, jak zrobić dobre samemu)",
  ],
  excludesNote:
    "Jeśli potrzebujesz czegoś spoza tej listy, powiem wprost, ile to kosztuje, zanim zaczniemy.",
  faq: [
    { q: "Dlaczego stała cena, a nie wycena za godziny?", a: "Bo chcesz wiedzieć, ile zapłacisz, zanim zaczniemy. Strona wizytówka to 399 zł, a każde rozszerzenie ma cenę podaną z góry, bez dopłat po drodze." },
    { q: "Kiedy płacę?", a: "Po akceptacji projektu, nie z góry. Najpierw za darmo przygotowuję projekt strony głównej, a Ty decydujesz bez zobowiązań." },
    { q: "Czy są jakieś koszty co miesiąc?", a: "Tylko jeśli chcesz. Strona działa bez żadnych stałych opłat u mnie, zostaje domena i hosting, czyli kilkadziesiąt złotych rocznie u dostawcy. A jeśli wolisz nie myśleć o technikaliach, jest opcjonalna Opieka: 49 zł miesięcznie albo 490 zł za rok. W tym hosting, domena pod kontrolą, kopie zapasowe i drobne zmiany raz w miesiącu." },
    { q: "Co, jeśli potrzebuję czegoś więcej niż wizytówki?", a: "Powiem wprost, ile kosztuje dodatkowa funkcja, zanim się na nią zdecydujesz. Żadnych niespodzianek na fakturze." },
  ],
};

// ─── FAQ ──────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  { q: "Ile kosztuje strona?", a: "Strona wizytówka to 399 zł i cenę znasz przed startem. Projekt strony głównej przygotowuję najpierw za darmo, więc płacisz dopiero, gdy widzisz efekt. Rozszerzenia wyceniam z góry." },
  { q: "Co dostaję za darmo?", a: "Projekt strony głównej dopasowany do Twojej firmy, w 24 godziny i bez żadnych zobowiązań. Jeśli się nie spodoba, nic nie tracisz." },
  { q: "Ile trwa zrobienie strony?", a: "Projekt strony głównej w 24 godziny. Jeśli go akceptujesz, gotowa strona powstaje w 72 godziny." },
  { q: "Czy strona będzie działać na telefonie?", a: "Tak. Każdą stronę robię tak, żeby dobrze wyglądała i szybko działała na telefonie, bo tam trafia większość klientów." },
  { q: "Czyja jest domena i strona?", a: "Twoja. Stronę publikuję na Twojej domenie i na Twoim koncie, więc masz nad nią pełną kontrolę." },
  { q: "Nie mam jeszcze domeny.", a: "Pomogę ją wybrać i podpiąć. Domena to koszt kilkudziesięciu złotych rocznie, płacony bezpośrednio u rejestratora." },
  { q: "Czy pomożecie z Google?", a: "Tak. Robię podstawową optymalizację pod wyszukiwarkę i podpowiem, jak zadbać o wizytówkę w Mapach Google." },
  { q: "Jak wygląda kontakt i płatność?", a: "Piszemy na Instagramie, mailowo, albo po prostu dzwonisz: 579 997 261. Płatność następuje po akceptacji projektu, nie z góry." },
  { q: "Co, jeśli chcę później coś zmienić?", a: "Drobne poprawki po publikacji są naturalną częścią pracy. Jeśli wolisz mieć to z głowy na stałe, jest opcjonalna Opieka za 49 zł miesięcznie: hosting, kopie zapasowe i drobne zmiany raz w miesiącu. Większe rozbudowy wyceniam osobno i zawsze mówię cenę z góry." },
];

// ─── O mnie ───────────────────────────────────────────────────
export const O_MNIE = {
  lead:
    "Nazywam się Igor i projektuję strony dla lokalnych firm w Warszawie. Jednoosobowo, konkretnie i bez korporacyjnego żargonu.",
  paragraphs: [
    "Sitelab to nie agencja z działem sprzedaży. To ja i moja praca. Dzięki temu rozmawiasz bezpośrednio z osobą, która projektuje Twoją stronę, a nie z pośrednikiem.",
    "Pracuję inaczej niż większość. Najpierw, za darmo i w 24 godziny, przygotowuję projekt Twojej strony głównej. Oceniasz go bez żadnych zobowiązań. Płacisz dopiero wtedy, gdy widzisz efekt i chcesz go opublikować. Całe ryzyko jest po mojej stronie, nie Twojej.",
    "Każdą stronę zaczynam od tego, co odróżnia Twoją firmę od sąsiada z tej samej ulicy. Potem dobieram typografię, kolor i rytm, aż strona wygląda jak Wasza, a nie jak szablon. Zależy mi, żeby po wejściu od razu było wiadomo, gdzie się jest, co można dostać i dlaczego warto zostać.",
    "Prace w mojej galerii to projekty koncepcyjne dla prawdziwych warszawskich miejsc. Nie wymyślam opinii ani klientów, których nie mam. Wolę pokazać, jak pracuję, niż obiecywać rzeczy, których nie dowiozę.",
  ],
};
