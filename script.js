// LOAD PRODUCTS FROM LOCAL STORAGE
let products = JSON.parse(localStorage.getItem("products")) || [];

let cart = [];
let total = 0;
let orders = 0;


// DISPLAY PRODUCTS WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", function(){
displayProducts();
updateDashboard();
});


// ADD PRODUCT
function addProduct(){

const name = document.getElementById("productName").value;
const price = document.getElementById("productPrice").value;
const qty = document.getElementById("productQty").value;

if(name === "" || price === "" || qty === ""){
alert("Fill all fields");
return;
}

const product = {
name: name,
price: parseFloat(price),
qty: parseInt(qty)
};

products.push(product);

// SAVE TO LOCAL STORAGE
localStorage.setItem("products", JSON.stringify(products));

displayProducts();
updateDashboard();

// CLEAR INPUTS
document.getElementById("productName").value = "";
document.getElementById("productPrice").value = "";
document.getElementById("productQty").value = "";
}


// DISPLAY PRODUCTS
function displayProducts(){

const list = document.getElementById("productList");

if(!list) return;

list.innerHTML = "";

products.forEach((product,index)=>{

list.innerHTML += `

<div class="col-md-4 mb-3">

<div class="card p-3">

<h5>${product.name}</h5>

<p>Price : Rs ${product.price}</p>

<p>Stock : ${product.qty}</p>

<button class="btn btn-danger btn-sm"
onclick="deleteProduct(${index})">
Remove
</button>

</div>

</div>

`;

});

// UPDATE PRODUCT COUNT IF EXISTS
const count = document.getElementById("productCount");
if(count){
count.innerText = products.length;
}

}


// DELETE PRODUCT
function deleteProduct(index){

if(confirm("Are you sure you want to delete this product?")){

products.splice(index,1);

// UPDATE STORAGE
localStorage.setItem("products", JSON.stringify(products));

displayProducts();
updateDashboard();

}

}


// ADD TO CART
function addToCart(name,price){

cart.push({name:name,price:price});

updateCart();

}

function checkout(){

if(cart.length === 0){
alert("Cart empty");
return;
}

// CREATE BILL CONTENT
let billContent = `
<h2 style="text-align:center;">POS SYSTEM</h2>
<hr>
<h4>Receipt</h4>
<ul>
`;

cart.forEach(item=>{
billContent += `<li>${item.name} - Rs ${item.price}</li>`;
});

billContent += `
</ul>
<hr>
<h3>Total: Rs ${total}</h3>
<p>Thank you! Come again.</p>
`;

// OPEN PRINT WINDOW
let printWindow = window.open('', '', 'width=400,height=600');
printWindow.document.write(billContent);
printWindow.document.close();

// PRINT
printWindow.print();

orders++;

cart = [];
total = 0;

updateCart();
updateDashboard();

}
// UPDATE CART
function updateCart(){

const cartList = document.getElementById("cartList");

if(!cartList) return;

cartList.innerHTML = "";

total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartList.innerHTML += `

<li class="list-group-item d-flex justify-content-between">

${item.name} - Rs ${item.price}

<button class="btn btn-danger btn-sm"
onclick="removeFromCart(${index})">
Remove
</button>

</li>

`;

});

const totalElement = document.getElementById("totalPrice");

if(totalElement){
totalElement.innerText = "Rs " + total;
}

}


// REMOVE CART ITEM
function removeFromCart(index){

cart.splice(index,1);

updateCart();

}


// CHECKOUT
function checkout(){

if(cart.length === 0){
alert("Cart empty");
return;
}

alert("Order placed successfully!");

orders++;

cart = [];
total = 0;

updateCart();
updateDashboard();

}


// DASHBOARD UPDATE
function updateDashboard(){

const p = document.getElementById("totalProducts");
const o = document.getElementById("totalOrders");
const s = document.getElementById("totalSales");

if(p) p.innerText = products.length;
if(o) o.innerText = orders;
if(s) s.innerText = "Rs " + total;

}


// PRODUCT SEARCH
function searchProduct(){

const search = document.getElementById("searchProduct").value.toLowerCase();

const cards = document.querySelectorAll("#productList .col-md-4");

let found = false;

cards.forEach(card=>{

const productName = card.querySelector("h5").innerText.toLowerCase();

if(productName.includes(search)){
card.style.display = "block";
found = true;
}
else{
card.style.display = "none";
}

});

const msg = document.getElementById("noProductMsg");

if(msg){
msg.style.display = found ? "none" : "block";
}

}