import {cart} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';

export function renderPaymentSummary(){
    let productsPriceSumCents=0;
    let shippingPricesCents=0;
    cart.forEach((catrItem)=>{
        const product=getProduct(catrItem.prdtId);
        productsPriceSumCents+= product.priceCents * catrItem.count;
        
        const deliveryOption=getDeliveryOption(catrItem.deliveryTypeId);
        shippingPricesCents+=  deliveryOption.deliveryChargeCents;
    });
    const totalBeforeTaxCents=productsPriceSumCents+shippingPricesCents;
    const taxCents=totalBeforeTaxCents*0.1;
    const totalCents=totalBeforeTaxCents+taxCents;

    const paymentSummary=`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${(productsPriceSumCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shippingPricesCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`;

    document.querySelector('.js-payment-summary').innerHTML=paymentSummary;
}