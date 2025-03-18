 import {cart} from '../../data/cart.js';
 export function rendercheckoutHeader(){
    let totalquantity =0;
    cart.forEach((cartItem)=>{
        totalquantity+=cartItem.quantity
    });
    document.querySelector('.js-checkout-payment').innerHTML=`Items(${totalquantity}):`;
 }
 export default rendercheckoutHeader;