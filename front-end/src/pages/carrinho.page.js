import {
    listarCarrinho,
    removerCarrinho,
    limparCarrinho,
    quantidadeCarrinho,
    totalCarrinho,
    aumentarQuantidade,
    diminuirQuantidade
} from '../storage/carrinho/carrinho.storage.js';

export async function carrinhoPage() {

    const app = document.querySelector('#app');

    const produtos = listarCarrinho();

    app.innerHTML = `
    
        <div class="carrinho-topo">

            <div>
                <h1>Carrinho</h1>

                <p class="info-carrinho">
                    ${quantidadeCarrinho()} itens
                </p>
            </div>

            <button
                class="btn btn-danger"
                id="limpar-carrinho"
            >
                Limpar Carrinho
            </button>

        </div>

        <div class="carrinho-resumo">

            <div class="resumo-card">
                <span>Subtotal</span>
                <strong>
                    R$ ${totalCarrinho().toFixed(2)}
                </strong>
            </div>

            <div class="resumo-card">
                <span>Frete</span>
                <strong>Grátis</strong>
            </div>

            <div class="resumo-total">
                <span>Total</span>

                <strong>
                    R$ ${totalCarrinho().toFixed(2)}
                </strong>
            </div>

        </div>

        <div class="row" id="lista-carrinho"></div>
    `;

    const row =
        document.querySelector('#lista-carrinho');

    const btnLimpar =
        document.querySelector('#limpar-carrinho');

    if (produtos.length === 0) {

        row.innerHTML = `
        
            <div class="col-12">

                <p class="text-secondary fs-5">
                    Seu carrinho está vazio.
                </p>

            </div>
        `;

        return;
    }

    produtos.forEach(produto => {

        const coluna =
            document.createElement('div');

        coluna.className = 'col-6';

        coluna.innerHTML = `
        
            <div class="produto-card">

                <img
                    class="produto-img"
                    src="http://localhost:8000/uploads/imagens/${encodeURIComponent(produto.Imagem)}"
                >

                <div class="card-body">

                    <h5 class="card-title">
                        ${produto.Nome}
                    </h5>

                    <p class="card-text">
                        R$ ${produto.Preco}
                    </p>

                    <div class="quantidade-box">

                        <button
                            class="btn-qtd diminuir"
                        >
                            -
                        </button>

                        <span>
                            ${produto.quantidade}
                        </span>

                        <button
                            class="btn-qtd aumentar"
                        >
                            +
                        </button>

                    </div>

                    <p class="subtotal-item">
                        Subtotal:
                        R$ ${(produto.Preco * produto.quantidade).toFixed(2)}
                    </p>

                    <button class="btn btn-danger remover">
                        Remover
                    </button>

                </div>

            </div>
        `;

        coluna.querySelector('.aumentar')
            .addEventListener('click', () => {

                aumentarQuantidade(produto);

                carrinhoPage();

            });

        coluna.querySelector('.diminuir')
            .addEventListener('click', () => {

                diminuirQuantidade(produto);

                carrinhoPage();

            });

        coluna.querySelector('.remover')
            .addEventListener('click', () => {

                removerCarrinho(produto);

                carrinhoPage();

            });

        row.appendChild(coluna);
    });

    btnLimpar.addEventListener('click', () => {

        limparCarrinho();

        carrinhoPage();

    });
}