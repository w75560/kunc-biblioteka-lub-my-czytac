const bookForm = document.getElementById("book-form");
const formMessage = document.getElementById("form-message");
const booksList = document.getElementById("books-list");
const loadingBooks = document.getElementById("loading-books");
const booksError = document.getElementById("books-error");
const latestBooks = document.getElementById("latest-books");
const booksCount = document.getElementById("books-count");
const genresCount = document.getElementById("genres-count");
const newestYear = document.getElementById("newest-year");
const searchBooks = document.getElementById("search-books");
const genreFilter = document.getElementById("genre-filter");
const viewSections = document.querySelectorAll("[data-view]");
const navLinks = document.querySelectorAll("[data-view-link]");

let allBooks = [];

document.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    loadBooks();
    bookForm.addEventListener("submit", handleBookSubmit);
    searchBooks.addEventListener("input", renderFilteredBooks);
    genreFilter.addEventListener("change", renderFilteredBooks);
});

function setupNavigation() {
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showView(link.dataset.viewLink);
            history.pushState(null, "", link.getAttribute("href"));
        });
    });

    window.addEventListener("popstate", function () {
        showView(getViewFromHash());
    });

    showView(getViewFromHash());
}

function getViewFromHash() {
    const hash = window.location.hash.replace("#", "");
    const allowedViews = ["home", "books", "add-book", "about"];

    return allowedViews.includes(hash) ? hash : "home";
}

function showView(viewName) {
    viewSections.forEach(function (section) {
        section.classList.toggle("active-view", section.dataset.view === viewName);
    });

    navLinks.forEach(function (link) {
        link.classList.toggle("active-nav", link.dataset.viewLink === viewName);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadBooks() {
    booksList.innerHTML = "";
    booksError.textContent = "";
    loadingBooks.hidden = false;
    updateOverview([]);

    if (!window.supabaseClient) {
        loadingBooks.hidden = true;
        booksError.textContent = window.supabaseConfigError;
        renderEmptyState("Po uzupełnieniu konfiguracji pojawią się tutaj książki z bazy danych.");
        return;
    }

    const { data, error } = await window.supabaseClient
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

    loadingBooks.hidden = true;

    if (error) {
        booksError.textContent = "Nie udało się pobrać książek. Sprawdź połączenie z Supabase i polityki RLS.";
        return;
    }

    allBooks = data || [];
    updateOverview(allBooks);
    fillGenreFilter(allBooks);
    renderFilteredBooks();
}

async function handleBookSubmit(event) {
    event.preventDefault();
    formMessage.textContent = "";
    formMessage.className = "message";

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const description = document.getElementById("description").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const publicationYearValue = document.getElementById("publication_year").value;
    const coverUrl = document.getElementById("cover_url").value.trim();

    if (!title || !author || !description) {
        showFormMessage("Uzupełnij tytuł, autora i opis książki.", "error");
        return;
    }

    const publicationYear = publicationYearValue ? Number(publicationYearValue) : null;

    if (publicationYear !== null && (!Number.isInteger(publicationYear) || publicationYear < 0)) {
        showFormMessage("Rok wydania musi być poprawną liczbą.", "error");
        return;
    }

    if (!window.supabaseClient) {
        showFormMessage(window.supabaseConfigError, "error");
        return;
    }

    const newBook = {
        title: title,
        author: author,
        description: description,
        genre: genre || null,
        publication_year: publicationYear,
        cover_url: coverUrl || null
    };

    const { error } = await window.supabaseClient
        .from("books")
        .insert(newBook);

    if (error) {
        showFormMessage("Nie udało się zapisać książki. Sprawdź bazę danych i uprawnienia.", "error");
        return;
    }

    bookForm.reset();
    searchBooks.value = "";
    genreFilter.value = "";
    showFormMessage("Książka została dodana do bazy danych.", "success");
    loadBooks();
}

function renderFilteredBooks() {
    const searchText = searchBooks.value.trim().toLowerCase();
    const selectedGenre = genreFilter.value;

    const filteredBooks = allBooks.filter(function (book) {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const genre = book.genre || "";
        const matchesText = !searchText || title.includes(searchText) || author.includes(searchText);
        const matchesGenre = !selectedGenre || genre === selectedGenre;

        return matchesText && matchesGenre;
    });

    renderBooks(filteredBooks);
}

function renderBooks(books) {
    booksList.innerHTML = "";

    if (allBooks.length === 0) {
        renderEmptyState("Brak książek w bazie. Dodaj pierwszą książkę formularzem powyżej.");
        return;
    }

    if (books.length === 0) {
        renderEmptyState("Nie znaleziono książek pasujących do wybranych filtrów.");
        return;
    }

    books.forEach(function (book) {
        booksList.appendChild(createBookCard(book));
    });
}

function updateOverview(books) {
    booksCount.textContent = String(books.length);

    const genres = books
        .map(function (book) {
            return book.genre;
        })
        .filter(Boolean);

    genresCount.textContent = String(new Set(genres).size);

    const years = books
        .map(function (book) {
            return book.publication_year;
        })
        .filter(function (year) {
            return Number.isInteger(year);
        });

    newestYear.textContent = years.length > 0 ? String(Math.max(...years)) : "-";
    renderLatestBooks(books.slice(0, 3));
}

function renderLatestBooks(books) {
    latestBooks.innerHTML = "";

    if (books.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Po dodaniu książek pojawią się tutaj najnowsze pozycje.";
        latestBooks.appendChild(empty);
        return;
    }

    books.forEach(function (book) {
        const item = document.createElement("article");
        item.className = "latest-item";

        const text = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = book.title;

        const author = document.createElement("span");
        author.textContent = book.author;

        const link = document.createElement("a");
        link.href = "details.html?id=" + encodeURIComponent(book.id);
        link.textContent = "Szczegóły";

        text.append(title, author);
        item.append(text, link);
        latestBooks.appendChild(item);
    });
}

function fillGenreFilter(books) {
    const selectedGenre = genreFilter.value;
    const genres = books
        .map(function (book) {
            return book.genre;
        })
        .filter(Boolean)
        .sort();

    const uniqueGenres = Array.from(new Set(genres));

    genreFilter.innerHTML = '<option value="">Wszystkie gatunki</option>';

    uniqueGenres.forEach(function (genre) {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });

    if (uniqueGenres.includes(selectedGenre)) {
        genreFilter.value = selectedGenre;
    }
}

function createBookCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";

    if (book.cover_url) {
        const cover = document.createElement("img");
        cover.className = "book-cover";
        cover.src = book.cover_url;
        cover.alt = "Okładka książki: " + book.title;
        cover.onerror = function () {
            cover.replaceWith(createCoverPlaceholder());
        };
        card.appendChild(cover);
    } else {
        card.appendChild(createCoverPlaceholder());
    }

    const content = document.createElement("div");
    content.className = "book-card-content";

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = "Autor: " + book.author;

    const meta = document.createElement("p");
    meta.className = "book-meta";
    meta.textContent = formatBookMeta(book);

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "details.html?id=" + encodeURIComponent(book.id);
    link.textContent = "Zobacz szczegóły";

    content.append(title, author, meta, link);
    card.appendChild(content);

    return card;
}

function createCoverPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "cover-placeholder";
    placeholder.textContent = "Brak okładki";
    return placeholder;
}

function formatBookMeta(book) {
    const parts = [];

    if (book.genre) {
        parts.push(book.genre);
    }

    if (book.publication_year) {
        parts.push(String(book.publication_year));
    }

    return parts.length > 0 ? parts.join(" / ") : "Brak gatunku i roku wydania";
}

function renderEmptyState(text) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = text;
    booksList.appendChild(empty);
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type === "success" ? "message success-message" : "message error-message";
}
