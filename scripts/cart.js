console.log("Cart Page Loaded");

// ✅ Common Cart Badge Updater (works across pages)
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadge = document.querySelector(".cart-badge");
  if (cartBadge) cartBadge.textContent = totalItems;
}

// Run once on page load
updateCartBadge();

const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout");

// ✅ Load cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Render cart items
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalElement.textContent = "0.00";
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    updateCartBadge();
    return;
  }

  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = "1";

  cartContainer.innerHTML = cart
    .map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-img">
        <div class="cart-info">
          <h4>${item.title}</h4>
          <p>Size: ${item.size} | Color: ${item.color}</p>
          <p>Price: $${item.price.toFixed(2)}</p>

          <div class="quantity-controls">
            <button class="decrease" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>

          <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <button class="remove-item" data-index="${index}">🗑 Remove</button>
      </div>
    `)
    .join("");

  updateTotal();
  updateCartBadge();
}

// ✅ Update total price
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = total.toFixed(2);
}

// ✅ Handle increase/decrease/remove
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("increase")) {
    const index = e.target.dataset.index;
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  if (e.target.classList.contains("decrease")) {
    const index = e.target.dataset.index;
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }

  if (e.target.classList.contains("remove-item")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// ✅ Continue Shopping button
document.getElementById("continue-shopping").addEventListener("click", () => {
  window.location.href = "index.html";
});

// ✅ Checkout button
checkoutBtn.addEventListener("click", () => {
  alert("Proceeding to checkout...");
  // Add redirect to checkout.html if needed
});

// ✅ Initialize cart display
renderCart();
