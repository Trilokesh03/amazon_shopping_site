function Cart(localStorageKey){
  const cart={
    cartItems:undefined,

    loadFromStorage() {
    this.cartItems=JSON.parse(localStorage.getItem(localStorageKey)) ||[] ;
    },

    saveToLocal(){
    localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    addtocart(prdtId){
      let ispresent;
      this.cartItems.forEach((cartitem)=>{
        if(prdtId===cartitem.prdtId)
            ispresent=cartitem;
      })
      if(ispresent){
        ispresent.count++;
      }
      else{
        this.cartItems.push(
        {prdtId:prdtId,
          count:1,
          deliveryTypeId:'1'
        }
      );
      }
      this.saveToLocal();
    },

    removeProduct(productId){
      const temp=[];
      this.cartItems.forEach((product)=>{
        if(product.prdtId !== productId)
            temp.push(product);
      });
      this.cartItems=temp;
      this.saveToLocal();
    },

    changeDelivery(productId,deliveryId){
      let ispresent;
      this.cartItems.forEach((cartitem)=>{
        if(productId===cartitem.prdtId)
            ispresent=cartitem;
      });
      ispresent.deliveryTypeId=deliveryId;
      this.saveToLocal();
    }
  };
  return cart;
}

const cart=Cart('cart-oop');
const businessCart=Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();


/*[
  {
    prdtId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    count:2
  },
  {
    prdtId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    count:1
  }
];*/
