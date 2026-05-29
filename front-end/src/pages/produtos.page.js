import criarColuna from '../components/shared/coluna-bootstrap.component.js';
import criarCardProduto from '../components/layout/produto/card.component.js';

export async function produtoPage() {

    const app = document.querySelector('#app');

    app.innerHTML = `
        <h1 class="fw-bold text-primary">🛍️ Produtos</h1>

        <div class="row mt-4" id="lista-produtos"></div>
    `;

    const row = document.querySelector('#lista-produtos');

    try {

        const response = await fetch('http://localhost:8000/produtos');

        const produtos = await response.json();

        produtos.forEach(produto => {

            const coluna = criarColuna();

            const card = criarCardProduto(produto);

            coluna.appendChild(card);

            row.appendChild(coluna);
        });

    } catch(error){

        row.innerHTML = `
            <p class="text-danger">
                Erro ao carregar produtos.
            </p>
        `;

        console.error(error);
    }
}