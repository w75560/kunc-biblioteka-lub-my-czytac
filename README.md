Kunc Biblioteka
Kunc Biblioteka to prosta aplikacja internetowa do prowadzenia małej listy książek. Można dodać książkę, zobaczyć wszystkie zapisane pozycje i wejść w szczegóły wybranej książki.

Aplikacja jest napisana w HTML, CSS i JavaScript. Dane są zapisywane w bazie Supabase.

Co działa w aplikacji
dodawanie książki przez formularz,
wyświetlanie listy książek,
strona szczegółów książki,
ostatnio dodane książki na stronie głównej,
wyszukiwanie książek po tytule lub autorze,
filtrowanie po gatunku,
proste przełączanie ekranów w menu,
komunikaty błędów i ładowania,
podstawowa responsywność.
Technologie
HTML
CSS
JavaScript
Supabase
PostgreSQL w Supabase
Struktura projektu
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
Baza danych
Do projektu użyłem Supabase. Tabela nazywa się books.

Tabela ma takie pola:

id
title
author
description
genre
publication_year
cover_url
created_at
Żeby utworzyć tabelę:

Trzeba wejść do Supabase.
Otworzyć swój projekt.
Wejść w SQL Editor.
Wkleić kod z pliku database/schema.sql.
Uruchomić zapytanie przyciskiem Run.
Jeśli chcemy dodać przykładowe książki, można uruchomić też plik database/sample_data.sql.

Plik database/update_covers.sql aktualizuje okładki przykładowych książek.

Połączenie z Supabase
Po utworzeniu projektu w Supabase trzeba skopiować:

Project URL
anon public key
Te dane wpisuje się w pliku js/config.js:

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";
W projekcie używany jest publiczny klucz anon. Klucza service_role nie należy dodawać do kodu strony.

Jak uruchomić lokalnie
Najprościej uruchomić projekt przez Live Server w Visual Studio Code.

Otworzyć folder projektu.
Kliknąć prawym przyciskiem na index.html.
Wybrać Open with Live Server.
Można też użyć prostego serwera lokalnego, np.:

python -m http.server 5173
Jak działa aplikacja
index.html zawiera główny widok aplikacji. Jest tam menu, formularz dodawania książki, lista książek i wyszukiwarka.

js/app.js pobiera książki z Supabase, wyświetla je na stronie i obsługuje formularz dodawania książki.

Po kliknięciu w link Zobacz szczegóły otwiera się details.html. Ta strona pobiera z bazy jedną książkę po jej id.

js/details.js odpowiada za wyświetlanie szczegółów jednej książki.

Hosting
Projekt można opublikować jako zwykłą stronę statyczną, na przykład na:

Netlify
Vercel
GitHub Pages
Nie ma tutaj osobnego backendu, bo połączenie z bazą jest przez Supabase.

Co można dodać później
logowanie użytkowników,
role użytkownika i administratora,
oceny książek,
komentarze,
recenzje,
osobną stronę autorów,
lepsze zarządzanie okładkami.
Krótki opis do prezentacji
Moja aplikacja nazywa się Kunc Biblioteka. Jest to prosta strona do zapisywania książek. Użytkownik może dodać książkę przez formularz, zobaczyć listę książek i przejść do szczegółów wybranej pozycji.

Dane nie są zapisane tylko w przeglądarce, ale w bazie Supabase. Dzięki temu po odświeżeniu strony książki dalej są widoczne.

Projekt zrobiłem w HTML, CSS i JavaScript. Nie używałem frameworka, żeby kod był prostszy do zrozumienia.

Checklist

formularz dodawania książki,

zapis do bazy danych,

lista książek,

strona szczegółów,

wyszukiwanie,

filtrowanie,

proste menu,

instrukcja uruchomienia,

możliwość wdrożenia online.
