(function () {
    const listaLocais = document.getElementById("lista-locais");

    function criarCartaoLocal(local) {
        const cartao = document.createElement("article");
        cartao.className = "cartao-local";

        const cabecalho = document.createElement("div");
        cabecalho.className = "cabecalho-cartao";

        const bairro = document.createElement("span");
        bairro.className = "categoria-evento";
        bairro.textContent = local.bairroCidade;

        const capacidade = document.createElement("span");
        capacidade.className = "data-evento";
        capacidade.textContent = "Capacidade: " + local.capacidade + " pessoas";

        cabecalho.appendChild(bairro);
        cabecalho.appendChild(capacidade);

        const nome = document.createElement("h3");
        nome.className = "nome-local";
        nome.textContent = local.nome;

        const descricao = document.createElement("p");
        descricao.className = "descricao-local";
        descricao.textContent = local.descricao;

        const meta = document.createElement("div");
        meta.className = "meta-cartao";

        const endereco = document.createElement("span");
        endereco.className = "meta-item";
        endereco.textContent = "Endereço: " + local.endereco;

        const estrutura = document.createElement("span");
        estrutura.className = "meta-item";
        estrutura.textContent = "Estrutura: " + local.estrutura;

        meta.appendChild(endereco);
        meta.appendChild(estrutura);

        const linkAgenda = document.createElement("a");
        linkAgenda.className = "link-detalhes";
        linkAgenda.href = "index.html#agenda";
        linkAgenda.textContent = "Ver Shows neste Palco";

        cartao.appendChild(cabecalho);
        cartao.appendChild(nome);
        cartao.appendChild(descricao);
        cartao.appendChild(meta);
        cartao.appendChild(linkAgenda);

        return cartao;
    }

    async function inicializar() {
        await EventosAPI.sincronizarComSupabase();
        const locais = EventosAPI.listarLocais();
        listaLocais.innerHTML = "";
        locais.forEach(function (local) {
            listaLocais.appendChild(criarCartaoLocal(local));
        });
    }

    inicializar();
})();

