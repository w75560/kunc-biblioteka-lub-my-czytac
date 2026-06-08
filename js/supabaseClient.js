// Ten plik tworzy połączenie z Supabase po uzupełnieniu danych w config.js.
(function () {
    const missingConfig =
        !SUPABASE_URL ||
        !SUPABASE_ANON_KEY ||
        SUPABASE_URL.includes("PASTE_YOUR") ||
        SUPABASE_ANON_KEY.includes("PASTE_YOUR");

    if (missingConfig) {
        window.supabaseClient = null;
        window.supabaseConfigError = "Uzupełnij SUPABASE_URL i SUPABASE_ANON_KEY w pliku js/config.js.";
        return;
    }

    try {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabaseConfigError = "";
    } catch (error) {
        window.supabaseClient = null;
        window.supabaseConfigError = "Nie udało się utworzyć połączenia z Supabase: " + error.message;
    }
})();
