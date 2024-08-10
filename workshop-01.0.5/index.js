const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const productsContainer = document.getElementById('products-container');
const totalPriceElement = document.getElementById('total-price');
const categorySelect = document.getElementById('category-select');
const filteredProductsContainer = document.getElementById('filtered-products');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultContainer = document.getElementById('search-result');
const availabilityElement = document.getElementById('availability');
const productNamesContainer = document.getElementById('product-names');

// Función para mostrar la lista de productos
const displayProducts = (products) => {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Categoría: ${product.category}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        `;
        productsContainer.appendChild(productElement);
    });
};

const calculateTotalPrice = () => {
    const totalPrice = products.reduce((acc, product) => acc + product.price * product.stock, 0);
    totalPriceElement.textContent = `$${totalPrice}`;
};

const generateCategorySelect = () => {
    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
};

const filterProductsByCategory = () => {
    const category = categorySelect.value.toLowerCase();
    const filteredProducts = products.filter(product => product.category.toLowerCase() === category);
    displayFilteredProducts(filteredProducts);
};

const displayFilteredProducts = (filteredProducts) => {
    filteredProductsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Categoría: ${product.category}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        `;
        filteredProductsContainer.appendChild(productElement);
    });
};

const searchProductByName = () => {
    const name = searchInput.value.toLowerCase();

    if(name){
        const product = products.find(product => product.name.toLowerCase().includes(name));
        displaySearchResult(product);
    }else{
        displaySearchResult(null);
    }
};

const displaySearchResult = (product) => {
    searchResultContainer.innerHTML = '';
    if (product) {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Categoría: ${product.category}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        `;
        searchResultContainer.appendChild(productElement);
    } else if (product === null) {
        searchResultContainer.textContent = 'Ingrese algo para ver un producto';
    }else{
        searchResultContainer.textContent = 'Producto no encontrado';
    }
};

const checkProductAvailability = () => {
    const allAvailable = products.every(product => product.stock > 0);
    availabilityElement.textContent = allAvailable ? 'Total' : 'Faltante';
    availabilityElement.className = allAvailable ? 'total' : 'faltante';
};

const getProductNames = () => {
    const productNames = products.map(product => product.name);
    productNamesContainer.innerHTML = '';
    productNames.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        productNamesContainer.appendChild(li);
    });
};

displayProducts(products);
calculateTotalPrice();
checkProductAvailability();
getProductNames();
generateCategorySelect();

// Event Listeners
categorySelect.addEventListener('change', filterProductsByCategory);
searchInput.addEventListener('input', searchProductByName);
