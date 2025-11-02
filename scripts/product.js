console.log("Product Detail Page Loaded");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productDetail = document.getElementById("product-detail");
const cartBadge = document.querySelector(".cart-badge");
const zoomLens = document.getElementById("zoom-lens");

// ✅ Update cart count dynamically
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
}
updateCartCount();

// ✅ Fetch product details
async function fetchProductDetails() {
  if (!productId) {
    productDetail.innerHTML = "<p style='color:red;'>No product ID found!</p>";
    return;
  }

  productDetail.innerHTML = "<p>Loading product details...</p>";

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product data");
    const product = await response.json();
    displayProduct(product);
  } catch (err) {
    console.error(err);
    productDetail.innerHTML = "<p style='color:red;'>Failed to load product details.</p>";
  }
}

// ✅ Display product details
function displayProduct(product) {
  productDetail.innerHTML = `
    <div class="product-container">
      <div class="image-section">
        <img id="main-image" src="${product.image}" alt="${product.title}">
      </div>

      <div class="info-section">
        <h2>${product.title}</h2>
        <p class="price">Price: $<span id="price">${product.price.toFixed(2)}</span></p>
        <p class="description">${product.description}</p>

        <!-- Product variations -->
        <div class="variations">
          <label>Size:</label>
          <select id="size">
            <option value="S">Small</option>
            <option value="M" selected>Medium</option>
            <option value="L">Large</option>
          </select>

          <label>Color:</label>
          <select id="color">
            <option value="Red">Red</option>
            <option value="Blue" selected>Blue</option>
            <option value="Black">Black</option>
          </select>
        </div>

        <!-- Quantity selector -->
        <div class="quantity-selector">
          <button id="decrease">−</button>
          <span id="quantity">1</span>
          <button id="increase">+</button>
        </div>

        <p class="total-price">Total: $<span id="total">${product.price.toFixed(2)}</span></p>
        <button id="add-to-cart" class="add-cart-btn">Add to Cart</button>
        <p id="feedback" style="display:none; color:green;">✔ Item added to cart!</p>
      </div>
    </div>
  `;

  const mainImage = document.getElementById("main-image");
  const priceEl = document.getElementById("price");
  const totalEl = document.getElementById("total");
  const qtyEl = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const feedback = document.getElementById("feedback");

  let quantity = 1;

  // ✅ Image Zoom Effect
  mainImage.addEventListener("mousemove", (e) => {
    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    zoomLens.style.display = "block";
    zoomLens.style.backgroundImage = `url(${mainImage.src})`;
    zoomLens.style.backgroundSize = `${rect.width * 2}px ${rect.height * 2}px`;
    zoomLens.style.backgroundPosition = `-${x}px -${y}px`;
    zoomLens.style.top = `${e.pageY - 100}px`;
    zoomLens.style.left = `${e.pageX - 100}px`;
  });

  mainImage.addEventListener("mouseleave", () => {
    zoomLens.style.display = "none";
  });

  // ✅ Quantity Selector + Live Price Update
  increaseBtn.addEventListener("click", () => {
    quantity++;
    qtyEl.textContent = quantity;
    totalEl.textContent = (product.price * quantity).toFixed(2);
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyEl.textContent = quantity;
      totalEl.textContent = (product.price * quantity).toFixed(2);
    }
  });

  // ✅ Add to Cart Functionality
  document.getElementById("add-to-cart").addEventListener("click", () => {
    const selectedSize = document.getElementById("size").value;
    const selectedColor = document.getElementById("color").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // If same product + same variation exists, increase quantity
    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = (existingItem.price * existingItem.quantity).toFixed(2);
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        totalPrice: (product.price * quantity).toFixed(2),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // ✅ Feedback animation
    feedback.style.display = "block";
    setTimeout(() => (feedback.style.display = "none"), 1500);
  });
}

fetchProductDetails();
