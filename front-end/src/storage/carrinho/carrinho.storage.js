const CHAVE = 'carrinho';

// Adicionar produto ao carrinho
export function salvarCarrinho(produto) {

    const carrinho = JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );

    const itemExistente = carrinho.find(
        item => item.Id === produto.Id
    );

    if (itemExistente) {

        itemExistente.quantidade += 1;

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });

    }

    localStorage.setItem(
        CHAVE,
        JSON.stringify(carrinho)
    );
}

// Aumentar quantidade
export function aumentarQuantidade(produto) {

    const carrinho = listarCarrinho();

    const item = carrinho.find(
        item => item.Id === produto.Id
    );

    if (item) {

        item.quantidade += 1;

        localStorage.setItem(
            CHAVE,
            JSON.stringify(carrinho)
        );
    }
}

// Diminuir quantidade
export function diminuirQuantidade(produto) {

    const carrinho = listarCarrinho();

    const item = carrinho.find(
        item => item.Id === produto.Id
    );

    if (!item) return;

    item.quantidade -= 1;

    const atualizado = carrinho.filter(
        item => item.quantidade > 0
    );

    localStorage.setItem(
        CHAVE,
        JSON.stringify(atualizado)
    );
}

// Produto no carrinho
export function produtoNoCarrinho(produto) {

    const carrinho = listarCarrinho();

    return carrinho.some(
        item => item.Id === produto.Id
    );
}

// Listar carrinho
export function listarCarrinho() {

    return JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );
}

// Remover item
export function removerCarrinho(produto) {

    const carrinho = listarCarrinho();

    const atualizado = carrinho.filter(
        item => item.Id !== produto.Id
    );

    localStorage.setItem(
        CHAVE,
        JSON.stringify(atualizado)
    );
}

// Limpar
export function limparCarrinho() {

    localStorage.removeItem(CHAVE);
}

// Quantidade total
export function quantidadeCarrinho() {

    const carrinho = listarCarrinho();

    return carrinho.reduce((total, item) => {

        return total + item.quantidade;

    }, 0);
}

// Valor total
export function totalCarrinho() {

    const carrinho = listarCarrinho();

    return carrinho.reduce((total, item) => {

        return total + (
            Number(item.Preco) * item.quantidade
        );

    }, 0);
}