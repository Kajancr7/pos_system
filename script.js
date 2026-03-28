// GLOBAL DATA
let products = [];
let cart = [];
let total = 0;


// LOAD DATA
document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    loadDashboard(); // NEW
});


// LOAD PRODUCTS
async function loadProducts() {
    try {
        const res = await fetch("backend/get_products.php");
        const data = await res.json();

        products = data;

        displayProducts();
        displayButtons();

    } catch (err) {
        console.error(err);
    }
}


// LOAD DASHBOARD DATA (NEW)
async function loadDashboard() {
    try {
        const res = await fetch("backend/get_dashboard.php");
        const data = await res.json();

        const p = document.getElementById("totalProducts");
        const o = document.getElementById("totalOrders");
        const s = document.getElementById("totalSales");

        if (p) p.innerText = data.products;
        if (o) o.innerText = data.orders;
        if (s) s.innerText = "Rs " + data.sales;

    } catch (err) {
        console.error(err);
    }
}


// ADD PRODUCT
async function addProduct() {

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const qty = document.getElementById("productQty").value;

    if (!name || !price || !qty) {
        alert("Fill all fields");
        return;
    }

    try {
        await fetch("backend/add_product.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, price, qty})
        });

        alert("Product added");

        loadProducts();

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQty").value = "";

    } catch (err) {
        console.error(err);
    }
}


// DISPLAY PRODUCTS
function displayProducts() {

    const list = document.getElementById("productList");
    if (!list) return;

    list.innerHTML = "";

    products.forEach(product => {
        list.innerHTML += `
        <div class="col-md-4 mb-3">
            <div class="card p-3">
                <h5>${product.name}</h5>
                <p>Price : Rs ${product.price}</p>
                <p>Stock : ${product.qty}</p>

                <button class="btn btn-danger btn-sm"
                    onclick="deleteProduct(${product.id})">
                    Remove
                </button>
            </div>
        </div>`;
    });

    const count = document.getElementById("productCount");
    if (count) count.innerText = products.length;
}


// DELETE PRODUCT
async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    try {
        await fetch(`backend/delete_product.php?id=${id}`);
        loadProducts();
    } catch (err) {
        console.error(err);
    }
}


// SHOW PRODUCTS IN SALES
function displayButtons() {

    const div = document.getElementById("productButtons");
    if (!div) return;

    div.innerHTML = "";

    products.forEach(p => {

        const disabled = p.qty <= 0 ? "disabled" : "";

        div.innerHTML += `
        <button class="btn btn-outline-primary me-2 mb-2"
        ${disabled}
        onclick="addToCart(${p.id})">
        ${p.name} - Rs ${p.price}
        </button>`;
    });
}


// ADD TO CART
function addToCart(id) {

    const p = products.find(x => x.id == id);
    if (!p || p.qty <= 0) return;

    const existing = cart.find(x => x.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: p.id, name: p.name, price: parseInt(p.price), qty: 1 });
    }

    updateCart();
}


// UPDATE CART
function updateCart() {

    const cartList = document.getElementById("cartList");
    if (!cartList) return;

    cartList.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
            ${item.name} (x${item.qty}) - Rs ${item.price * item.qty}
            <button class="btn btn-danger btn-sm"
                onclick="removeFromCart(${index})">
                X
            </button>
        </li>`;
    });

    const totalElement = document.getElementById("totalPrice");
    if (totalElement) totalElement.innerText = "Rs " + total;
}


// REMOVE FROM CART
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


// CHECKOUT
async function checkout() {

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    try {
        await fetch("backend/checkout.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ total, items: cart })
        });

        alert("Order completed");

        cart = [];
        total = 0;

        updateCart();
        loadProducts();
        loadDashboard();

    } catch (err) {
        console.error(err);
    }
}