export let cart=JSON.parse(localStorage.getItem('cart')) ||[] ;
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

function saveToLocal(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addtocart(prdtId){
      let ispresent;
      cart.forEach((cartitem)=>{
        if(prdtId===cartitem.prdtId)
            ispresent=cartitem;
      })
      if(ispresent){
        ispresent.count++;
      }
      else{
        cart.push(
        {prdtId:prdtId,
          count:1,
          deliveryTypeId:'1'
        }
      );
      }
      saveToLocal();
}
export function removeProduct(productId){
  const temp=[];
  cart.forEach((product)=>{
    if(product.prdtId !== productId)
        temp.push(product);
  });
  cart=temp;
  saveToLocal();
}