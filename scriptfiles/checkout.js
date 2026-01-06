import {cart,removeProduct} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/convertmoney.js';

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


    let cart_singleitem_HTML=
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" checked>
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" >
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" >
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>`;
    cartHTML+=cart_singleitem_HTML;
});
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
})