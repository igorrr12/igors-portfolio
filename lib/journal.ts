// ─────────────────────────────────────────────────────────────
//  Dziennik (journal). Editorial articles, one object each → one
//  page at /dziennik/<slug>. Body is a small typed block model so
//  there is no MDX dependency.
// ─────────────────────────────────────────────────────────────

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type RelatedLink = { label: string; href: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** ISO date. */
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  body: Block[];
  related: RelatedLink[];
};

export const ARTICLES: Article[] = [
  {
    slug: "ile-kosztuje-strona-internetowa-dla-firmy",
    title: "Ile kosztuje strona internetowa dla małej firmy w Warszawie?",
    metaTitle: "Ile kosztuje strona internetowa dla firmy? | Sitelab",
    metaDescription:
      "Od czego zależy cena strony internetowej dla małej firmy w Warszawie i ile realnie trzeba wydać. Konkretnie, bez ukrytych kosztów.",
    excerpt:
      "Od czego zależy cena strony, gdzie są ukryte koszty i ile realnie kosztuje dobra strona dla małej firmy.",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
    readingMinutes: 4,
    body: [
      { type: "p", text: "Pytanie o cenę strony pada zwykle jako pierwsze, a najczęstsza odpowiedź brzmi: to zależy. To prawda, ale mało pomocna. Poniżej rozkładam koszt na czynniki, żebyś wiedział, za co naprawdę się płaci." },
      { type: "h2", text: "Od czego zależy cena" },
      { type: "p", text: "Na koszt wpływa przede wszystkim zakres: ile podstron, czy potrzebny jest sklep, rezerwacje, blog, wersje językowe. Prosta, dobrze zaprojektowana strona wizytówka dla lokalnej firmy to zupełnie inny nakład pracy niż sklep z setką produktów." },
      { type: "ul", items: ["Liczba podstron i sekcji", "Sklep, rezerwacje albo inne funkcje", "Przygotowanie treści i zdjęć", "Indywidualny projekt czy gotowy szablon"] },
      { type: "h2", text: "Ukryte koszty, o których się nie mówi" },
      { type: "p", text: "Cena samego wykonania to nie wszystko. Dochodzi domena, czyli adres strony, i hosting, czyli miejsce, w którym strona jest publikowana. Czasem dokładane są opłaty za każdą drobną zmianę albo abonament, który rośnie z czasem." },
      { type: "p", text: "Dlatego warto pytać wprost: co jest w cenie, co kosztuje dodatkowo i ile zapłacę za rok utrzymania. Brak jasnej odpowiedzi to sygnał ostrzegawczy." },
      { type: "h2", text: "Ile realnie kosztuje strona dla małej firmy" },
      { type: "p", text: "Dla lokalnej firmy w Warszawie sensowna, szybka i dobrze wyglądająca strona wizytówka to wydatek rzędu kilkuset złotych, o ile ma jasny zakres. U mnie jest to stała cena 399 zł za gotową stronę, a projekt strony głównej dostajesz najpierw za darmo, żeby ocenić efekt bez ryzyka." },
      { type: "p", text: "Najważniejsze, żeby cena była z góry znana i nie rosła po drodze. Wtedy strona jest inwestycją, a nie otwartym rachunkiem." },
    ],
    related: [
      { label: "Zobacz cennik", href: "/cennik" },
      { label: "Oferta dla Twojej branży", href: "/oferta" },
    ],
  },
  {
    slug: "czego-potrzebuje-strona-restauracji",
    title: "Czego naprawdę potrzebuje strona restauracji",
    metaTitle: "Czego potrzebuje strona restauracji | Sitelab",
    metaDescription:
      "Menu, ceny, rezerwacja i zdjęcia. Co musi mieć strona restauracji w Warszawie, żeby zapełniać stoliki, a nie tylko wyglądać.",
    excerpt:
      "Menu, ceny, rezerwacja i zdjęcia. Cztery rzeczy, które decydują, czy gość zarezerwuje stolik, czy pójdzie dalej.",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
    readingMinutes: 4,
    body: [
      { type: "p", text: "Strona restauracji ma jedno zadanie: zamienić kogoś, kto szuka miejsca na obiad, w gościa przy stoliku. Wystarczą do tego cztery rzeczy, a i tak najczęściej którejś z nich brakuje." },
      { type: "h2", text: "Menu i ceny od razu" },
      { type: "p", text: "To pierwsza rzecz, jakiej szuka klient. Menu ukryte w PDF, który nie otwiera się na telefonie, albo w ogóle jego brak, to najprostszy sposób na utratę gościa. Menu powinno być wprost na stronie, czytelne i aktualne." },
      { type: "h2", text: "Prosta rezerwacja lub kontakt" },
      { type: "p", text: "Kiedy gość już się zdecyduje, nie może szukać, jak zarezerwować. Wyraźny przycisk do rezerwacji albo telefonu, widoczny od początku, robi ogromną różnicę." },
      { type: "h2", text: "Zdjęcia, które budzą apetyt" },
      { type: "p", text: "Prawdziwe zdjęcia jedzenia i wnętrza działają lepiej niż jakikolwiek opis. Nie muszą być z profesjonalnej sesji, ale muszą być Twoje i dobrze pokazywać to, co podajesz." },
      { type: "h2", text: "Godziny i lokalizacja" },
      { type: "p", text: "Godziny otwarcia, adres i mapa to podstawa, a mimo to często są schowane. Powinny być widoczne od pierwszego ekranu, zwłaszcza na telefonie." },
      { type: "p", text: "Te cztery elementy załatwiają większość pracy. Reszta, jak historia miejsca czy opinie, dokłada zaufania, ale bez podstaw nawet najładniejsza strona nie zapełni stolików." },
    ],
    related: [
      { label: "Strony dla restauracji", href: "/strony-dla-restauracji" },
      { label: "Zobacz realizacje", href: "/realizacje" },
    ],
  },
  {
    slug: "strona-internetowa-czy-instagram",
    title: "Strona internetowa czy tylko Instagram?",
    metaTitle: "Strona internetowa czy Instagram? | Sitelab",
    metaDescription:
      "Czy lokalnej firmie w Warszawie wystarczy Instagram, czy potrzebna jest strona. Krótko o tym, co dają razem, a czego nie zastąpią.",
    excerpt:
      "Czy sam Instagram wystarczy lokalnej firmie? Krótko o tym, co profil robi dobrze, a gdzie potrzebna jest strona.",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
    readingMinutes: 3,
    body: [
      { type: "p", text: "Wiele lokalnych firm w Warszawie działa dziś wyłącznie na Instagramie i idzie im nieźle. Naturalne jest więc pytanie: po co mi strona, skoro mam profil?" },
      { type: "h2", text: "Co Instagram robi dobrze" },
      { type: "p", text: "Instagram jest świetny do pokazywania na bieżąco, co się dzieje: nowe dania, efekty pracy, klimat miejsca. Buduje relację i przypomina o Tobie osobom, które już Cię znają." },
      { type: "h2", text: "Czego Instagram nie zastąpi" },
      { type: "p", text: "Problem zaczyna się, gdy ktoś szuka Cię w Google, a nie na Instagramie. Profil słabo pojawia się w wynikach wyszukiwania, nie masz nad nim pełnej kontroli, a najważniejsze informacje giną między postami. Klient musi je wyłuskiwać, zamiast znaleźć w kilka sekund." },
      { type: "ul", items: ["Widoczność w Google na hasła typu usługa i dzielnica", "Stały adres, którego nie zmienia algorytm", "Menu, cennik i godziny w jednym, czytelnym miejscu", "Pełna kontrola nad tym, jak wygląda Twoja firma"] },
      { type: "h2", text: "Najlepiej razem" },
      { type: "p", text: "To nie jest wybór albo-albo. Strona i Instagram grają razem: profil pokazuje życie firmy, a strona łapie osoby z Google i zbiera wszystko w jednym miejscu. Jedno linkuje do drugiego i razem pracują na klienta." },
      { type: "p", text: "Jeśli masz już mocny profil, strona jest naturalnym kolejnym krokiem, a nie konkurencją dla Instagrama." },
    ],
    related: [
      { label: "Zobacz ofertę", href: "/oferta" },
      { label: "Ile kosztuje strona", href: "/cennik" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
