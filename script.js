
document.addEventListener("DOMContentLoaded", function () {

    // Localiza os elementos da página
    const botoesComprar = document.querySelectorAll(".botao-comprar");
    const botaoAbrir = document.getElementById("abrir-carrinho");
    const botaoFechar = document.getElementById("fechar-carrinho");
    const areaCarrinho = document.getElementById("area-carrinho");
    const listaItens = document.getElementById("itens-carrinho");
    const quantidadeCarrinho = document.getElementById("quantidade-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");

    // Confere se os elementos existem
    if (
        !botaoAbrir ||
        !botaoFechar ||
        !areaCarrinho ||
        !listaItens ||
        !quantidadeCarrinho ||
        !totalCarrinho
    ) {
        console.error("Erro: confira os IDs do carrinho no index.html.");
        return;
    }

    // Guarda os produtos adicionados
    let carrinho = [];

    // Formata os valores em reais
    function moeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Adiciona um produto
    botoesComprar.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const nome = botao.dataset.nome;
            const preco = Number(botao.dataset.preco);

            if (!nome || !Number.isFinite(preco) || preco < 0) {
                alert("Não foi possível adicionar este produto.");
                return;
            }

            const produto = carrinho.find(function (item) {
                return item.nome === nome;
            });

            if (produto) {
                produto.quantidade++;
            } else {
                carrinho.push({
                    nome: nome,
                    preco: preco,
                    quantidade: 1
                });
            }

            atualizarCarrinho();

            // Confirma a adição
            const textoOriginal = "Adicionar à sacola";
            botao.textContent = "Adicionado! ✓";

            setTimeout(function () {
                botao.textContent = textoOriginal;
            }, 1200);
        });
    });

    // Atualiza a sacola e os valores
    function atualizarCarrinho() {
        listaItens.innerHTML = "";

        let quantidade = 0;
        let total = 0;

        if (carrinho.length === 0) {
            listaItens.textContent = "Sua sacola está vazia.";
        }

        carrinho.forEach(function (item) {
            quantidade += item.quantidade;
            total += item.preco * item.quantidade;

            const linha = document.createElement("div");
            linha.className = "item-carrinho";

            const informacoes = document.createElement("span");
            informacoes.textContent =
                item.nome + " — " + item.quantidade + " × " +
                moeda(item.preco);

            const remover = document.createElement("button");
            remover.type = "button";
            remover.textContent = "Remover";
            remover.className = "botao-remover";

            remover.addEventListener("click", function () {
                carrinho = carrinho.filter(function (produto) {
                    return produto.nome !== item.nome;
                });

                atualizarCarrinho();
            });

            linha.append(informacoes, remover);
            listaItens.appendChild(linha);
        });

        quantidadeCarrinho.textContent = quantidade;
        totalCarrinho.textContent = moeda(total);
    }

    // Abre a sacola
    botaoAbrir.addEventListener("click", function () {
        areaCarrinho.hidden = false;

        areaCarrinho.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    // Fecha a sacola
    botaoFechar.addEventListener("click", function () {
        areaCarrinho.hidden = true;
    });

    // Primeiro carregamento
    atualizarCarrinho();

    console.log("Carrinho AMETISTA'S carregado com sucesso!");
});
