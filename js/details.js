const loadingBook = document.getElementById("loading-book");
const bookError = document.getElementById("book-error");
const bookDetails = document.getElementById("book-details");

document.addEventListener("DOMContentLoaded", function () {
    loadBookDetails();
});

async function loadBookDetails() {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (!bookId) {
        showError("Brakuje identyfikatora książki w adresie strony.");
        return;
    }

    if (!window.supabaseClient) {
        showError(window.supabaseConfigError);
        return;
    }

    const { data, error } = await window.supabaseClient
        .from("books")
        .select("*")
        .eq("id", bookId)
        .single();

    if (error) {
        showError("Nie udało się pobrać szczegółów książki. Sprawdź, czy rekord istnieje w bazie.");
        return;
    }

    renderBookDetails(data);
}

function renderBookDetails(book) {
    loadingBook.hidden = true;
    bookError.textContent = "";
    bookDetails.hidden = false;

    const detailCover = document.getElementById("detail-cover");
    detailCover.innerHTML = "";

    if (book.cover_url) {
        const cover = document.createElement("img");
        cover.src = book.cover_url;
        cover.alt = "Okładka książki: " + book.title;
        cover.onerror = function () {
            detailCover.innerHTML = "";
            detailCover.appendChild(createDetailPlaceholder());
        };
        detailCover.appendChild(cover);
    } else {
        detailCover.appendChild(createDetailPlaceholder());
    }

    document.getElementById("detail-genre").textContent = book.genre || "Brak podanego gatunku";
    document.getElementById("detail-title").textContent = book.title;
    document.getElementById("detail-author").textContent = "Autor: " + book.author;
    document.getElementById("detail-year").textContent = book.publication_year
        ? "Rok wydania: " + book.publication_year
        : "Rok wydania: brak informacji";
    document.getElementById("detail-description").textContent = book.description;
}

function createDetailPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "detail-placeholder";
    placeholder.textContent = "Brak okładki";
    return placeholder;
}

function showError(message) {
    loadingBook.hidden = true;
    bookDetails.hidden = true;
    bookError.textContent = message;
}
