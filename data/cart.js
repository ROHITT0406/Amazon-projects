export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
cart = [
    {productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionID:'1'
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionID:'2'
    }

]};
export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId,selectedQuantity){
    let matchingItem;
    cart.forEach((item)=>{
        if (productId === item.productId){
            matchingItem = item;
        }
    });
    if (matchingItem){
        matchingItem.quantity +=selectedQuantity;
    }else{
    cart.push({
        productId : productId,
        quantity: selectedQuantity,
        deliveryOptionID: '1'
    });}
    saveToStorage();
}

export function removeFromcart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}
export function checkoutquantity(){
    let cartQuantity=0;
    cart.forEach((item)=>{
        cartQuantity+=item.quantity;
    });
    document.querySelector('.js-checkout').innerHTML=`${cartQuantity} items`;
  }

export function updatecart(){
    let cartQuantity=0;
    cart.forEach((item)=>{
        cartQuantity+=item.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId,newQuantity){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

    saveToStorage();
}
export function displaycart(){
    const cartquantity = updatecart();
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartquantity;
    }}

export function updateDeliveryOption(productId,deliveryOptionID){
    let matchingItem; 

    cart.forEach((item)=>{
        if (productId === item.productId){
            matchingItem = item;
        }
    });
    matchingItem.deliveryOptionID = deliveryOptionID;
    saveToStorage();
}