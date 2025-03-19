import {addToCart,displaycart} from '../data/cart.js';
import { products } from '../data/products.js';
let productsHTML = '';
products.forEach((product)=>{
    productsHTML += `  
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>
            ${product.extraInfoHTML()}
            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>`
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;


const addedMessageTimeouts = new Map();//hold a key value pair

function addedMessage(productId){
    const addedMessage = document.querySelector(`.js-added-${productId}`);
        addedMessage.classList.add('js-after-added');
       
        if (addedMessageTimeouts.has(productId)) {
            clearTimeout(addedMessageTimeouts.get(productId));
          }
        const timeoutId=setTimeout(() => {
        addedMessage.classList.remove('js-after-added');
        addedMessageTimeouts.delete(productId);

        }, 2000);
        addedMessageTimeouts.set(productId, timeoutId);
    }
function buttonValue(productId){
        const buttonvalue=document.querySelector(`.js-quantity-selector-${productId}`);
        return Number(buttonvalue.value);
    }
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId = button.dataset.productId;
        const selectedQuantity=buttonValue(productId);
        addedMessage(productId);
        addToCart(productId,selectedQuantity);
        displaycart();

    });
  
});
displaycart();