class Product {
    #category
    #description
    #id
    #image
    #price
    #rating
    #title
    constructor(category, description, id, image, price, rating, title) {
        this.#category = category;
        this.#description = description;
        this.#id = id;
        this.#image = image;
        this.#price = price;
        this.#rating = rating;
        this.#title = title;
    }
    /* Getters */
    get category() {
        return this.#category;
    }
    get description() {
        return this.#description;
    }
    get id() {
        return this.#id;
    }
    get image() {
        return this.#image;
    }
    get price() {
        return this.#price;
    }
    get rating() {
        return this.#rating;
    }
    get title() {
        return this.#title;
    }
    /* Setters */
    set category(newCategory) {
        this.#category = newCategory;
    }
    set description(newDescription) {
        this.#description = newDescription;
    }
    set id(newId) {
        this.#id = newId;
    }
    set image(newImage) {
        this.#image = newImage;
    }
    set price(newPrice) {
        this.#price = newPrice;
    }
    // Rating is an array with count and rate
    set rating(newRating) {
        this.#rating = newRating;
    }
    set title(newTitle) {
        this.#title = newTitle;
    }

    // convert product to json object
    toJSON() {
        return {
            category: this.#category,
            description: this.#description,
            id: this.#id,
            image: this.#image,
            price: this.#price,
            rating: this.#rating,
            title: this.#title
        };
    }

    // create product from json object
    static fromObject(jsonobj) {
        const product = new Product();
        product.category = jsonobj.category;
        product.description = jsonobj.description;
        product.id = jsonobj.id;
        product.image = jsonobj.image;
        product.price = jsonobj.price;
        product.rating = jsonobj.rating;
        product.title = jsonobj.title;
        return product;
    }

    // Fetch product data from API
    // for a given productId
    fetchProduct(productId = 1) {
        return fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then((data) => {
                return new Product(
                    data.category,
                    data.description,
                    data.id,
                    data.image,
                    data.price,
                    data.rating,
                    data.title
            );
        });
    }

    createProductCard(product, containerId='product-container') {
        const productContainer = document.getElementById(containerId);
        const productCard = document.createElement('div');
        productCard.className = 'product-card p-3 border rounded';
        productCard.innerHTML = `
            <div class="image-box justify-content-center d-flex mb-3">
                <img src="${product.image}" alt="${product.title}" style="max-height:200px" />
            </div>
            <h2 class="h4">${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    }
}

// Product list class
class ProductList {
    #products = [];
    constructor(products = []) {
        this.#products = products;
    }

    get products() {
        return this.#products;
    }

    set products(newProducts) {
        this.#products = newProducts;
    }
/* 
    initElements() {
        this.buttonElements = {
            btnAddToCart: document.querySelectorAll('.add-to-cart')
        }
    }

    setupEventListeners(){
        this.buttonElements.btnAddToCart.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const productToAdd = this.#products.find(prod => prod.id === productId);
                if (productToAdd) {
                    cart.addItem(productToAdd);
                }
            });
        });
    }
 */
    addProduct(product) {
        this.#products.push(product);
    }

    removeProduct(productId) {
        this.#products = this.#products.filter(product => product.id !== productId);

    }

    fetchAllProducts(apiURL = 'https://fakestoreapi.com/products') {
        return fetch(apiURL)
            .then(response => response.json())
            .then((data) => {
                this.#products = data.map(item => Product.fromObject(item));
                return this.#products;
            });
    }

    saveToLocalStorage() {
        const productsJSON = this.#products.map(product => product.toJSON());
        localStorage.setItem('productList', JSON.stringify(productsJSON));
    }

    loadFromLocalStorage() {
        const productsJSON = JSON.parse(localStorage.getItem('productList')) || [];
        this.#products = productsJSON.map(item => Product.fromObject(item));
    }

    filterByCategory(category) {
        return this.#products.filter(product => product.category === category);
    }
}

export { Product, ProductList };