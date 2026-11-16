(function () {
    const listaBandas = document.getElementById("lista-bandas");
    const contadorBandas = document.getElementById("contador-bandas");
    const buscaBandas = document.getElementById("busca-bandas");

    function criarCartaoBanda(banda) {
        const cartao = document.createElement("article");
        cartao.className = "cartao-banda";

        const cabecalho = document.createElement("div");
        cabecalho.className = "cabecalho-cartao";

        const vertente = document.createElement("span");
        vertente.className = "categoria-evento";
        vertente.textContent = banda.vertente;
        cabecalho.appendChild(vertente);

        if (banda.destaque) {
            const destaque = document.createElement("span");
            destaque.className = "selo-destaque";
            destaque.textContent = "Headliner";
            cabecalho.appendChild(destaque);
        }

        const nome = document.createElement("h3");
        nome.className = "nome-banda";
        nome.textContent = banda.nome;

        const biografia = document.createElement("p");
        biografia.className = "biografia-banda";
        biografia.textContent = banda.biografia;

        const meta = document.createElement("div");
        meta.className = "meta-cartao";

        const cidade = document.createElement("span");
        cidade.className = "meta-item";
        cidade.textContent = "Origem: " + banda.cidade;

        const integrantes = document.createElement("span");
        integrantes.className = "meta-item";
        integrantes.textContent = "Formação: " + banda.integrantes;

        meta.appendChild(cidade);
        meta.appendChild(integrantes);

        const botaoShows = document.createElement("a");
        botaoShows.className = "link-detalhes";
        botaoShows.href = "index.html#agenda";
        botaoShows.textContent = "Ver Shows na Agenda";

        cartao.appendChild(cabecalho);
        cartao.appendChild(nome);
        cartao.appendChild(biografia);
        cartao.appendChild(meta);
        cartao.appendChild(botaoShows);

        return cartao;
    }

    function renderizarBandas() {
        const termo = (buscaBandas.value || "").trim().toLowerCase();
        const todas = EventosAPI.listarBandas();
        const filtradas = todas.filter(function (banda) {
            return !termo ||
                banda.nome.toLowerCase().includes(termo) ||
                banda.vertente.toLowerCase().includes(termo) ||
                banda.cidade.toLowerCase().includes(termo);
        });

        listaBandas.innerHTML = "";
        contadorBandas.textContent = filtradas.length + (filtradas.length === 1 ? " banda confirmada no circuito" : " bandas confirmadas no circuito");

        if (filtradas.length === 0) {
            const vazio = document.createElement("div");
            vazio.className = "estado-vazio";
            const msg = document.createElement("p");
            msg.textContent = "Nenhuma banda encontrada com esse termo.";
            vazio.appendChild(msg);
            listaBandas.appendChild(vazio);
            return;
        }

        filtradas.forEach(function (banda) {
            listaBandas.appendChild(criarCartaoBanda(banda));
        });
    }

    buscaBandas.addEventListener("input", renderizarBandas);
    renderizarBandas();
    EventosAPI.sincronizarComSupabase().then(renderizarBandas);
})();

