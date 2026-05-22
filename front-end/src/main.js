import criarNavbar, { ativarMenu } from "./components/layout/navbar.components.js";

import { produtoPage } from '../src/pages/produtos.page.js'
import { carrinhoPage } from "../src/pages/carrinho.page.js";

criarNavbar();

// Página inicial
produtoPage();

// Botões do menu
const btnProdutos = document.querySelector("#btnProdutos");
const btnCarrinho = document.querySelector("#btnCarrinho");

//página de produtos aparece sem recarregar o site
btnProdutos.addEventListener("click", () => {
  ativarMenu(btnProdutos);
  produtoPage();
});

//abre a página do carrinho 
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
  carrinhoPage();
});