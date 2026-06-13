

const hour = new Date().getHours();
if(hour >= 21 || hour < 9){
setTimeout(() => {
let btn = document.getElementById("placeOrderBtn");
if(btn){
btn.innerHTML = "❌ Orders Closed";
btn.disabled = true;
}
}, 1000);
}
