const CHAVE = 'carrinho';


// 🛒 ADICIONAR AO CARRINHO
export function addCarrinho(produto) {

    if (!produto || produto.Id == null) {

        console.error(
            "Produto inválido:",
            produto
        );

        return;
    }

    const carrinho = JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );

    // procura produto existente
    const itemExistente = carrinho.find(
        item => String(item.Id) === String(produto.Id)
    );

    // ✔ se já existe → aumenta quantidade
    if (itemExistente) {

        itemExistente.quantidade += 1;

    }

    // ✔ novo produto
    else {

        carrinho.push({

            Id: produto.Id,

            Nome: produto.Nome,

            Preco: Number(produto.Preco),

            Imagem: produto.Imagem,

            Categoria: produto.Categoria,

            quantidade: 1
        });
    }

    localStorage.setItem(
        CHAVE,
        JSON.stringify(carrinho)
    );
}



// ➕ AUMENTAR QUANTIDADE
export function aumentarQuantidade(produto) {

    const carrinho = listarCarrinho();

    const item = carrinho.find(
        item => String(item.Id) === String(produto.Id)
    );

    if (item) {

        item.quantidade += 1;

        localStorage.setItem(
            CHAVE,
            JSON.stringify(carrinho)
        );
    }
}



// ➖ DIMINUIR QUANTIDADE
export function diminuirQuantidade(produto) {

    const carrinho = listarCarrinho();

    const item = carrinho.find(
        item => String(item.Id) === String(produto.Id)
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



// 🔍 VERIFICAR PRODUTO
export function produtoNoCarrinho(produto) {

    const carrinho = listarCarrinho();

    return carrinho.some(
        item => String(item.Id) === String(produto.Id)
    );
}



// 📥 LISTAR CARRINHO
export function listarCarrinho() {

    return JSON.parse(
        localStorage.getItem(CHAVE) || '[]'
    );
}



// ❌ REMOVER ITEM
export function removerCarrinho(produto) {

    const carrinho = listarCarrinho();

    const atualizado = carrinho.filter(
        item => String(item.Id) !== String(produto.Id)
    );

    localStorage.setItem(
        CHAVE,
        JSON.stringify(atualizado)
    );
}



// 🧹 LIMPAR CARRINHO
export function limparCarrinho() {

    localStorage.removeItem(CHAVE);
}



// QUANTIDADE TOTAL
export function quantidadeCarrinho() {

    const carrinho = listarCarrinho();

    return carrinho.reduce((total, item) => {

        return total + item.quantidade;

    }, 0);
}



// 💰 TOTAL DO CARRINHO
export function totalCarrinho() {

    const carrinho = listarCarrinho();

    return carrinho.reduce((total, item) => {

        return total + (
            Number(item.Preco) * item.quantidade
        );

    }, 0);
}