describe("addToCart - basic add", function () {
  beforeEach(function () {
    cart = [];
    localStorage.clear();

    document.body.innerHTML = `
      <div class="product-card">
        <select class="quantity-dropdown">
          <option value="1" selected>1</option>
        </select>
        <button id="btn"></button>
      </div>
      <div class="js-count"></div>
      <div class="js-notification"></div>
    `;
  });

  it("should add a new item to cart", function () {
    const button = document.getElementById("btn");

    button.dataset.productName = "Black Socks";
    button.dataset.image = "img1.jpg";
    button.dataset.priceCents = "1090";
    button.dataset.id = "1";

    addToCart(button);

    expect(cart.length).toBe(1);
    expect(cart[0].productName).toBe("Black Socks");
    expect(cart[0].quantity).toBe(1);
    expect(cart[0].priceCents).toBe(1090);
  });
});