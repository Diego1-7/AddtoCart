import { products } from "./modules/products.js";
import { addToCart, updateCart, decreaseQuantity, increaseQuantity, removeProduct } from "./modules/cart.js";

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join("");

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productId = parseInt(button.getAttribute('data-id'));
        addToCart(productId, products);
    });
});

}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCart();
});

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    document.getElementById("theme-toggle").checked = savedTheme === "dark";
}

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", toggleTheme);

loadTheme();

