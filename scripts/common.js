console.log("Common script loaded");

// ✅ Update cart badge count on all pages
function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  if (!cartBadge) return; // If badge not found, skip

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartBadge.textContent = cart.length;
}

// ✅ Run immediately on page load
document.addEventListener("DOMContentLoaded", updateCartBadge);

// ✅ Also listen for storage updates (works across tabs/pages)
window.addEventListener("storage", updateCartBadge);
