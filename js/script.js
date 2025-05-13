// Products Data
const products = [
    {
        id: 1,
        name: "iPhone 13 Pro",
        price: 999,
        category: "phones",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/5/FL/WM/DG/151745012/in-stock-apple-iphone-13-pro-max-256gb-sim-free-250x250.jpg",
        description: "The latest iPhone with Pro camera system"
    },
    {
        id: 2,
        name: "Samsung Galaxy S22",
        price: 799,
        category: "phones",
        image: "https://shop.9282922.ru/upload/iblock/c57/qnh298bvtc8ha6ted80lo7wwvakuimuz/smartfon_samsung_galaxy_s22_ultra_12_256gb_chernyy_fantom_s908e.jpeg",
        description: "Powerful Android smartphone with amazing camera"
    },
    {
        id: 3,
        name: "MacBook Pro 14\"",
        price: 1999,
        category: "laptops",
        image: "https://www.notebookcheck-ru.com/fileadmin/_processed_/webp/Notebooks/Apple/MacBook_Pro_14_2024_M4/IMG_7747-JPG-q82-w2560-h.webp",
        description: "Professional laptop with M1 Pro chip"
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 1499,
        category: "laptops",
        image: "https://static.insales-cdn.com/images/products/1/5929/858740521/DFS1100421_0057.jpg",
        description: "Premium Windows laptop with 4K display"
    },
    {
        id: 5,
        name: "AirPods Pro",
        price: 249,
        category: "accessories",
        image: "https://m.media-amazon.com/images/I/71zny7BTRlL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
        description: "Wireless earbuds with active noise cancellation"
    },
    {
        id: 6,
        name: "Apple Watch Series 7",
        price: 399,
        category: "accessories",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQL6nFiSsMIkv7RClzmyWPRlZ7UbAYO37IPdcPhafGsFwGYOzZi33ACPvHMinlxezxcuM4eQg5t39pwi8l5B8zELXgXqk7Zh72HwliKM9_dH-8jUspN50A4&usqp=CAc",
        description: "Advanced smartwatch with health features"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products (first 4 items)
    if (document.getElementById('featured-products')) {
        displayFeaturedProducts();
    }
    
    // Load all products
    if (document.getElementById('all-products')) {
        displayAllProducts();
        setupFilters(); // Only if you have filtering
    }
    
    // Update cart count
    updateCartCount();
});

// Display featured products (first 4 items)
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    const featuredProducts = products.slice(0, 4); // Get first 4 products
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Display ALL products
function displayAllProducts(productsToShow = products) {
    const allProductsContainer = document.getElementById('all-products');
    
    if (!allProductsContainer) return;
    
    allProductsContainer.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// If you have filters
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const sortValue = document.getElementById('sort-by').value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === category
        );
    }
    
    // Sort products
    switch(sortValue) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }
    
    displayAllProducts(filteredProducts);
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const cartCount = document.getElementById('cart-count');
const featuredProductsGrid = document.getElementById('featured-products');
const allProductsGrid = document.getElementById('all-products');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Load products on home page
    if (featuredProductsGrid) {
        displayFeaturedProducts();
    }
    
    // Load all products on products page
    if (allProductsGrid) {
        displayAllProducts();
        setupFilters();
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
});

// Functions
function toggleMobileMenu() {
    nav.classList.toggle('active');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${product.name} added to cart!`);
}

function displayFeaturedProducts() {
    // Display first 4 products as featured
    const featuredProducts = products.slice(0, 4);
    
    featuredProductsGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function displayAllProducts(productsToDisplay = products) {
    allProductsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    categoryFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
}

function filterProducts() {
    const category = categoryFilter.value;
    const sortValue = sortBy.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
        // Sort products
        switch(sortValue) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        
        displayAllProducts(filteredProducts);
    }