export default function criarImagemProduto(produto){

    const img = document.createElement('img');

    img.className = 'card-img-top img-fluid';

    img.alt = produto.Nome;

    // tamanho da imagem
    img.style.height = '360px';
    img.style.width = '100%';

    // mostra imagem inteira sem cortar
    img.style.objectFit = 'contain';

    // fundo branco
    img.style.backgroundColor = '#fff';

    // espaçamento interno
    img.style.padding = '10px';

    // imagem do produto
    img.src = produto.Imagem
        ? `http://localhost:8000/uploads/imagens/${encodeURIComponent(produto.Imagem)}`
        : '/default-character.png';

    // imagem padrão caso dê erro
    img.onerror = () => {

        img.src = '/default-character.png';

    };

    return img;
}