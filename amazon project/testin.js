describe("addToCart - basic add", function () {

  beforeEach(function () {
    cart = [];

    
  });

  it("should add a new item to cart", function () {

    const button = document.getElementById("test-btn");

    // VERY IMPORTANT: set dataset AFTER selecting button
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