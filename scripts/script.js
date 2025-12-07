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