const SHEET_URL = "https://script.google.com/macros/s/AKfycbzXwp_JR4bGHzDXjZaqLrC7jfnJvgS8iekTSfLfzPTxGaapCblJeg_8AbJ6mqIlaOpQ7Q/exec";
let userDistance = 0;
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
let deliveryCharge = calculateDeliveryCharge();
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
if(!gpsLocation){
alert("GPS Location required");
return;
}
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
let deliveryCharge = calculateDeliveryCharge();
total += deliveryCharge;
orderText += "\n🚚 Delivery Charge = ₹" + deliveryCharge;
orderText += "\n💰 Grand Total = ₹" + total;
orderText += "\n💳 Payment: " + payment;
orderText += "\n💳 UPI ID: " + upiID + "\n";
fetch(SHEET_URL, {
  method: "POST",
  body: JSON.stringify({
    name: name,
    phone: phone,
    address: address,
    gps: gpsLocation,
    items: orderText,
    total: total,
    payment: payment
  })
})
.then(() => console.log("Order Saved To Sheet"))
.catch(err => console.log(err));
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

// ===== Foody Hub Delivery Area Lock =====
const SHOP_LAT = 27.32828;  // Teri shop
const SHOP_LNG = 78.152215;
const MAX_DISTANCE = 16; // 16km

// Distance calculate karne ka formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Delivery area check
function checkDeliveryArea() {
  if (!navigator.geolocation) {
    alert("Location access nahi mila. Delivery area check nahi ho payega.");
    return;
  }
  
  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    const distance = getDistance(SHOP_LAT, SHOP_LNG, userLat, userLng);
    userDistance = distance;
    
    console.log(`User distance: ${distance.toFixed(1)} km`);
    
    if (distance > MAX_DISTANCE) {
      // 16km se baahar hai
      const msg = `Sorry! Hum sirf ${MAX_DISTANCE}km tak delivery karte hai.\nAap ${distance.toFixed(1)}km door ho.`;
      alert(msg);
      
      // Saare Order/Cart button band kar de
      document.querySelectorAll('.add-btn, #placeOrderBtn').forEach(btn => {
        btn.disabled = true;
        btn.innerText = 'Out of Delivery Area';
        btn.style.background = '#555';
        btn.style.cursor = 'not-allowed';
      });
      
      // Upar red warning banner dikha de
      const warning = document.createElement('div');
      warning.style.cssText = 'background:#ff4444;color:white;padding:12px;text-align:center;font-weight:bold;position:fixed;top:0;left:0;width:100%;z-index:1000;';
      warning.innerText = `⚠️ Aap delivery area se baahar ho. Sirf ${MAX_DISTANCE}km tak service available`;
      document.body.prepend(warning);
      
    } else {
      console.log(`Delivery available! ${distance.toFixed(1)} km door ho`);
    }
  }, (error) => {
    alert("Location permission allow karo warna order nahi hoga bhai");
  });
}

// Page load hote hi check
window.addEventListener("load", checkDeliveryArea);
function calculateDeliveryCharge() {

    if(cart.length === 0){
        return 0;
    }

    // 8 km tak fixed ₹20
    if(userDistance <= 8){
        return 20;
    }

    // 8 km ke baad ₹2 per km extra
    let extraKm = Math.ceil(userDistance - 8);

    return 20 + (extraKm * 2);
}
function showReview(){
    document.getElementById("reviewModal").style.display="flex";
}

function closeReview(){
    document.getElementById("reviewModal").style.display="none";
}

function submitReview(){

    let stars =
    document.getElementById("starRating").value;

    let taste =
    document.getElementById("tasteRating").value;

    alert(
        "⭐ Rating: " + stars + "/5\n\n" +
        "😋 Taste: " + taste +
        "\n\nThank You For Your Review ❤️"
    );

    closeReview();
} function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.address,
    data.gps,
    data.items,
    data.total,
    data.payment
  ]);

  return ContentService
    .createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}
