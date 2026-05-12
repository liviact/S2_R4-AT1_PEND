export default function criarNavbar() {

    const header = document.querySelector('header');

    const nav = document.createElement('nav');

    nav.className = 'navbar navbar-expand-lg bg-light shadow-sm';

    nav.innerHTML = `
    
    <div class="container-fluid">

        <!-- Logo -->
        <a class="navbar-brand fw-bold" href="#">
            E-Commerce
        </a>

        <!-- Botão mobile -->
        <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#menu"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu -->
        <div class="collapse navbar-collapse justify-content-center" id="menu">

            <ul class="navbar-nav mb-2 mb-lg-0">

                <li class="nav-item">
                    <button 
                        class="nav-link active fw-bold text-primary" 
                        id="btnProdutos"
                    >
                        Produtos
                    </button>
                </li>

                <li class="nav-item">
                    <button 
                        class="nav-link" 
                        id="btnCarrinho"
                    >
                        Carrinho
                    </button>
                </li>

            </ul>

        </div>

        <!-- Pesquisa -->
        <form class="d-flex">

            <input 
                class="form-control" 
                type="search" 
                placeholder="Pesquisar produtos"
                id="inputSearch"
            >

        </form>

    </div>
    `;

    header.appendChild(nav);
}

// Função para ativar menu selecionado
export function ativarMenu(botaoClicado) {

    document.querySelectorAll('.nav-link').forEach(btn => {

        btn.classList.remove(
            'active',
            'text-primary',
            'fw-bold'
        );

    });

    botaoClicado.classList.add(
        'active',
        'text-primary',
        'fw-bold'
    );

}