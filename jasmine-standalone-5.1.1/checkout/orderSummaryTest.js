import { loadFromStorage} from "../../data/cart.js";
import { renderOrderSummary } from "../../scriptfiles/checkout/orderSummary.js";

describe('test suite renderordersummary',()=>{
    it('display the cart',()=>{
        document.querySelector('.js-test-container').innerHTML=
            `<div class="js-order-summary"></div><hr>
             <div class="js-checkout-quantity"></div>`;

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                prdtId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                count:2,
                deliveryTypeId:'1'
            },{
                prdtId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                count:1,
                deliveryTypeId:'2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
        expect(document.querySelector('.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Quantity: 2');
    });
    it('removing a product',()=>{
        document.querySelector('.js-test-container').innerHTML=
            `<div class="js-order-summary"></div><hr>
             <div class="js-checkout-quantity"></div>
             <hr>
             <div class="js-payment-summary"></div>`;

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                prdtId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                count:2,
                deliveryTypeId:'1'
            },{
                prdtId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                count:1,
                deliveryTypeId:'2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();

        document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();
    });
});