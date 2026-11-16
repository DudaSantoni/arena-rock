(function () {
    const urlValida = typeof SUPABASE_URL === "string" &&
        SUPABASE_URL.trim().startsWith("https://") &&
        !SUPABASE_URL.includes("SEU-PROJETO");

    const chaveValida = typeof SUPABASE_ANON_KEY === "string" &&
        SUPABASE_ANON_KEY.trim().length > 20 &&
        !SUPABASE_ANON_KEY.includes("SUA-CHAVE");

    if (urlValida && chaveValida && window.supabase && typeof window.supabase.createClient === "function") {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL.trim(), SUPABASE_ANON_KEY.trim());
        window.supabaseConfigurado = true;
    } else {
        window.supabaseClient = null;
        window.supabaseConfigurado = false;
    }
})();
