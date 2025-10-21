const products = [
  { id: 1, name: "Handcrafted Bracelet", price: 25, image: "https://images.unsplash.com/photo-1587486913049-1d91fd2828dc" },
  { id: 2, name: "Custom Wooden Box", price: 40, image: "https://images.unsplash.com/photo-1592878904946-b3e4eecdb9a6" },
  { id: 3, name: "Decorative Candle", price: 18, image: "https://images.unsplash.com/photo-1518131678677-59649e1e88a2" },
  { id: 4, name: "Artisan Mug", price: 22, image: "https://images.unsplash.com/photo-1616628188579-4bcd6c4f93b4" }
];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Display products
products.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement("li");
    li.textContent = `${item.name} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;
}

cartBtn.onclick = () => cartModal.classList.remove("hidden");
closeCart.onclick = () => cartModal.classList.add("hidden");
document.getElementById("checkout-btn").onclick = () => {
  alert("Thank you for your purchase! (Checkout simulation only)");
  cart = [];
  updateCart();
  cartModal.classList.add("hidden");
};
