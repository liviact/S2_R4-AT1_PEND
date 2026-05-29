import {addCarrinho} from '../../../storage/carrinho/carrinho.storage';
import {carrinhoPage} from '../../../pages/carrinho.page'
import {ativarMenu} from '../navbar.components'


export function criarAdicionarCarrinho(produto) {
    const btn = document.createElement("button");

    btn.innerText = "Adicionar";
    btn.className = "btn btn-primary flex-fill";
    btn.style.cursor = "pointer";

      btn.addEventListener("click", () => {
        addCarrinho(produto);
         // alerta
        alert("Produto adicionado ao carrinho! 🛒");

    });

    return btn;
}

export function criarComprarAgora(produto) {
    const btn = document.createElement("button");

    btn.innerText = "Comprar agora";
    btn.className = "btn btn-secondary flex-fill";
    btn.style.cursor = "pointer";

     btn.addEventListener("click", () => {
        addCarrinho(produto);
         const btnCarrinho =
            document.querySelector("#btnCarrinho");
        ativarMenu(btnCarrinho);
        carrinhoPage();
    });

    return btn;
}