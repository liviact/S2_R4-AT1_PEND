import {
    listarCarrinho,
    removerCarrinho,
} from '../storage/carrinho/carrinho.storage.js';

import criarColuna from '../components/shared/coluna-bootstrap.component.js';
import criarCardProduto from '../components/layout/produto/card.component.js';

export async function carrinhoPage() {

    const app = document.querySelector('#app');

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            
            <div>
                <h1 class="fw-bold text-success">
                    🛒 Carrinho
                </h1>

                <p class="text-secondary m-0">
                    Itens no carrinho:
                    <span id="quantidade-carrinho"></span>
                </p>
            </div>

            <button
                class="btn btn-danger"
                id="limpar-carrinho"
            >
                Limpar Carrinho
            </button>
        </div>

        <div class="mt-3">
            <h4>
                Total:
                R$ <span id="total-carrinho"></span>
            </h4>
        </div>

        <div class="row mt-4" id="lista-carrinho"></div>
    `;

    const row = document.querySelector('#lista-carrinho');

    const quantidadeElement =
        document.querySelector('#quantidade-carrinho');

    const totalElement =
        document.querySelector('#total-carrinho');

    const botaoLimpar =
        document.querySelector('#limpar-carrinho');

    function atualizarResumo() {

        quantidadeElement.textContent =
            quantidadeCarrinho();

        totalElement.textContent =
            totalCarrinho().toFixed(2);
    }

    const produtos = listarCarrinho();

    if (produtos.length === 0) {

        row.innerHTML = `
            <div class="col-12">
                <p class="text-secondary fs-5">
                    Seu carrinho está vazio.
                </p>
            </div>
        `;

        atualizarResumo();

        return;
    }

    produtos.forEach(produto => {

        const coluna = criarColuna();

        const card = criarCardProduto(produto);

        const button = card.querySelector('button');

        button.textContent = 'Remover';

        button.classList.remove(
            'btn-outline-primary'
        );

        button.classList.add(
            'btn-outline-danger'
        );

        button.addEventListener('click', () => {

            removerCarrinho(produto);

            coluna.remove();

            atualizarResumo();

            const itensRestantes =
                listarCarrinho();

            if (itensRestantes.length === 0) {

                row.innerHTML = `
                    <div class="col-12">
                        <p class="text-secondary fs-5">
                            Seu carrinho está vazio.
                        </p>
                    </div>
                `;
            }
        });

        coluna.appendChild(card);

        row.appendChild(coluna);
    });

    botaoLimpar.addEventListener('click', () => {

        limparCarrinho();

        row.innerHTML = `
            <div class="col-12">
                <p class="text-secondary fs-5">
                    Seu carrinho está vazio.
                </p>
            </div>
        `;

        atualizarResumo();
    });

    atualizarResumo();
}