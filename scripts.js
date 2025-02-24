const products = [
    {
        id: 1,
        name: "MacBook Pro",
        description: "Apple MacBook Pro 13-inch, 8GB RAM, 256GB SSD, 1.4GHz Quad-core 8th-Generation Intel Core i5 Processor, Space Gray - Mid 2019",
        price: 1299.00,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "LexonElec Keyboard",
        description: "LexonElec Wired Gaming Keyboard Ajazz AK33 White LED Backlit 82 Keys Usb Mechanical Pro Gamer Keypad for Office Typists Playing Games (Blue Switch, Black)",
        price: 29.99,
        image: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "Logitech G305 LIGHTSPEED Wireless Gaming Mouse",
        description: "Logitech G305 LIGHTSPEED Wireless Gaming Mouse, Hero 12K Sensor, 12,000 DPI, Lightweight, 6 Programmable Buttons, 250h Battery Life, On-Board Memory, PC/Mac - White",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => `
        <div class="product">
         <img src="${product.image}" alt="${product.name}">
         <h3>${product.name}</h3>
         <p>${product.description}</p>
         <p>Price: $${product.price}</p>
         <button onclick="addToCart(${product.id})">Add to Cart</button>
         </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const productInCart = cart.find(p => p.id === id);

   if (productInCart) {
       productInCart.quantity++;
   } else {
       cart.push({ ...product, quantity: 1 });
   }

   updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalElement = document.getElementById("total");

    cartList.innerHTML = cart.map(product => `
    <div class="cart-item"> 
       <img src="${product.image}" alt="${product.name}">
       <div class="info">
       <span>${product.name} (${product.quantity})</span>
       <span>$${(product.price * product.quantity).toFixed(2)}</span>
    </div>
       <button onclick="decreaseQuantity(${product.id})">-</button>
       <button onclick="removeProduct(${product.id})">Remove</button>
    </div> 
    `).join("");

    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    totalElement.textContent = total.toFixed(2); 
}

function decreaseQuantity(id) {
    const productInCart = cart.find(p => p.id === id);

    if (productInCart.quantity > 1) {
        productInCart.quantity--;
    } else {
        removeProduct(id);
    }

    updateCart();
}

function removeProduct(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

displayProducts();