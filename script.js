let upiID = "8449196052@nyes";
let cart = [];
let gpsLocation = "";

/* =========================
   PAGE SYSTEM
========================= */
function showPage(pageId){
document.querySelectorAll('.page').forEach(p=>{
p.classList.remove('active');
});
document.getElementById(pageId).classList.add('active');
window.scrollTo(0,0);
}

/* =========================
   GPS SYSTEM
========================= */
function getLocation(){
if(!navigator.geolocation){
alert("GPS not supported");
return;
}

navigator.geolocation.getCurrentPosition(
pos=>{
gpsLocation = pos.coords.latitude + "," + pos.coords.longitude;
document.getElementById("locationText").innerText = "✅ Location Captured";
},
()=>{
alert("Please allow location");
}
);
}

/* =========================
   VALIDATION
========================= */
function goToMenu(){
let name = document.getElementById("name").value.trim();
let phone = document.getElementById("phone").value.trim();
let address = document.getElementById("address").value.trim();

if(!name || !phone || !address){
alert("Please fill all details");
return;
}

showPage("menu");
}

/* =========================
   CORE CART ENGINE (PREMIUM)
========================= */
function addItem(name,price,btn=null){

let item = cart.find(x=>x.name===name);

if(item){
item.qty++;
}else{
cart.push({name,price,qty:1});
}

if(btn){
btn.innerText="✓ Added";
btn.disabled=true;
setTimeout(()=>{
btn.innerText="Add To Cart";
btn.disabled=false;
},800);
}

renderCart();
}

/* =========================
   SAFE SELECT HELPERS
========================= */
function getData(box,selectClass,qtyClass){
let sel = box.querySelector(selectClass);
let qty = box.querySelector(qtyClass);

let [price,name] = sel.value.split("|");

return {
price:parseInt(price),
name:name,
qty:parseInt(qty.value || 1)
};
}

/* =========================
   BURGER
========================= */
function Burger(btn){
let box = btn.closest(".food");
let data = getData(box,".burgerSelect",".burgerQty");

addItem(data.name,data.price,btn);
}

/* =========================
   PIZZA
========================= */
function addPizza(btn){
let box = btn.closest(".food");
let data = getData(box,".pizzaSelect",".pizzaQty");

for(let i=0;i<data.qty;i++){
addItem(data.name,data.price);
}

btn.innerText="✓ Added";
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

/* =========================
   CHOWMEIN (FIXED)
========================= */
function addChowmein(btn){
let box = btn.closest(".food");
let data = getData(box,".chowSelect",".chowQty");

for(let i=0;i<data.qty;i++){
addItem(data.name,data.price);
}

btn.innerText="✓ Added";
}
function addPatiz(btn){

let box = btn.closest(".food-content");

if(!box){
alert("Patiz box not found");
return;
}

let select = box.querySelector("select");
let qty = box.querySelector("input");

if(!select){
alert("Select not found");
return;
}

let [price,name] = select.value.split("|");

let q = parseInt(qty?.value || 1);

for(let i=0;i<q;i++){
addItem(name, parseInt(price));
}

btn.innerText = "✓ Added";
btn.disabled = true;

setTimeout(()=>{
btn.innerText = "Add To Cart";
btn.disabled = false;
},800);
}

function addColdDrink(btn){

let box = btn.closest(".food-content");

let drink = box.querySelector(".drinkSelect").value.split("|");
let size = box.querySelector(".drinkSize").value.split("|");

let price = parseInt(drink[0]) + parseInt(size[0]);
let name = drink[1] + " (" + size[1] + ")";

addItem(name, price, btn);

btn.innerText = "✓ Added";

setTimeout(()=>{
btn.innerText = "Add To Cart";
},1000);

}

/* =========================
   CHOCOLATE
========================= */
function addChocolate(btn){
let box = btn.closest(".food");
let data = getData(box,".chocoSelect",".chocoQty");

for(let i=0;i<data.qty;i++){
addItem(data.name,data.price);
}

btn.innerText="✓ Added";
}

/* =========================
   CART RENDER
========================= */
function renderCart(){

let box = document.getElementById("cartItems");
box.innerHTML = "";

let total = 0;

cart.forEach(item=>{
total += item.price * item.qty;

box.innerHTML += `
<div class="cart-item">
<b>${item.name}</b>
<span>₹${item.price} x ${item.qty}</span>
<button onclick="increaseQty('${item.name}')">+</button>
<button onclick="decreaseQty('${item.name}')">-</button>
<button onclick="removeItem('${item.name}')">❌</button>
</div>
`;
});

document.getElementById("foodTotal").innerText = total;
document.getElementById("deliveryCharge").innerText = cart.length ? 20 : 0;
document.getElementById("total").innerText = total + (cart.length ? 20 : 0);
}

/* =========================
   QTY SYSTEM
========================= */
function increaseQty(name){
let i = cart.find(x=>x.name===name);
if(i) i.qty++;
renderCart();
}

function decreaseQty(name){
let i = cart.find(x=>x.name===name);
if(i){
i.qty--;
if(i.qty<=0) cart = cart.filter(x=>x.name!==name);
}
renderCart();
}

function removeItem(name){
cart = cart.filter(x=>x.name!==name);
renderCart();
}

/* =========================
   PLACE ORDER (WHATSAPP)
========================= */
function placeOrder(){

let name = document.getElementById("name").value.trim();
let phone = document.getElementById("phone").value.trim();
let address = document.getElementById("address").value.trim();
let payment = document.getElementById("payment").value;

if(!name || !phone || !address){
alert("Fill details");
return;
}

if(cart.length===0){
alert("Cart empty");
return;
}

let foodTotal = 0;

cart.forEach(i=>{
foodTotal += i.price*i.qty;
});

if(foodTotal < 130){
alert("❌ Minimum Order ₹130 Required");
return;
}

let msg = `🍔 FOODY HUB ORDER\n\n👤 ${name}\n📞 ${phone}\n🏠 ${address}\n\n`;

cart.forEach(i=>{
msg += `${i.name} x${i.qty} = ₹${i.price*i.qty}\n`;
});

msg += `\n🍔 Total: ₹${foodTotal}`;
msg += `\n🚚 Delivery: ₹${cart.length?20:0}`;
msg += `\n💰 Grand: ₹${foodTotal + (cart.length?20:0)}`;
msg += `\n💳 Payment: ${payment}`;

let url = "https://wa.me/918449196052?text=" + encodeURIComponent(msg);

window.open(url,"_blank");

cart=[];
renderCart();
showPage("home");
}

/* =========================
   INIT
========================= */
window.onload = ()=>{
renderCart();
};
