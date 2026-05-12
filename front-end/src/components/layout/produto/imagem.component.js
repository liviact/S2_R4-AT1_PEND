export default function criarImagemProduto(produto){
    const img = document.createElement('img');

    img.className = 'card-img-top img-fluid';
    img.alt = produto.name;

    img.style.height = '360px';
    img.style.objectFit = produto.image ? 'cover' : '';

    img.src = produto.image ? produto.image : '/public/default-character.png'
    return img;
}