// All page copy + example data in one place, so the site stays easy to edit.

export type Example = {
  id: string;
  name: string;
  category: string;
  beforeSrc: string;
  afterSrc: string;
  /** The single improvement to highlight (required by brief). */
  label: string;
};

export const EXAMPLES: Example[] = [
  {
    id: "fryzjer",
    name: "Fryzjer Puławska",
    category: "Salon fryzjerski",
    beforeSrc: "/examples/fryzjer-before.png",
    afterSrc: "/examples/fryzjer-after.png",
    label: "Wyraźny przycisk rezerwacji nad linią zgięcia",
  },
  {
    id: "bambino",
    name: "Bar Bambino",
    category: "Bar mleczny",
    beforeSrc: "/examples/bambino-before.png",
    afterSrc: "/examples/bambino-after.png",
    label: "Prostsza nawigacja i menu w jednym kliknięciu",
  },
  {
    id: "julia",
    name: "Kwiaciarnia Julia",
    category: "Kwiaciarnia",
    beforeSrc: "/examples/julia-before.png",
    afterSrc: "/examples/julia-after.png",
    label: "Lepsza konwersja na telefonach",
  },
];

export type CaseStudy = {
  tag: string;
  problem: string;
  solution: string;
  outcome: string;
  metric: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Salon / barber",
    problem:
      "Klienci dzwonili tylko po to, żeby zapytać o wolne terminy i godziny otwarcia.",
    solution:
      "Rezerwacja online i cennik od razu na stronie głównej, widoczne na telefonie.",
    outcome:
      "Mniej telefonów z pytaniami, więcej wizyt umówionych samodzielnie przez klienta.",
    metric: "do +30% rezerwacji online",
  },
  {
    tag: "Restauracja / kawiarnia",
    problem:
      "Menu wisiało w PDF, który na telefonie otwierał się wolno i źle się czytał.",
    solution:
      "Czytelne menu na stronie i przycisk rezerwacji stolika nad linią zgięcia.",
    outcome:
      "Gość w kilka sekund widzi menu i rezerwuje stolik, zamiast zamykać stronę.",
    metric: "krótsza droga do rezerwacji",
  },
  {
    tag: "Usługi lokalne",
    problem:
      "Strona wyglądała staro i nie budziła zaufania osób, które trafiały z Google.",
    solution:
      "Świeży, spójny wygląd z opiniami, zdjęciami i jednym wyraźnym kontaktem.",
    outcome:
      "Więcej zapytań od nowych klientów z Google i Instagrama, mniej porzuceń.",
    metric: "wyższe zaufanie od pierwszej sekundy",
  },
];

export const INCLUDED: string[] = [
  "Projekt strony dopasowany do Twojej firmy i Twoich klientów",
  "Teksty, które realnie zachęcają do telefonu i rezerwacji",
  "Błyskawiczne działanie na telefonach, tam trafia większość klientów",
  "Wyraźne przyciski: zadzwoń, zarezerwuj, dojazd i napisz",
  "Podpięcie z Google i mapą, gotowe do publikacji",
  "Domena i hosting, wszystko ustawię za Ciebie",
];

export const STEPS: { title: string; desc: string }[] = [
  {
    title: "Zostawiasz nazwę firmy",
    desc: "Wpisujesz nazwę i link do Instagrama lub obecnej strony. Zajmuje minutę.",
  },
  {
    title: "Projektuję Twoją stronę",
    desc: "Przygotowuję projekt strony głównej dopasowany do Twojego biznesu.",
  },
  {
    title: "Dostajesz projekt w 24h",
    desc: "Wysyłam gotowy projekt na Instagramie. Podoba się, publikujemy w 72h.",
  },
];
