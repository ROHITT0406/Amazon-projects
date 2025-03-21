import {getOrder} from './order.js';
import {getProduct, loadProductsFetch} from './products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updatecart } from './cart.js';

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('product');

  const order = getOrder(orderId);
  const product = getProduct(productId);



  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });
  const cartquantity = updatecart();
    const cartvalue=document.querySelector('.js-cart-quantity');
    if(cartvalue){
    cartvalue.innerHTML=cartquantity;}
  const today=dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime=dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today.diff(orderTime)) / (deliveryTime.diff(orderTime))) * 100;
  console.log(percentProgress);
  const percent = Math.min(Math.max(percentProgress, 0), 100); 
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';
  const trackingHTML = `
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>
  <div class="delivery-date">
    ${deliveredMessage} ${
    dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
  }
  </div>
  <div class="product-info">
    ${product.name}
  </div>
  <div class="product-info">
    Quantity: ${productDetails.quantity}
  </div>
  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
    <div class="progress-label ${percent < 50 ? 'current-status' : ''}">
      Preparing
    </div>
    <div class="progress-label ${(percent >= 50 && percent < 100) ? 'current-status' : ''}">
      Shipped
    </div>
    <div class="progress-label ${percent >= 100 ? 'current-status' : ''}">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width: ${percent}%;"></div>
  </div>
`;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();