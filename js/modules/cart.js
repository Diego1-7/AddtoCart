let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(id, products) {
    const product = products.find(p => p.id === id);
    const productInCart = cart.find(p => p.id === id);

    if (productInCart) {
        productInCart.quantity++;
    }
    else {
    cart.push({...product, quantity: 1});
    }
    
    updateCart();
}

export function updateCart() { 
    const cartList = document.getElementById("cart-list");
    const totalElement = document.getElementById("total");

    cartList.innerHTML = cart.map(product => `
        <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="info">
            <span>${product.name} (${product.quantity})</span>
            <span>$${(product.price * product.quantity).toFixed(2)}</span>
        </div>
        <button class="decrease-btn" data-id="${product.id}">-</button>
        <button class="increase-btn" data-id="${product.id}">+</button>
        <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
    `).join("");

    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    totalElement.textContent = total.toFixed(2);

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function decreaseQuantity(id) {
    const productInCart = cart.find(p => p.id === id);

    if (productInCart.quantity > 1) {
        productInCart.quantity--;
    } else {
        removeProduct(id);
    }

    updateCart();
}

export function increaseQuantity(id) {
    const productInCart = cart.find(p => p.id === id);
    if (productInCart) {
        productInCart.quantity++;
        updateCart();
    }
}

export function removeProduct(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('decrease-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        decreaseQuantity(productId);
    } else if (event.target.classList.contains('increase-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        increaseQuantity(productId);
    } else if (event.target.classList.contains('remove-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        removeProduct(productId);
    }
    });


updateCart();