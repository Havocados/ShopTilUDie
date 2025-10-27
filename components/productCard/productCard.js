function fetchProduct(){
    fetch('https://fakestoreapi.com/products/1')
        .then(response => response.json())
        .then(data => console.log(data))
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
    `;
    return productCard;
}

export { fetchProduct, createProductCard };