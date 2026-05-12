# EcommerceTech - SPA de E-commerce

## Descrição do projeto

O **EcommerceTech** é uma aplicação web do tipo **Single Page Application (SPA)** que simula um sistema de e-commerce.

O projeto consome uma API de produtos e permite ao usuário:
- visualizar produtos dinamicamente,
- adicionar produtos ao carrinho,
- remover produtos do carrinho,
- visualizar o carrinho com total da compra,
- finalizar o pedido (checkout).

Os dados do carrinho são armazenados no **localStorage**, garantindo persistência mesmo ao recarregar a página.

---

## Funcionalidades

- Listagem de produtos via API
- Criação dinâmica de cards de produtos
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Persistência com localStorage
- Página de carrinho funcional
- Cálculo automático do total da compra
- Navegação SPA (sem recarregar a página)
- Checkout com envio de pedido ao back-end

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap
- LocalStorage (Web Storage)
- Consumo de API (Fetch/Axios)
- SPA (Single Page Application)

---

## Estrutura do projeto

```plaintext
ecommerceTech/
│
├── docs/                        # Documentação do projeto
│
├── public/                      # Arquivos públicos
│
├── src/
│   │
│   ├── assets/                  # Imagens e arquivos estáticos
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   ├── layout/
│   │   │   └── navbar.components.js
│   │   │
│   │   ├── produto/
│   │   └── shared/
│   │
│   ├── pages/                   # Páginas da SPA
│   │   ├── produtos.page.js
│   │   ├── carrinho.page.js
│   │
│   ├── service/                # Integração com API
│   │   └── produtos.api.js
│   │
│   ├── storage/               # Persistência de dados (localStorage)
│   │   └── carrinho/
│   │       └── carrinho.storage.js
│   │
│   ├── main.js                # Arquivo principal da aplicação
│   └── style.css              # Estilos globais
│
├── index.html
└── .gitignore