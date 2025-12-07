// scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// hover effect for products
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('mouseenter', () => {
        product.style.transform = 'translateY(-5px)';
    });
    
    product.addEventListener('mouseleave', () => {
        product.style.transform = 'translateY(0)';
    });
});

// highlight active category in dropdown
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // map pages to dropdown items
    const pageToCategory = {
        'category-outerwear.html': 'Outerwear',
        'category-tops.html': 'Tops',
        'category-bottoms.html': 'Bottoms',
        'category-onepiece.html': 'One Piece',
        'category-setup.html': 'Setup',
        'category-bag.html': 'Bag',
        'category-accessories.html': 'Accessories'
    };
    
    // if current page is a category page
    if (pageToCategory[currentPage]) {
        const categoryName = pageToCategory[currentPage];
        const dropdownLinks = document.querySelectorAll('.dropdown-content a');
        
        dropdownLinks.forEach(link => {
            if (link.textContent === categoryName) {
                link.classList.add('active-category');
            }
        });
    }
});

// navigation active state
        document.querySelectorAll('.nav-menu a').forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });

// ===== CART FUNCTIONALITY ===== //
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.textContent = `Cart (${totalItems})`;
    }
}

// Add to cart function 
function addToCart(product) {
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size && item.color === product.color);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: product.size || 'Free',
            color: product.color || 'Default',
            quantity: product.quantity || 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems(); // This function needs to be in cart.html only
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    if (cart[index]) {
        cart[index].quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});