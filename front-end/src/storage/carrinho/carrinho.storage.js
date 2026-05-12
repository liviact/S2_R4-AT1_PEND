// Adicionar produto ao carrinho
export function salvarCarrinho(produto) {

    const carrinho = JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );

    const jaExiste = carrinho.some(
        item => item.id === produto.id
    );

    if (!jaExiste) {
        carrinho.push(produto);
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
    }
}

// Verifica se o produto está no carrinho
export function produtoNoCarrinho(produto) {

    const carrinho = JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );

    return carrinho.some(
        item => item.id === produto.id
    );
}

// Listar produtos do carrinho
export function listarCarrinho() {

    return JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );
}

// Remover produto do carrinho
export function removerCarrinho(produto) {

    const carrinho = JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );

    const atualizado = carrinho.filter(
        item => item.id !== produto.id
    );

    localStorage.setItem(CHAVE, JSON.stringify(atualizado));
}