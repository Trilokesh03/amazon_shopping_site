import {cart,removeProduct,changeDelivery} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/convertmoney.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';

function cartSize(){
    let total=0;
    cart.forEach((item)=>{total+=item.count});
    const checkoutElement=document.querySelector('.js-checkout-quantity');
    if(total===0)
        checkoutElement.textContent='';
    else
        checkoutElement.textContent=`${total} items`;
}

let cartHTML='';
cart.forEach((cartitem)=>{

    const prdtId=cartitem.prdtId;

    let matchingProduct;
    products.forEach((product)=>{
        if(product.id===prdtId)
            matchingProduct=product;
    });

    const deliveryOptionId=cartitem.deliveryTypeId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId)
            deliveryOption=option;
    });
    let today=dayjs();
    let deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    let dateString=deliveryDate.format('dddd, MMMM D');

    let cart_singleitem_HTML=
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date-${matchingProduct.id}">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartitem.count}</span>
                </span>
                <span class="update-quantity-link link-primary " >
                <span class="js-update-link js-update-button-${matchingProduct.id}" data-product-id=${matchingProduct.id}>Update</span> 
                <span class="hide js-update-input-${matchingProduct.id}"></span>
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct,cartitem)}
            
            </div>
        </div>
        </div>`;
    cartHTML+=cart_singleitem_HTML;
});
function deliveryOptionHTML(matchingProduct,cartitem){
    let deliveryHTML='';
    deliveryOptions.forEach((deliveryOption)=>{
        let today=dayjs();
        let deliveryDate=today.add(deliveryOption.deliveryDays,'days');
        let dateString=deliveryDate.format('dddd, MMMM D');
        let costString=deliveryOption.deliveryChargeCents===0?'FREE':`$${formatCurrency(deliveryOption.deliveryChargeCents)} -`;
        let isChecked= deliveryOption.id===cartitem.deliveryTypeId;
        //isChecked?document.querySelector(`.js-delivery-date-${matchingProduct.id}`).textContent=`Delivery date: ${dateString}`:'';
        deliveryHTML+=`
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-id="${deliveryOption.id}">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" 
                ${isChecked?'checked':''}>
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${costString} Shipping
                </div>
                </div>
            </div>
        `;
    
    });
    return deliveryHTML;
}

document.querySelector('.js-order-summary').innerHTML=cartHTML;
cartSize();

document.querySelectorAll('.js-delete-link').forEach((deletelink)=>{
    deletelink.addEventListener('click',()=>{

        const deleteId=deletelink.dataset.productId;
        removeProduct(deleteId);
        cartSize();
        document.querySelector(`.js-cart-item-container-${deleteId}`).remove();
        
    });
});

document.querySelectorAll('.js-update-link').forEach((item)=>{
    item.addEventListener('click',()=>{
        const updateId=item.dataset.productId;
        document.querySelector(`.js-update-input-${updateId}`).innerHTML='<input type="number"> <button>save</button> ';
        //document.querySelector(`.js-update-button-${updateId}`).classList.toggle('hide');
        //document.querySelector(`.js-update-input-${updateId}`).classList.toggle('hide');
    })
});
document.querySelectorAll('.js-delivery-option').forEach((product)=>{
    product.addEventListener('click',()=>{
        const {productId,deliveryId}=product.dataset;
        changeDelivery(productId,deliveryId);
    })
})