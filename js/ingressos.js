(function () {
    const listaIngressos = document.getElementById("lista-ingressos");
    const contadorIngressos = document.getElementById("contador-ingressos");
    const buscaIngresso = document.getElementById("busca-ingresso");

    function criarCartaoIngresso(inscricao) {
        const cartao = document.createElement("article");
        cartao.className = "cartao-evento";

        const cabecalho = document.createElement("div");
        cabecalho.className = "cabecalho-cartao";

        const selo = document.createElement("span");
        selo.className = "selo-destaque";
        selo.textContent = inscricao.codigoConfirmacao;

        const dataHora = document.createElement("span");
        dataHora.className = "data-evento";
        dataHora.textContent = "Emitido em " + inscricao.dataHora;

        cabecalho.appendChild(selo);
        cabecalho.appendChild(dataHora);

        const setor = document.createElement("span");
        setor.className = "categoria-evento";
        setor.textContent = inscricao.setorIngresso || "Pista Rock";

        const titulo = document.createElement("h3");
        titulo.className = "titulo-evento";
        titulo.textContent = inscricao.eventoTitulo;

        const titular = document.createElement("p");
        titular.className = "atracao-principal";
        titular.textContent = "Titular: " + inscricao.nome;

        const email = document.createElement("p");
        email.className = "local-evento";
        email.textContent = "E-mail: " + inscricao.email;

        const linkShow = document.createElement("a");
        linkShow.className = "link-detalhes";
        linkShow.href = "evento.html?id=" + encodeURIComponent(inscricao.eventoId);
        linkShow.textContent = "Ver Detalhes do Show";

        cartao.appendChild(cabecalho);
        cartao.appendChild(setor);
        cartao.appendChild(titulo);
        cartao.appendChild(titular);
        cartao.appendChild(email);
        cartao.appendChild(linkShow);

        return cartao;
    }

    function renderizarIngressos() {
        const termo = (buscaIngresso.value || "").trim().toLowerCase();
        const todos = EventosAPI.listarInscricoes();
        const filtrados = todos.filter(function (item) {
            return !termo ||
                item.codigoConfirmacao.toLowerCase().includes(termo) ||
                item.email.toLowerCase().includes(termo) ||
                item.nome.toLowerCase().includes(termo) ||
                item.eventoTitulo.toLowerCase().includes(termo);
        });

        listaIngressos.innerHTML = "";
        contadorIngressos.textContent = filtrados.length + (filtrados.length === 1 ? " ingresso emitido encontrado" : " ingressos emitidos encontrados");

        if (filtrados.length === 0) {
            const vazio = document.createElement("div");
            vazio.className = "estado-vazio";
            const msg = document.createElement("p");
            msg.textContent = "Nenhum ingresso encontrado para esta busca.";
            vazio.appendChild(msg);
            listaIngressos.appendChild(vazio);
            return;
        }

        filtrados.forEach(function (item) {
            listaIngressos.appendChild(criarCartaoIngresso(item));
        });
    }

    buscaIngresso.addEventListener("input", renderizarIngressos);
    renderizarIngressos();
    EventosAPI.sincronizarComSupabase().then(renderizarIngressos);
})();

