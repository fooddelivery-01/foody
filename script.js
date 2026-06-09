let upiID = "8449196052@nyes";
let cart = [];

function showPage(pageId){
document.querySelectorAll('.page').forEach(page=>{
page.classList.remove('active');
});
document.getElementById(pageId).classList.add('active');
window.scrollTo(0,0);
}

function addItem(name,price,btn=null){
let item = cart.find(x => x.name === name);
if(item){
item.qty++;
}else{
cart.push({
name:name,
price:price,
qty:1
});
}
if(btn){
btn.classList.add("added");
btn.innerHTML="✓ Added";
}
renderCart();
}

function renderCart(){
let html = "";
let total = 0;
cart.forEach(item=>{
total += item.price * item.qty;
html += `<div class="cart-item"><div><b>${item.name}</b><br>₹${item.price}</div><div><button class="qty-btn" onclick="decreaseQty('${item.name}')">-</button>${item.qty}<button class="qty-btn" onclick="increaseQty('${item.name}')">+</button><button class="qty-btn" onclick="removeItem('${item.name}')">Remove</button></div></div>`;
});
document.getElementById("cartItems").innerHTML = html;
let deliveryCharge = cart.length > 0? 20 : 0;
document.getElementById("foodTotal").innerText = total;
document.getElementById("deliveryCharge").innerText = deliveryCharge;
document.getElementById("total").innerText = total + deliveryCharge;
}

function increaseQty(name){
let item = cart.find(x => x.name === name);
if(item){
item.qty++;
}
renderCart();
}

function decreaseQty(name){
let item = cart.find(x => x.name === name);
if(item){
item.qty--;
if(item.qty <= 0){
cart = cart.filter(x => x.name!== name);
}
renderCart();
}
}

function removeItem(name){
cart = cart.filter(x => x.name!== name);
renderCart();
}

function searchFood(){
let input = document.getElementById("search").value.toLowerCase();
let foods = document.querySelectorAll(".food");
foods.forEach(food=>{
let text = food.innerText.toLowerCase();
food.style.display = text.includes(input)? "block" : "none";
});
}

function filterCategory(){
let category = document.getElementById("categoryFilter").value;
let foods = document.querySelectorAll(".food");
foods.forEach(food=>{
if(category==="all"){
food.style.display="block";
}else{
food.style.display = food.classList.contains(category)? "block" : "none";
}
});
}

function placeOrder(){
let name = document.getElementById("name").value.trim();
let phone = document.getElementById("phone").value.trim();
let address = document.getElementById("address").value.trim();
let payment = document.getElementById("payment").value;
if(name===""){ alert("Please enter your name"); return; }
if(phone===""){ alert("Please enter mobile number"); return; }
if(address===""){ alert("Please enter address"); return; }
if(gpsLocation===""){ alert("GPS Location is compulsory before ordering."); return; }
let orderText = "🍔 FOODY HUB ORDER DETAIL\n";
orderText += "👤 Name: " + name + "\n";
orderText += "📞 Phone: " + phone + "\n";
orderText += "🏠 Address: " + address + "\n";
orderText += "📍 GPS: " + gpsLocation + "\n\n";
orderText += "🛒 ITEMS:\n";
let total = 0;
cart.forEach(item=>{
orderText += item.name + " x " + item.qty + " = ₹" + (item.qty * item.price) + "\n";
total += item.qty * item.price;
});
let deliveryCharge = cart.length > 0? 20 : 0;
total += deliveryCharge;
orderText += "\n🚚 Delivery Charge = ₹" + deliveryCharge;
orderText += "\n💰 Grand Total = ₹" + total;
orderText += "\n💳 Payment: " + payment;
orderText += "\n💳 UPI ID: " + upiID + "\n";
let whatsappURL = "https://wa.me/918449196052?text=" + encodeURIComponent(orderText);
window.open(whatsappURL, "_blank");
alert("Order sent successfully!");
cart = [];
renderCart();
showPage('home');
}

function addBirthdayCake(btn) {
let flavor = document.getElementById("cakeFlavor").value;
let birthdayName = prompt("Birthday Person Name:");
if (!birthdayName) return;
let birthdayAge = prompt("Birthday Age:");
if (!birthdayAge) return;
let itemName = "🎂 " + flavor + " Cake (" + birthdayName + ", Age " + birthdayAge + ")";
addItem(itemName, 499);
btn.classList.add("added");
btn.innerHTML = "✓ Added";
}

function goToMenu(){
let name = document.getElementById("name").value.trim();
let phone = document.getElementById("phone").value.trim();
let address = document.getElementById("address").value.trim();
if(name === ""){
alert("Please enter your name");
return;
}
if(phone === ""){
alert("Please enter mobile number");
return;
}
if(address === ""){
alert("Please enter address");
return;
}
if(gpsLocation === ""){
alert("Please capture GPS location first");
return;
}
showPage('menu');
}

function addColdDrink(btn){
let data = document.getElementById("coldDrinkSelect").value;
let parts = data.split("|");
let price = parseInt(parts[0]);
let name = parts[1];
addItem(name, price);
btn.classList.add("added");
btn.innerHTML = "✓ Added";
}

function addChocolate(btn){
let data = document.getElementById("chocolateSelect").value;
let qty = parseInt(document.getElementById("chocolateQty").value);
let parts = data.split("|");
let price = parseInt(parts[0]);
let name = parts[1];
let item = cart.find(x => x.name === name);
if(item){
item.qty += qty;
}else{
cart.push({
name: name,
price: price,
qty: qty
});
}
renderCart();
}

function payNow(){
let total = document.getElementById("total").innerText;
let upiLink = `upi://pay?pa=${upiID}&pn=FOODY%20HUB&am=${total}&cu=INR`;
window.location.href = upiLink;
}

function addPizza(btn){
let data = document.getElementById("pizzaSelect").value;
let qty = parseInt(document.getElementById("pizzaQty").value);
let parts = data.split("|");
let price = parseInt(parts[0]);
let name = parts[1];
let item = cart.find(x => x.name === name);
if(item){
item.qty += qty;
}else{
cart.push({
name: name,
price: price,
qty: qty
});
}
renderCart();
btn.classList.add("added");
btn.innerHTML = "✓ Added";
}
