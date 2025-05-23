function Cart(localStorageKey){
    const cart = {
        cartItems : undefined,
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if (!this.cartItems){
            this.cartItems = [
                {productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:2,
                    deliveryOptionID:'1'
                },{
                    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity:1,
                    deliveryOptionID:'2'
                }
            
            ]};
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
        },
        addToCart(productId,selectedQuantity){
            let matchingItem;
            this.cartItems.forEach((item)=>{
                if (productId === item.productId){
                    matchingItem = item;
                }
            });
            if (matchingItem){
                matchingItem.quantity += selectedQuantity;
            }else{
            this.cartItems.push({
                productId : productId,
                quantity: selectedQuantity,
                deliveryOptionID: '1'
            });}
            this.saveToStorage();
        },
        removeFromcart(productId){
            const newCart=[];
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },
        checkoutquantity(){
            let cartQuantity=0;
            this.cartItems.forEach((item)=>{
                cartQuantity+=item.quantity;
            });
            document.querySelector('.js-checkout').innerHTML=`${cartQuantity} items`;
          },
          updatecart(){
            let cartQuantity=0;
            this.cartItems.forEach((item)=>{
                cartQuantity+=item.quantity;
            });
            return cartQuantity;
        },
        updateQuantity(productId,newQuantity){
            let matchingItem;
        
            this.cartItems.forEach((cartItem)=>{
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
        
            matchingItem.quantity = newQuantity;
        
            this.saveToStorage();
        },
        displaycart(){
            const cartquantity = this.updatecart();
            const cartQuantityElement = document.querySelector('.js-cart-quantity');
            if (cartQuantityElement) {
                cartQuantityElement.innerHTML = cartquantity;
            }},
        updateDeliveryOption(productId,deliveryOptionID){
                let matchingItem; 
            
                this.cartItems.forEach((item)=>{
                    if (productId === item.productId){
                        matchingItem = item;
                    }
                });
                matchingItem.deliveryOptionID = deliveryOptionID;
                this.saveToStorage();
            }
    
    
    };
    return cart;
}


const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
cart.loadFromStorage(); 
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);