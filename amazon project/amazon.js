let cart_Items = 0;

// Cart items array
let cartItems = [];

// This runs when page loads
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ Page loaded, initializing cart...');
    loadCart();
    carttot();
});

function loadCart() {
    console.log('🔍 Loading cart...');

    // Try to get cart from localStorage
    const savedCart = localStorage.getItem('amazonCart');

    if (savedCart) {
        // If cart exists in storage, use it
        cartItems = JSON.parse(savedCart);
        console.log('📦 Loaded from storage:', cartItems);
    } else {
        // If no cart, create sample items
        console.log('🆕 Creating sample items');
        cartItems = [
            {
                id: 1,
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                price: 10.90,
                quantity: 2,  // Changed to 2 to match your image
                image: "athletic-cotton-socks-6-pairs.jpg"
            },
            {
                id: 2,
                name: "Adults Plain Cotton T-Shirt - 2 Pack",
                price: 15.99,
                quantity: 1,
                image: "adults-plain-cotton-tshirt-2-pack.jpg"
            }
        ];

        // Save to localStorage
        saveCart();
    }

    // Display the orders
    updateOrderSummary(0); // Initialize summary with 0 total
    updateCartCount(); // Update cart count in header
    displayOrders();

}

function displayOrders() {
    console.log('📋 Displaying orders...');

    // Find the container
    const container = document.getElementById('order-items-list');

    // DEBUG: Check if container exists
    console.log('Container element:', container);

    if (!container) {
        console.error('❌ ERROR: Could not find element with id "order-items-list"');
        console.log('🔧 Fix: Make sure your HTML has <div id="order-items-list"></div>');
        return;
    }

    // Check if cart has items
    console.log('Cart items:', cartItems);

    if (!cartItems || cartItems.length === 0) {
        container.innerHTML = '<div class="empty-orders">No orders yet</div>';
        return;
    }

    // Calculate total
    let totalAmount = 0;
    let itemsHTML = '';
    let shipping = 0;

    // Loop through each item and create HTML
    cartItems.forEach((item, index) => {
        console.log(`Creating HTML for item ${index}:`, item.name);

        const itemTotal = item.price * item.quantity * 1.05 * shipping; // Adding 5% tax
        totalAmount += itemTotal;

        // Calculate arrival date (3-10 days from now)
        const arrivalDate = new Date();
        arrivalDate.setDate(arrivalDate.getDate() + Math.floor(Math.random() * 7) + 3);
        const arrivalStr = arrivalDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        });

        // Create HTML for this item
        itemsHTML += `
            <div class="order-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" 
                         onerror="this.src='https://via.placeholder.com/80'">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <div class="item-price">AED ${item.price.toFixed(2)}</div>
                    <div class="item-quantity">Quantity: ${item.quantity}</div>
                    <div class="item-arrival">Arriving on: ${arrivalStr}</div>
                    <div class="item-actions">
                        <button class="buy-again-btn" onclick="buyAgain(${item.id})">Buy it again</button>
                        <button class="track-button"  onclick="window.location.href='track_order.html'">Track package</button>
                    </div>
                </div>
            </div>

            <div class="order-item">
                <div class="item-image">
                    <img src="adults-plain-cotton-tshirt-2-pack-teal.jpg" alt="Adults Plain Cotton T-Shirt - 2 Pack" 
                         onerror="this.src='https://via.placeholder.com/80'">
                </div>
                <div class="item-details">
                    <h3 class="item-name">Adults Plain Cotton T-Shirt - 2 Pack</h3>
                    <div class="item-price">AED $37.5</div>
                    <div class="item-quantity">Quantity: 2</div>
                    <div class="item-arrival">Arriving on: March 17</div>
                    <div class="item-actions">
                        <button class="buy-again-btn" onclick="buyAgain(${item.id})">Buy it again</button>
                        <button class="track-button" onclick="window.location.href='track_order1.html'">Track package</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Insert all HTML at once
    container.innerHTML = itemsHTML;

    // Update order summary
    updateOrderSummary(totalAmount);

    console.log('✅ Display complete!', cartItems.length, 'items shown');
}


function trackPackage() {

}

function updateOrderSummary(total) {
    // Update total
    const totalElement = document.getElementById('order-total');
    if (totalElement) {
        totalElement.textContent = `AED ${total.toFixed(2)}`;
    }

    // Update order ID
    const orderIdElement = document.getElementById('order-id');
    if (orderIdElement) {
        const orderId = generateOrderId();
        orderIdElement.textContent = `#${orderId}`;
    }

    // Update date
    const dateElement = document.getElementById('order-date');
    if (dateElement) {
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        });
        dateElement.textContent = dateStr;
    }
}

function generateOrderId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 7; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

function saveCart() {
    localStorage.setItem('amazonCart', JSON.stringify(cartItems));
    console.log('💾 Cart saved to localStorage');
}

function buyAgain(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity += 1;
        saveCart();
        displayOrders();
        updateCartCount();
        alert(`Added another ${item.name} to your cart!`);
    }
}

function updateCartCount() {
    // This would update the cart badge in the header
    const badge = document.getElementById('cart-count');
    if (badge) {
        const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = total;
    }
}


function searchbar() {

    const input = document.getElementById('search-area');

    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {

        const title = product.querySelector('.product-name').textContent.toLowerCase();

        if (title.includes(input.value.toLowerCase())) {

            product.style.display = 'block';
        }

        else {

            product.style.display = 'none';
        }
    });

    document.getElementById('search-area').addEventListener('keydown', function (event) {

        if (event.key === 'Enter') {
            console.log('🔍 Search triggered by Enter key');
            event.preventDefault(); // Prevent form submission if inside a form
            searchbar();

        }


    })
};


// Track cart items
// let cartItems = 3; // Starting with 3 items

function addToCart(button) {

    let cart_item = 0;

    button.textContent = "Added!";

    const quantity = document.getElementById(qty1)

    button.disabled = true; // Disable the button after adding to cart
    cart_item + 1 + quantity;

    setTimeout(() => {
        button.textContent = "Add to Cart";
        button.disabled = false; // Re-enable the button after 1 second
    }, 1000);
    localStorage.setItem('cartItems', cart_Items);

    if (cart_Items < 99) {
        cart_item + 1 + quantity;
        document.getElementById('cart-count').textContent = cart_Items;
    }

    else {
        alert("Cart is full! Please proceed to checkout.");
    }


    function notification(productName, quantity) {
        alert(productName + " has been added to your cart! Quantity: " + quantity);
    }

    if (cart_Items >= 5) {
        alert("You have " + cart_Items + " items in your cart. Don't forget to check out!");
    }
    else {
        alert("You have " + cart_Items + " items in your cart.");
    }
    alert("Item added to cart!");
}



function resetcart() {
    cart_Items = 0
    document.getElementById('cart-count').textContent = cart_Items;
}


function generateOrderId() {
    const chars = 'abcdef0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}



function displayOrderReview() {
    const container = document.querySelector('.orders-review-container');
    
    if (!container || !cartItems) return;
    
    let html = '';
    let totalItems = 0;
    let subtotal = 0;
    
    cartItems.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
        
        const tax = subtotal * 0.10;
        const total = subtotal + tax;
        
        // Calculate delivery date
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        const deliveryStr = deliveryDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
        });
        
        html += `
            <div class="order-review-card">
                <div class="delivery-header">
                    <span class="delivery-label">Delivery date:</span>
                    <span class="delivery-date">${deliveryStr}</span>
                </div>
                
                <div class="order-item-content">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                        
                        <div class="item-quantity-control">
                            <span>Quantity: ${item.quantity}</span>
                            <div class="item-actions">
                                <button class="action-link" onclick="updateItem(${item.id})">Update</button>
                                <span class="action-separator">|</span>
                                <button class="action-link" onclick="deleteItem(${item.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="order-summary-card">
                    <h4 class="summary-title">Order Summary</h4>
                    
                    <div class="summary-row">
                        <span>Items (${totalItems}):</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div class="summary-row">
                        <span>Shipping & handling:</span>
                        <span>$0.00</span>
                    </div>
                    
                    <div class="summary-row">
                        <span>Total before tax:</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div class="summary-row">
                        <span>Estimated tax (10%):</span>
                        <span>$${tax.toFixed(2)}</span>
                    </div>
                    
                    <div class="summary-row total-row">
                        <span>Order total:</span>
                        <span class="total-price">$${total.toFixed(2)}</span>
                    </div>
                    
                    <button class="place-order-btn"  onclick="window.location.href='track_order.html'">Place your order</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function deleteItem(itemId) {
    if (!confirm('Remove this item?')) return;
    
    // Find the card element
    const cardToDelete = document.querySelector(`[data-item-id="${itemId}"]`);
    
    if (cardToDelete) {
        // Add deleting class for animation
        cardToDelete.classList.add('deleting');
        
        // Wait for animation to complete
        setTimeout(() => {
            const itemIndex = cartItems.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                saveCart();
                displayOrderReview();
                updateCartCount();
                showNotification('Item removed');
            }
        }, 300);
    }
}


