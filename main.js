//Cart Open Close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}
//Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active')
}

//Making Add To Cart
//Cart Working js
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready()
}

//Making Function
function ready() {
    //Remove item from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChaged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    loadCartItem();
}

// remove cart item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItem()
}

//Quantity Change
function quantityChaged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItem();
    updateCartIcon();
}

// Add cart function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItem();
    updateCartIcon();

}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItem = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItem.getElementsByClassName("cart-product-title");
    for (var i=0; i<cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title) {
                alert("این محصول قبلا به سبد خرید اضافه شده");
                return;
            }
    }
    var cartBoxContent = `<img src="${productImg}" class="cart-img">
    <div class="deatail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!--Remove Item-->
    <i class="bx bx-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItem.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChaged);
    saveCartItem();
    updateCartIcon();
}


//Update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("تومان",""))
        var quantity = quantityElement.value;
        total += price * quantity;

      
    }
          //if price have petty cash
          total = Math.round(total * 100) / 100;
          document.getElementsByClassName("total-price")[0].innerText = "تومان" + total;
          // Save total to localstorage
          localStorage.setItem("cartTotal", total);
}

// keep item in cart when page refresh
function saveCartItem() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItem = [];

    for (var i = 0; i < cartBoxes.length; i++){
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItem.push(item);
        }
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }

//Loads in cart
function loadCartItem() {
    var cartItem = localStorage.getItem("cartItem");
    if(cartItem) {
        cartItem = JSON.parse(cartItem);

        for (var i=0; i<cartItem.length; i++){
            var item = cartItem[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if(cartTotal) {
        document.getElementsByClassName("total-price")[0].innerText = "تومان" + cartTotal;
    }
        updateCartIcon();
} 

//Quantity in cart icon
function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for(var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector("#cart-icon");
    cartIcon.setAttribute("data-quantity", quantity);
}
 