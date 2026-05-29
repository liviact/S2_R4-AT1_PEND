import criarImagemProduto from "./imagem.component.js";

import {
    removerCarrinho,
    produtoNoCarrinho
} from '../../../storage/carrinho/carrinho.storage.js';

import {
    criarAdicionarCarrinho,
    criarComprarAgora
} from "./button.component.js"

export default function criarCardProduto(produto) {

    const card = document.createElement('div');

    // largura total do card
    card.className =
        'card produto-card h-100 w-100 border-0 shadow-sm';

    // Container da imagem
    const imagemContainer = document.createElement('div');

    imagemContainer.className = 'overflow-hidden';

    // Imagem do produto
    const imagem = criarImagemProduto(produto);

    imagem.classList.add(
        'card-img-top',
        'produto-img'
    );

    imagemContainer.appendChild(imagem);

    // Corpo do card
    const cardBody = document.createElement('div');

    cardBody.className =
        'card-body d-flex flex-column';

    // Categoria
    const categoria = document.createElement('div');

    categoria.className =
        'text-uppercase small fw-bold text-secondary';

    categoria.innerText =
        produto.Categoria || 'Sem categoria';

    // Nome
    const nome = document.createElement('h5');

    nome.className =
        'card-title fw-bold mt-2';

    nome.innerText = produto.Nome;

    // Preço
    const preco = document.createElement('p');

    preco.className =
        'card-text text-success fw-bold fs-5';

    preco.innerText = `R$ ${produto.Preco}`;

    // Botão
    const divButtons = document.createElement("div");
    divButtons.className = 'd-flex gap-2 w-100';

    const buttonAdicionar = criarAdicionarCarrinho(produto);
    const buttonComprar = criarComprarAgora(produto);

    divButtons.append(buttonAdicionar, buttonComprar);

    // Montagem
    cardBody.append(
        categoria,
        nome,
        preco,
        divButtons
    );

    card.append(
        imagemContainer,
        cardBody
    );

    return card;
}