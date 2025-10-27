function fetchProduct(productId = 1) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then((data) => {
            createProductCard(data);
        });
}

function createProductCard(product) {
    const productContainer = document.getElementById('product-container');
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
    `;
    productContainer.appendChild(productCard);
}

export { fetchProduct, createProductCard };