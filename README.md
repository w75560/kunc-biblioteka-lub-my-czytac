# Kunc Biblioteka

Kunc Biblioteka to prosta aplikacja internetowa przygotowana jako pierwszy działający etap projektu semestralnego z przedmiotu **Wprowadzenie do technologii internetowych**. Aplikacja pozwala dodać książkę, wyświetlić listę książek z bazy danych oraz zobaczyć szczegóły wybranej pozycji.

Projekt jest celowo prosty: bez frameworków, bez własnego backendu i bez narzędzi budowania. Dzięki temu łatwiej zrozumieć, co robi każdy plik.

## Spełnione wymagania nauczyciela

- aplikacja webowa z bazą danych,
- formularz dodawania książki,
- zapisywanie książek do tabeli `books` w Supabase,
- wyświetlanie listy dodanych książek,
- osobna strona ze szczegółami książki,
- sekcja ostatnio dodanych książek,
- wyszukiwanie po tytule lub autorze,
- filtrowanie książek po gatunku,
- przełączanie ekranów przez menu bez przewijania całej strony,
- możliwość uruchomienia online na hostingu statycznym,
- prosty model danych gotowy do dalszej rozbudowy,
- polski interfejs użytkownika,
- podstawowa walidacja formularza,
- komunikaty ładowania i błędów,
- responsywny wygląd na komputerze i telefonie.

## Technologie

- HTML,
- CSS,
- JavaScript,
- Supabase jako baza PostgreSQL i gotowe API,
- Supabase JavaScript client z CDN,
- hosting statyczny, na przykład Vercel, Netlify albo GitHub Pages.

## Struktura folderów

```text
mini-biblioteka-online/
├── index.html
├── details.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── supabaseClient.js
│   ├── app.js
│   └── details.js
├── database/
│   ├── schema.sql
│   ├── sample_data.sql
│   └── update_covers.sql
└── README.md
```

## Jak utworzyć bazę danych w Supabase

1. Wejdź na [supabase.com](https://supabase.com/) i utwórz nowy projekt.
2. Otwórz panel projektu.
3. Przejdź do **SQL Editor**.
4. Otwórz plik `database/schema.sql` z tego projektu.
5. Skopiuj całą zawartość pliku do edytora SQL w Supabase.
6. Kliknij **Run**.
7. Opcjonalnie otwórz `database/sample_data.sql`, wklej go do SQL Editor i uruchom, aby dodać 3 przykładowe książki.
8. Jeśli przykładowe książki mają stare adresy okładek, uruchom `database/update_covers.sql`.

Plik `schema.sql` tworzy tabelę `books`, włącza Row Level Security i dodaje proste polityki:

- publiczny odczyt książek,
- publiczne dodawanie książek.

To ustawienie pasuje do małego publicznego projektu demonstracyjnego.

## Jak połączyć frontend z Supabase

1. W Supabase przejdź do **Project Settings**.
2. Otwórz sekcję **API**.
3. Skopiuj **Project URL**.
4. Skopiuj publiczny klucz **anon public**.
5. Otwórz plik `js/config.js`.
6. Wklej dane w miejsce:

```js
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";
```

Po uzupełnieniu powinno to wyglądać podobnie do:

```js
const SUPABASE_URL = "https://twoj-projekt.supabase.co";
const SUPABASE_ANON_KEY = "twoj-publiczny-klucz-anon";
```

Nie wklejaj tutaj klucza `service_role`.

## Ważna uwaga o bezpieczeństwie

Frontend używa tylko publicznego klucza `anon`. Taki klucz może znajdować się w kodzie strony, ale dostęp do danych musi być ograniczony przez polityki RLS w Supabase. Klucz `service_role` jest tajny i nigdy nie wolno umieszczać go w plikach frontendowych, repozytorium ani publicznej stronie.

## Jak uruchomić lokalnie

Najprościej użyć rozszerzenia **Live Server** w Visual Studio Code:

1. Otwórz folder `mini-biblioteka-online` w VS Code.
2. Kliknij prawym przyciskiem `index.html`.
3. Wybierz **Open with Live Server**.

Można też uruchomić prosty serwer statyczny:

```bash
python -m http.server 5173
```

Następnie wejdź w przeglądarce na:

```text
http://localhost:5173
```

## Jak wdrożyć online

Przykładowa ścieżka:

1. Utwórz repozytorium na GitHubie.
2. Wgraj folder `mini-biblioteka-online`.
3. Połącz repozytorium z Vercel, Netlify albo GitHub Pages.
4. Ustaw folder projektu jako katalog publikacji, jeśli platforma o to poprosi.
5. Po wdrożeniu sprawdź, czy strona otwiera się online i czy zapis do Supabase działa.

Aplikacja jest statyczna, więc nie wymaga własnego serwera Node.js, PHP ani Pythona.

## Jak działa aplikacja

- `index.html` pokazuje opis projektu, formularz dodawania książki i listę książek.
- Po wysłaniu formularza `js/app.js` sprawdza wymagane pola i zapisuje rekord do tabeli `books`.
- Lista książek jest pobierana z Supabase i wyświetlana jako karty.
- Nad listą działa wyszukiwarka oraz filtr gatunku.
- Sekcja **Ostatnio dodane książki** pokazuje najnowsze rekordy z bazy.
- Menu u góry przełącza widoki: główna, książki, dodawanie książki i informacje o bibliotece.
- Link **Zobacz szczegóły** otwiera `details.html?id=...`.
- `js/details.js` odczytuje `id` z adresu strony i pobiera z Supabase jedną książkę.
- `js/supabaseClient.js` tworzy połączenie z bazą na podstawie danych z `js/config.js`.

## Co można rozwinąć później

- osobna strona autorów,
- kategorie książek,
- oceny książek,
- recenzje,
- komentarze,
- wyszukiwarka,
- logowanie,
- role administratora i zwykłego użytkownika.

## Krótki skrypt prezentacji

To jest moja aplikacja Kunc Biblioteka. Projekt jest inspirowany serwisami książkowymi, ale jest dużo prostszy, bo celem było przygotowanie pierwszego działającego minimum. Strona główna ma formularz dodawania książki oraz listę książek pobieraną z bazy Supabase. W formularzu wymagane są tytuł, autor i opis. Po zapisaniu książka trafia do tabeli `books` w bazie PostgreSQL. Każda karta ma przycisk **Zobacz szczegóły**, który przechodzi do osobnej strony i pobiera jeden rekord po identyfikatorze. Projekt można uruchomić lokalnie przez Live Server i wdrożyć jako statyczną stronę na Vercel, Netlify albo GitHub Pages. W przyszłości można dodać autorów, kategorie, oceny, recenzje, komentarze, wyszukiwanie i logowanie.

## Lista plików i ich rola

- `index.html` - strona główna, formularz i lista książek.
- `details.html` - strona szczegółów jednej książki.
- `css/style.css` - wygląd strony, karty książek, formularz i responsywność.
- `js/config.js` - miejsce na adres projektu Supabase i klucz `anon`.
- `js/supabaseClient.js` - tworzy klienta Supabase.
- `js/app.js` - obsługuje formularz, zapis i pobieranie listy książek.
- `js/details.js` - pobiera i wyświetla szczegóły książki.
- `database/schema.sql` - tworzy tabelę `books` i polityki RLS.
- `database/sample_data.sql` - dodaje trzy przykładowe książki.
- `database/update_covers.sql` - aktualizuje okładki przykładowych książek.
- `README.md` - instrukcja uruchomienia, wdrożenia i prezentacji projektu.

## Checklist przed oddaniem

- [ ] Utworzyć projekt w Supabase.
- [ ] Uruchomić `database/schema.sql`.
- [ ] Opcjonalnie uruchomić `database/sample_data.sql`.
- [ ] Wkleić `SUPABASE_URL` i `SUPABASE_ANON_KEY` do `js/config.js`.
- [ ] Uruchomić projekt lokalnie.
- [ ] Sprawdzić dodawanie książki.
- [ ] Sprawdzić listę książek.
- [ ] Sprawdzić wyszukiwanie i filtrowanie książek.
- [ ] Sprawdzić stronę szczegółów.
- [ ] Wdrożyć projekt online.
- [ ] Oddać link do strony online i link do repozytorium GitHub.
