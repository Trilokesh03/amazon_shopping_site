import { addtocart,cart ,loadFromStorage} from "../../data/cart.js";
describe('test suite:add to cart fn',()=>{
    it('adds existing prdt',()=>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                prdtId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                count:2,
                deliveryTypeId:'1'
            }]);
        });
        loadFromStorage();

        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].prdtId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].count).toEqual(3);
    });

    it('adds non existing prdt',()=>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].prdtId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].count).toEqual(1);
    });
});