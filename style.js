
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:#f5f5f5;
}

.page{
display:none !important;
}

.page.active{
display:block !important;
}
nav{
position:fixed;
top:0;
width:100%;
padding:15px 8%;
display:flex;
justify-content:space-between;
align-items:center;
background:rgba(0,0,0,.85);
backdrop-filter:blur(10px);
z-index:999;
}

.logo{
font-size:32px;
font-weight:800;
color:#ff9800;
}

nav ul{
display:flex;
list-style:none;
gap:20px;
}

nav ul li a{
color:white;
text-decoration:none;
font-weight:600;
}

.hero{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    color:white;

    background:
    linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),
    url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80');

    background-size:cover;
    background-position:center;
}



.hero h1{
font-size:70px;
line-height:1.2;
padding-top:60px;
}

.hero span{
color:#ff9800;
}

.btn{
background:#ff9800;
color:white;
padding:12px 30px;
border:none;
border-radius:30px;
cursor:pointer;
font-size:18px;
}

section{
padding:90px 8%;
}

.title{
font-size:40px;
text-align:center;
margin-bottom:30px;
}

.card{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,.1);
}

input,select,textarea{
width:100%;
padding:12px;
margin:10px 0;
border:1px solid #ddd;
border-radius:10px;
}

.menu-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
gap:15px;
}
#menu{
    background:
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url('https://images.unsplash.com/photo-1504674900247-0877df9cc836');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
}
.food{
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    transition: 0.3s;
}

.food:hover{
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.food-content h3{
    color:#333;
    font-weight:700;
}
.food{
background:white;
border-radius:10px;
overflow:hidden;
box-shadow:0 3px 12px rgba(0,0,0,.1);
}

.food img{
width:60%;
height:80px;
object-fit:cover;
}

.food-content{
padding:10px;
text-align:center;
}

.add-btn{
background:#ff9800;
color:white;
border:none;
padding:10px 10px;
border-radius:20px;
cursor:pointer;
}
.added{
background:#28a745 !important;
color:white;
}

.cart-item{
display:flex;
justify-content:space-between;
align-items:center;
background:white;
padding:17px;
margin:10px 0;
border-radius:16px;
}

.qty-btn{
padding:5px 12px;
margin:0 5px;
border:none;
background:#ff9800;
color:white;
border-radius:5px;
cursor:pointer;
}

.total{
font-size:37px;
font-weight:bold;
color:#ff9800;
margin-top:20px;
}

footer{
background:#111;
color:white;
text-align:center;
padding:30px;
}

@media(max-width:768px){

.hero h1{
font-size:45px;
}

nav ul{
gap:10px;
font-size:14px;
}

}
#customer{
    background: 
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url('https://images.unsplash.com/photo-1550547660-d9450f859349');
    background-size: cover;
    background-position: center;
    color: white;
}
.customer-card{
    max-width:500px;
    margin:auto;
    border-radius:20px;
    padding:30px;
    background:rgba(255,255,255,0.95);
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
    backdrop-filter:blur(10px);
}

.customer-card input,
.customer-card textarea{
    border:none;
    border-bottom:2px solid #ff9800;
    border-radius:0;
    background:transparent;
    font-size:16px;
    padding:12px 5px;
    outline:none;
}

.customer-card input:focus,
.customer-card textarea:focus{
    border-bottom:2px solid #28a745;
}

.customer-card textarea{
    min-height:80px;
    resize:none;
}
.logo{
    font-size:22px;
    font-weight:800;
    background:linear-gradient(90deg,#ff512f,#dd2476);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    white-space:nowrap;
    letter-spacing:1px;
}
nav{
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:nowrap;
}
#placeOrderBtn:disabled{
    background: gray;
    cursor: not-allowed;
    opacity: 0.8;
}
