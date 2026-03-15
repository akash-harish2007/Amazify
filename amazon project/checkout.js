let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function renderCart() {
  const cartContainer1 = document.querySelector('.js-order');
  if (!cartContainer1) return;

  let cartHTML1 = '';
  let totalItems1 = 0;
  let totalPriceCents1 = 0;

  // calculate totals once - FIXED HERE
  cart.forEach((item1) => {
    const quantity = Number(item1.quantity) || 0;
    const priceCents = Number(item1.priceCents) || 0;  // ← Changed from priceCents1

    totalItems1 += quantity;
    totalPriceCents1 += priceCents * quantity;  // ← Changed from priceCents1
  });

  // if cart empty
  if (cart.length === 0) {
    cartContainer1.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to see them here.</p>
      </div>
    `;
    return;
  }

  // header only once
  cartHTML1 += `
    <div class="checkout-header">
      <h1 class="main-checkout-title">CHECKOUT (${totalItems1})</h1>
      <button class="view-orders-btn" onclick="window.location.href='orders.html'">
        View Orders
      </button>
    </div>
  `;

  // render items - FIXED HERE TOO
  cart.forEach((item1, index) => {
    const quantity = Number(item1.quantity) || 0;
    const priceCents = Number(item1.priceCents) || 0;  // ← Changed from priceCents1
    const itemPrice1 = (priceCents / 100).toFixed(2);  // ← Changed from priceCents1

    cartHTML1 += `
      <div class="order-card" data-index="${index}">
        <div class="order-product">
          <img class="item-image" src="${item1.image}" alt="${item1.productName}">
          
          <div class="product-details">
            <h2>${item1.productName}</h2>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Price:</strong> $${itemPrice1}</p>

            <div class="item-actions">
              <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </div>
          </div>
        </div>

        <div class="tracking-section">
          <div class="progress-bar">
            <div class="progress-fill preparing"></div>
          </div>

          <div class="tracking-steps">
            <div class="step active">
              <div class="step-circle">1</div>
              <p>Preparing</p>
            </div>

            <div class="step">
              <div class="step-circle">2</div>
              <p>Shipped</p>
            </div>

            <div class="step">
              <div class="step-circle">3</div>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // summary - FIXED (these were already correct, using totalPriceCents1)
  const taxCents1 = totalPriceCents1 * 0.10;
  const finalTotalCents1 = totalPriceCents1 + taxCents1;

  cartHTML1 += `
    <div class="order-summary-card">
      <h4 class="summary-title">Order Summary</h4>

      <div class="summary-row">
        <span>Items (${totalItems1}):</span>
        <span>$${(totalPriceCents1 / 100).toFixed(2)}</span>
      </div>

      <div class="summary-row">
        <span>Estimated Tax:</span>
        <span>$${(taxCents1 / 100).toFixed(2)}</span>
      </div>

      <div class="summary-row total-row">
        <span>Order total:</span>
        <span class="total-price">$${(finalTotalCents1 / 100).toFixed(2)}</span>
      </div>
    </div>
  `;

  cartContainer1.innerHTML = cartHTML1;
}

function deleteItem(index) {
  if (!confirm('Remove this item?')) return;

  const cardToDelete = document.querySelector(`[data-index="${index}"]`);

  if (cardToDelete) {
    cardToDelete.classList.add('deleting');

    setTimeout(() => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      notification(`Item removed from cart`);
    }, 300);
  } else {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    notification(`Item removed from cart`);
  }
}

function notification(message) {
  const notificationBar = document.querySelector('.js-notification1');
  if (!notificationBar) return;

  notificationBar.textContent = message;

  notificationBar.classList.remove('show');

  setTimeout(() => {
    notificationBar.classList.add('show');
  }, 10);

  setTimeout(() => {
    notificationBar.classList.remove('show');
  }, 2000);
}