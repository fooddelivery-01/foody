let gpsLocation = "";

function getLocation(){
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(
function(position){
let lat = position.coords.latitude;
let lng = position.coords.longitude;
gpsLocation = lat + "," + lng;
document.getElementById("locationText").innerHTML = "✅ GPS Location Captured";
document.getElementById("mapContainer").innerHTML = `<iframe width="100%" height="300" style="border:0;border-radius:15px;" src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"></iframe>`;
document.getElementById("mapLink").href = `https://www.google.com/maps?q=${lat},${lng}`;
document.getElementById("mapLink").style.display = "inline-block";
},
function(){
alert("Please allow GPS access.");
}
);
}else{
alert("Geolocation not supported.");
}
}

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
