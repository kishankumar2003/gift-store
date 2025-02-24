// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const targetDate = new Date('2025-02-28T23:59:59+05:30');
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // If it's the home link, scroll to top
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // For other links, scroll to the section
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Smooth scrolling for other links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Cart functionality
    function addToCart(event, name, price) {
        const productCard = event.target.closest('.product-card');
        const image = productCard.querySelector('img').src;
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name, price, image });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        updateCartDisplay();
        showNotification(`${name} added to cart!`);
    }

    // Make removeFromCart function global
    window.removeFromCart = function(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        updateCartDisplay();
        showNotification('Item removed from cart!');
    }

    window.updateCartDisplay = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = document.querySelector('.cart-items');
        const totalElement = document.getElementById('cart-total-amount');
        
        // Clear current cart display
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            totalElement.textContent = '0';
            return;
        }

        // Calculate total and display items
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
            `;
            cartItems.appendChild(cartItem);
        });

        // Update total
        totalElement.textContent = total.toLocaleString();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            cartBadge.textContent = cart.length;
        }
    }

    // Initialize cart on page load
    updateCartCount();
    updateCartDisplay();

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after animation completes
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    function proceedToCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        window.location.href = 'checkout.html';
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.price').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            
            addToCart(event, name, price);
        });
    });

    // Cart open/close
    document.querySelector('.cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });

    document.querySelector('.close-cart').addEventListener('click', closeCart);

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', proceedToCheckout);

    // Cart visibility
    function openCart() {
        document.querySelector('.cart-modal').classList.add('active');
        document.querySelector('.cart-overlay').classList.add('active');
    }

    function closeCart() {
        document.querySelector('.cart-modal').classList.remove('active');
        document.querySelector('.cart-overlay').classList.remove('active');
    }

    // Newsletter Form Submission
    document.getElementById('subscribe-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to a server
        alert('Thank you for subscribing! Special offers will be sent to ' + email);
        this.reset();
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const hero = document.getElementById('hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Animate products on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // User popup functionality
    const userIcon = document.querySelector('.user-icon');
    const userPopup = document.querySelector('.user-popup');
    let isPopupOpen = false;

    // Toggle user popup
    userIcon.addEventListener('click', (e) => {
        e.preventDefault();
        isPopupOpen = !isPopupOpen;
        userPopup.classList.toggle('active');
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (isPopupOpen && !userIcon.contains(e.target) && !userPopup.contains(e.target)) {
            userPopup.classList.remove('active');
            isPopupOpen = false;
        }
    });

    // Button click handlers
    const signupBtn = document.querySelector('.signup-btn');
    
    const loginBtn = document.querySelector('.login-btn');
    

    signupBtn.addEventListener('click', () => {
        // Add signup functionality here
        console.log('Sign Up clicked');
        window.location.href = 'https://www.caratlane.com/register';
    });

    loginBtn.addEventListener('click', () => {
        // Add login functionality here
        console.log('Log In clicked');
        window.location.href = 'https://www.caratlane.com/login';
    });
});

// Add cart modal to the DOM
document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-overlay"></div>
    <div class="cart-modal">
        <div class="cart-modal-header">
            <h2>Shopping Cart</h2>
            <button class="close-cart">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-total">
            <h3>Total: ₹<span id="cart-total-amount">0</span></h3>
            <button class="checkout-btn">Proceed to Checkout</button>
        </div>
    </div>
`);

// Notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4b6e;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateCartDisplay();
});
