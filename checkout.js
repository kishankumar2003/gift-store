document.addEventListener('DOMContentLoaded', () => {
    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const checkoutItems = document.querySelector('.checkout-items');
    const totalElement = document.getElementById('checkout-total-amount');

    // Display cart items
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString()}</p>
            </div>
        `;
        checkoutItems.appendChild(itemElement);
        total += item.price;
    });

    // Update total
    totalElement.textContent = total.toLocaleString();

    // Handle form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value,
            items: cart,
            total: total
        };

        // Here you would typically send this data to your server
        console.log('Order placed:', formData);

        // Clear cart
        localStorage.removeItem('cart');

        // Show success message and redirect
        alert('Order placed successfully! Thank you for shopping with us.');
        window.location.href = 'index.html';
    });
});
