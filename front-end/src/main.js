import criarNavbar, { ativarMenu } from "./components/layout/navbar.components.js";

import { produtosPage } from "./pages/produtos/produtos.page.js";
import { carrinhoPage } from "./pages/carrinho/carrinho.page.js";

criarNavbar();

// Página inicial
produtosPage();

// Botões do menu
const btnProdutos = document.querySelector("#btnProdutos");
const btnCarrinho = document.querySelector("#btnCarrinho");

//página de produtos aparece sem recarregar o site
btnProdutos.addEventListener("click", () => {
  ativarMenu(btnProdutos);
  produtosPage();
});

//abre a página do carrinho 
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
  carrinhoPage();
});