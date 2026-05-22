import criarImagemProduto from "./imagem.component.js";
import {
    salvarCarrinho,
    removerCarrinho,
    produtoNoCarrinho
} from '../../../storage/carrinho/carrinho.storage.js';

export default function criarCardProduto(produto) {

    const card = document.createElement('div');
    card.className = 'card produto-card h-100 border-0 shadow-sm';

    // Container da imagem
    const imagemContainer = document.createElement('div');
    imagemContainer.className = 'overflow-hidden';

    // Imagem do produto
    const imagem = criarImagemProduto(produto);
    imagem.classList.add('card-img-top', 'produto-img');

    imagemContainer.appendChild(imagem);

    // Corpo do card
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    // Categoria
    const categoria = document.createElement('div');
    categoria.className = 'text-uppercase small fw-bold text-secondary';
    categoria.innerText = produto.categoria || 'Sem categoria';

    // Nome do produto
    const nome = document.createElement('h5');
    nome.className = 'card-title fw-bold mt-2';
    nome.innerText = produto.nome;

    // Preço
    const preco = document.createElement('p');
    preco.className = 'card-text text-success fw-bold fs-5';
    preco.innerText = `R$ ${produto.preco}`;

    // Botão adicionar ao carrinho
    const button = document.createElement('button');

    let noCarrinho = produtoNoCarrinho(produto);

    button.className = noCarrinho
        ? 'btn btn-success mt-auto'
        : 'btn btn-primary mt-auto';

    button.innerText = noCarrinho
        ? 'Adicionado'
        : 'Adicionar ao carrinho';

    // Evento do botão
    button.addEventListener('click', () => {

        noCarrinho = !noCarrinho;

        if (noCarrinho) {

            salvarCarrinho(produto);

            button.className = 'btn btn-success mt-auto';
            button.innerText = 'Adicionado';

        } else {

            removerCarrinho(produto);

            button.className = 'btn btn-primary mt-auto';
            button.innerText = 'Adicionar ao carrinho';
        }

    });

    // Montagem do card
    cardBody.append(categoria, nome, preco, button);

    card.append(imagemContainer, cardBody);

    return card;
}