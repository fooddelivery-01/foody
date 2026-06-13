let userLat = null;
let userLng = null;

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

    document.getElementById("locationText").innerText = "Getting location...";

    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

/* =========================
   GPS SUCCESS
========================= */
function showPosition(position){

    userLat = position.coords.latitude;
    userLng = position.coords.longitude;

    gpsLocation = `https://www.google.com/maps?q=${userLat},${userLng}`;

    console.log("GPS READY:", gpsLocation);

    document.getElementById("locationText").innerText =
        "Location Selected ✔";

    let mapLink = document.getElementById("mapLink");
    if(mapLink){
        mapLink.href = gpsLocation;
        mapLink.style.display = "inline-block";
    }

    let mapContainer = document.getElementById("mapContainer");
    if(mapContainer){
        mapContainer.innerHTML = `
            <iframe
                width="100%"
                height="250"
                frameborder="0"
                style="border:0"
                src="https://maps.google.com/maps?q=${userLat},${userLng}&z=15&output=embed">
            </iframe>
        `;
    }
}

/* =========================
   GPS ERROR
========================= */
function showError(error){
    alert("Location error: " + error.message);
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
   CART ENGINE
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
   GET SELECT DATA
========================= */
function getData(box,selectClass,qtyClass){
    let sel = box.querySelector(selectClass);
    let qty = box.querySelector(qtyClass);

    let [price,name] = sel.value.split("|");

    return {
        price: parseInt(price),
        name: name,
        qty: parseInt(qty.value || 1)
    };
}

/* =========================
   ITEMS
========================= */
function Burger(btn){
    let box = btn.closest(".food");
    let data = getData(box,".burgerSelect",".burgerQty");
    addItem(data.name,data.price,btn);
}

function addPizza(btn){
    let box = btn.closest(".food");
    let data = getData(box,".pizzaSelect",".pizzaQty");

    for(let i=0;i<data.qty;i++){
        addItem(data.name,data.price);
    }

    btn.innerText="✓ Added";
}

function addChowmein(btn){
    let box = btn.closest(".food");
    let data = getData(box,".chowSelect",".chowQty");

    for(let i=0;i<data.qty;i++){
        addItem(data.name,data.price);
    }

    btn.innerText="✓ Added";
}

function addChocolate(btn){
    let box = btn.closest(".food");
    let data = getData(box,".chocoSelect",".chocoQty");

    for(let i=0;i<data.qty;i++){
        addItem(data.name,data.price);
    }

    btn.innerText="✓ Added";
}

function addColdDrink(btn){

    let box = btn.closest(".food-content");

    let drink = box.querySelector(".drinkSelect").value.split("|");
    let size = box.querySelector(".drinkSize").value.split("|");

    let price = parseInt(drink[0]) + parseInt(size[0]);
    let name = drink[1] + " (" + size[1] + ")";

    addItem(name,price,btn);
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
   PLACE ORDER
========================= */
function placeOrder(){

    if(!gpsLocation){
        alert("❌ Please Get GPS Location first");
        return;
    }

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
        foodTotal += i.price * i.qty;
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
    msg += `\n📍 Location: ${gpsLocation}`;

    let url = "https://wa.me/918449196052?text=" + encodeURIComponent(msg);

    window.open(url,"_blank");

    cart=[];
    renderCart();
    showPage("home");
}
