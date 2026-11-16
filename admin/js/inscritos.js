(function () {
    const seletorEvento = document.getElementById("filtro-evento");
    const corpoTabela = document.getElementById("tabela-inscritos");

    function obterFiltroDaUrl() {
        return new URLSearchParams(window.location.search).get("evento") || "";
    }

    function carregarOpcoesFiltro() {
        const eventos = EventosAPI.listarEventos();
        const filtroInicial = obterFiltroDaUrl();

        seletorEvento.innerHTML = '<option value="">Todos os shows</option>' +
            eventos.map(function (ev) {
                const selecionado = (String(ev.id) === String(filtroInicial) || String(ev.idBanco) === String(filtroInicial)) ? "selected" : "";
                return `<option value="${ev.id}" ${selecionado}>${ev.titulo}</option>`;
            }).join("");
    }

    function renderizarInscritos() {
        const eventoSelecionado = seletorEvento.value;
        const todas = EventosAPI.listarInscricoes();

        const filtradas = todas.filter(function (item) {
            return !eventoSelecionado || String(item.eventoId) === String(eventoSelecionado);
        });

        if (filtradas.length === 0) {
            corpoTabela.innerHTML = `
                <tr>
                    <td colspan="7">Nenhuma inscrição encontrada para este filtro.</td>
                </tr>
            `;
            return;
        }

        corpoTabela.innerHTML = filtradas.map(function (item) {
            return `
                <tr data-evento="${item.eventoId}">
                    <td><strong>${item.nome}</strong></td>
                    <td>${item.email}</td>
                    <td>${item.eventoTitulo}</td>
                    <td><span class="categoria-evento">${item.setorIngresso || "Pista Rock"}</span></td>
                    <td>${item.dataHora}</td>
                    <td><strong>${item.codigoConfirmacao}</strong></td>
                    <td class="acoes-tabela">
                        <button type="button" class="botao-pequeno botao-excluir" data-id="${item.id}">Remover</button>
                    </td>
                </tr>
            `;
        }).join("");

        corpoTabela.querySelectorAll(".botao-excluir").forEach(function (botao) {
            botao.addEventListener("click", async function () {
                const id = this.getAttribute("data-id");
                if (window.supabaseConfigurado && window.supabaseClient) {
                    await window.supabaseClient.from("inscricoes").delete().eq("id", id);
                }
                EventosAPI.removerInscricaoLocal(id);
                renderizarInscritos();
            });
        });
    }

    async function inicializar() {
        await EventosAPI.sincronizarComSupabase();
        carregarOpcoesFiltro();
        renderizarInscritos();
        seletorEvento.addEventListener("change", renderizarInscritos);
    }

    document.addEventListener("DOMContentLoaded", inicializar);
})();
