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

// ===== MOBILE MENU TOGGLE =====
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// ===== DROPDOWN FOR MOBILE =====
function setupMobileDropdowns() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.dropdown > .dropbtn').forEach(dropbtn => {
            dropbtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                }
            });
        });
    }
}

// ===== TOUCH-ENABLED CAROUSEL/SLIDERS =====
function setupTouchSliders() {
    const sliders = document.querySelectorAll('.product-slider, .image-slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}

// ===== RESPONSIVE IMAGE HANDLING =====
function setupResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ===== UPDATE ALL INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupSizeSelection();
    setupNavigation();
    setupProductHover();
    setupMobileMenu(); // Add this
    setupMobileDropdowns(); // Add this
    setupTouchSliders(); // Add this if you have sliders
    setupResponsiveImages(); // Add this
});

// ===== WINDOW RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        setupMobileDropdowns();
        // Re-initialize any responsive components
    }, 250);
});