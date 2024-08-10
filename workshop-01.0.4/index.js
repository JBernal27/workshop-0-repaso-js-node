const API_URL = 'https://api.escuelajs.co/api/v1';
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
let products = [];

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsContainer.innerHTML = '<p>Error al cargar los productos.</p>';
    }
}

const displayProducts = (products) => {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        const imageUrl = `${product.images[0]}`;
        productElement.innerHTML = `
            <div style="height: 50%">
                <img src="https://i.imgur.com/yVeIeDa.jpeg" alt="Sleek Wireless Headphone &amp; Inked Earbud Set">
            </div>
            <div style="height: 50%;display: flex;justify-content: space-between;flex-direction: column;">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="price" width="100%">
                    <p>$${product.price}</p>
                </div>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

fetchProducts();

const filterProducts = () => {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);
