export function criarBotaoCarrinho(adicionado = false) {

    const button = document.createElement("button");

    button.className = adicionado
        ? 'btn btn-success w-100'
        : 'btn btn-primary w-100';

    button.innerText = adicionado
        ? 'Adicionado'
        : 'Adicionar ao carrinho';

    return button;
}