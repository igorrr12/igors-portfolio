// ─────────────────────────────────────────────────────────────
//  All page copy for „Galeria Sitelab". Polish, editorial tone.
// ─────────────────────────────────────────────────────────────

export const COVER = {
  kicker: "Wystawa stała · Warszawa 2026",
  /** Headline lines; `accent` overlaps the block as the oversized italic moment. */
  lines: ["Strony dla firm,", "które ogląda się"],
  accent: "jak sztukę",
  sub: "Sitelab. Pracownia stron internetowych dla lokalnych firm w Warszawie.",
  hint: "Przewiń, żeby zwiedzać",
};

export const EXHIBITION = {
  caption: "Wystawa",
  title: "Trzy prace",
  /** Honest closing wall text. */
  note: "Prace na tej wystawie to projekty koncepcyjne. Twoja strona powstaje tak samo: od charakteru Twojej firmy, nie od szablonu.",
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
    { label: "Strona gotowa do publikacji", value: "399 zł" },
    { label: "Realizacja", value: "72 h" },
  ],
  note: "Cena stała. Na etapie projektu bez żadnych zobowiązań.",
};

export const PROCESS = {
  caption: "Proces",
  title: "Od rozmowy do wernisażu",
  steps: [
    {
      nr: "01",
      title: "Rozmowa",
      desc: "Piszesz do mnie na Instagramie. Kilka pytań o firmę, klientów i to, co strona ma robić.",
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

export const GUESTBOOK = {
  caption: "Księga gości",
  title: "Zostaw wpis",
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
};
