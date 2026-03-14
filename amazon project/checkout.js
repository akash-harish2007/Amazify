document.addEventListener('DOMContentLoaded', () => {
    renderCart(); // Your existing render function
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderCart() {
    const cartContainer1 = document.querySelector('.js-order');

    let cartHTML1 = '';
    let totalItems1 = 0;
    let totalPriceCents1 = 0;

    cart.forEach((item1,index) => {
        totalItems1 += item1.quantity;
        totalPriceCents1 += Number(item1.priceCents1) * item1.quantity;
    

        cartHTML1 += `
            <div  class="order-items">
                <button class="view-orders" onclick="window.location.href='orders.html'">view orders</button>
                <h1 class="section-title">Checkout(${totalItems1})</h1>
                <p class="text1">${item1.productName}</p>
                <p class="text2">Quantity: ${item1.quantity}</p>
                <img class="item-image" src="${item1.image}"
                    alt="Adults Plain Cotton T-Shirt - 2 Pack">

            </div>
        `;
    });

const taxCents1 = totalPriceCents1 * 0.10;
const finalTotalCents1 = totalPriceCents1 + taxCents1;

cartHTML1 += `
        <div class="order-summary-card">
            <h4 class="summary-title">Order Summary</h4>

            <div class="summary-row">
                <span>Items (${totalItems1}):</span>
                <span>$${(totalPriceCents1 / 100).toFixed(2)}</span>
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
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}


function updateitem(){

    
}

renderCart();