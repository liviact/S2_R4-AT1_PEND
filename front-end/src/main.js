import criarNavbar, { ativarMenu } from "./components/layout/navbar.components.js";
import './style.css'
import { produtoPage } from '../src/pages/produtos.page.js'
import { carrinhoPage } from "../src/pages/carrinho.page.js";

criarNavbar();

// Página inicial
produtoPage();

// Botões do menu
 export const btnProdutos = document.querySelector("#btnProdutos");
 export const btnCarrinho = document.querySelector("#btnCarrinho");

// página de produtos
btnProdutos.addEventListener("click", () => {
  ativarMenu(btnProdutos);
  produtoPage();
});

// página do carrinho
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
  carrinhoPage();

  // sempre recalcula o total ao abrir
  setTimeout(() => {
    atualizarTotalCarrinho();
  }, 50);
});

