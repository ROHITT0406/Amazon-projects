import { formatCurrency } from '../scripts/utils/money.js';
import { getProduct, loadProductsFetch } from '../../data/products.js';
import {updatecart,addToCart} from './cart.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}


export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}
function dateformat(date) {
  const orderTime = new Date(date);
  const options = { month: 'long', day: 'numeric' };
  return orderTime.toLocaleDateString('en-US', options);
}
async function loadpage(){
  await loadProductsFetch();
  const cartquantity = updatecart();
  const cartvalue=document.querySelector('.js-cart-quantity');
  if(cartvalue){
  cartvalue.innerHTML=cartquantity;}
  console.log('Products loaded, now rendering orders');

  let orderHTML = '';
  
    if (!orders || orders.length === 0) {
      const orderSummaryContainer = document.querySelector('.js-order-grid');
  if (orderSummaryContainer){
      orderSummaryContainer.innerHTML = `<p>Your cart is empty</p> 
      <button class="view-button button-primary js-view-product">View products</button>`; }
    const viewProductButton = document.querySelector('.js-view-product');
  
    if (viewProductButton) {
      viewProductButton.addEventListener('click', () => {
        window.location.href = 'amazon.html';
      });
      return;
    }
  }
  orders.forEach((order) => {
    let productsHTML = '';

    if (Array.isArray(order.products)) {
      order.products.forEach((productItem) => {
        const product = getProduct(productItem.productId);

        if (!product) {
          console.warn(`Product not found for ID: ${productItem.productId}`);
          return;
        }
        productsHTML += `
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-details">
              <div class="product-name">${product.name}</div>
              <div class="product-delivery-date">
                Arriving on: ${dateformat(productItem.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">Quantity: ${productItem.quantity}</div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&product=${product.id}">
                <button class="track-package-button button-secondary js-track-package">
                  Track package
                </button>
              </a>
            </div>
          </div>
        `;
      });
    }

    orderHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateformat(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        ${productsHTML}
      </div>
    `;
  });

    document.querySelector('.js-order-grid').innerHTML=orderHTML;
   

document.querySelectorAll('.js-buy-again').forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button.dataset.productId,1);

    button.innerHTML = 'Added';
    setTimeout(() => {
      button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      `;
    }, 1000);
  });
});
}
loadpage();
