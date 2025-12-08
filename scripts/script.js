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

// ===== SIZE SELECTION FUNCTIONALITY ===== //
function setupSizeSelection() {
    const sizeOptions = document.querySelectorAll('.size-option');
    
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options in this group
                const allOptions = this.closest('.size-grid').querySelectorAll('.size-option');
                allOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
    }
}

// ===== ENHANCED ADD TO CART ===== //
function addToCart(product) {
    // Get selected size from the page
    let selectedSize = product.size || 'Free';
    
    // If we're on a product detail page, get the selected size
    const selectedSizeElement = document.querySelector('.size-option.selected');
    if (selectedSizeElement) {
        selectedSize = selectedSizeElement.querySelector('.size-label')?.textContent || 'Free';
    }
    
    // Create product with all details
    const productWithDetails = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
        size: selectedSize,
        color: product.color || 'Default',
        image: product.image || getDefaultImage(product.id)
    };
    
    // Check if product already in cart with same size and color
    const existingIndex = cart.findIndex(item => 
        item.id === productWithDetails.id && 
        item.size === productWithDetails.size && 
        item.color === productWithDetails.color
    );
    
    if (existingIndex > -1) {
        // Update quantity if product already exists
        cart[existingIndex].quantity += productWithDetails.quantity;
    } else {
        // Add new product
        cart.push(productWithDetails);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    return true;
}

// Helper function to get default image based on product ID
function getDefaultImage(productId) {
    const imageMap = {
        'prod-001': '../assets/images/heartribbonbeltcoat.jpg',
        'prod-002': '../assets/images/tieredruffledskirt.jpg',
        'prod-003': '../assets/images/camifurset.jpg'
        // Add more mappings as needed
    };
    
    return imageMap[productId] || '';
}

// ===== INITIALIZE ALL FUNCTIONALITY ===== //
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupSizeSelection();
    setupNavigation();
    setupProductHover();
});

// Navigation setup
function setupNavigation() {
    // Your existing navigation code
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
    
    // Highlight active category in dropdown
    const currentPage = window.location.pathname.split('/').pop();
    const pageToCategory = {
        'category-outerwear.html': 'Outerwear',
        'category-tops.html': 'Tops',
        'category-bottoms.html': 'Bottoms',
        'category-onepiece.html': 'One Piece',
        'category-setup.html': 'Setup',
        'category-bag.html': 'Bag',
        'category-accessories.html': 'Accessories'
    };
    
    if (pageToCategory[currentPage]) {
        const categoryName = pageToCategory[currentPage];
        document.querySelectorAll('.dropdown-content a').forEach(link => {
            if (link.textContent === categoryName) {
                link.classList.add('active-category');
            }
        });
    }
}

// Product hover effect
function setupProductHover() {
    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.style.transform = 'translateY(-5px)';
        });
        
        product.addEventListener('mouseleave', () => {
            product.style.transform = 'translateY(0)';
        });
    });
}