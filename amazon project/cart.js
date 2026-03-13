const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartContainer = document.querySelector('.js-cart-items');
    const cartCount = document.getElementById('cart-count');

    let cartHTML = '';
    let totalItems = 0;
    let totalPriceCents = 0;

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPriceCents += Number(item.priceCents) * item.quantity;

        cartHTML += `
            <div class="order-review-card">
                <div class="delivery-header">
                    <span class="delivery-label">Delivery date:</span>
                    <span class="delivery-date">Wednesday, March 18</span>
                </div>

                <div class="order-item-content">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.productName}">
                    </div>

                    <div class="item-info">
                        <h3 class="item-name">${item.productName}</h3>
                        <div class="item-price">$${(Number(item.priceCents) / 100).toFixed(2)}</div>

                        <div class="item-quantity-control">
                            <span>Quantity: ${item.quantity}</span>
                            <div class="item-actions">
                                <button class="action-link" onclick="deleteItem(${index})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const taxCents = totalPriceCents * 0.10;
    const finalTotalCents = totalPriceCents + taxCents;

    cartHTML += `
        <div class="order-summary-card">
            <h4 class="summary-title">Order Summary</h4>

            <div class="summary-row">
                <span>Items (${totalItems}):</span>
                <span>$${(totalPriceCents / 100).toFixed(2)}</span>
            </div>

            <div class="summary-row">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
            </div>

            <div class="summary-row">
                <span>Total before tax:</span>
                <span>$${(totalPriceCents / 100).toFixed(2)}</span>
            </div>

            <div class="summary-row">
                <span>Estimated tax (10%):</span>
                <span>$${(taxCents / 100).toFixed(2)}</span>
            </div>

            <div class="summary-row total-row">
                <span>Order total:</span>
                <span class="total-price">$${(finalTotalCents / 100).toFixed(2)}</span>
            </div>

            <button class="place-order-btn" onclick="window.location.href='track_order1.html'">
                Place your order
            </button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
    cartCount.textContent = totalItems;
}

function deleteItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

renderCart();