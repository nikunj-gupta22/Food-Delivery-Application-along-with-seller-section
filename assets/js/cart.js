//deleting a cart
function deletecart(id) {
  console.log(id);

  let idstring = id.substring(0, id.length - 1);

  let btn = document.getElementById(id);
  $.post(
    "/user/cartdelete",
    {
      id: idstring,
    },
    function (data) {
      if (typeof data.success != "undefined") {
        btn.parentNode.parentNode.remove();
        let str = idstring + "i";
        let doc = document.getElementById(str);
        let grandtotal = document.getElementById("grandtotal");
        let totalprice = grandtotal.innerText;
        let P = parseInt(totalprice) - parseInt(btn.dataset.columns);
        grandtotal.innerText = P;

        console.log(P);

        doc.style.display = "none";
        console.log(data.success);
      } else {
        console.log(data.error);
        
      }
    }
  );
}
//adding one to a cart
function pluscart(id){
    let idstring = id.substring(0, id.length - 1);
   
   $.post("/user/increasecartItem",{id:idstring},function(data){

    if (typeof data.success != "undefined"){

      let find="cartitemqty"+idstring;
      //  console.log(find);
        let cartitemqty=document.getElementById(find);
        //console.log("cartitemqty60d46b0e7e6cf74a98b31413")
    
       let btn=document.getElementById(id);      
       let qty=parseInt(cartitemqty.innerText)+1;
       let P=   parseInt((btn.dataset.columns))*qty;;
      cartitemqty.innerText=qty;
      let str = idstring + "i";
      let doc = document.getElementById(str);
     let itemname=doc.dataset.cole;
     doc.innerHTML=`<b>${itemname}  Rs.<span>${P}</span> </b>`;
     let grandtotal = document.getElementById("grandtotal");
            let totalprice = grandtotal.innerText;
            let P1 = parseInt(totalprice) + parseInt((btn.dataset.columns));
            grandtotal.innerText = P1;
     return;
    }else{
        new Noty({
      theme:"relax",
      text:result.error,
      type:"error",
      layout:"topRight",
      timeout:1500
   }).show(); 
    }


   })
   
   
    }



//removing one from a cart

function minuscart(id){
  let idstring = id.substring(0, id.length - 1);  
  $.post("/user/reducingcartItem",{id:idstring},function(data){
    console.log(data);
 
  
    if (typeof data.success != "undefined"){

    let find="cartitemqty"+idstring;
  //  console.log(find);
    let cartitemqty=document.getElementById(find);
    //console.log("cartitemqty60d46b0e7e6cf74a98b31413")

   let btn=document.getElementById(id);      
   let qty=parseInt(cartitemqty.innerText)-1;
   if(qty==0){
       qty=1;
   }
let P=   parseInt((btn.dataset.columns))*qty;;
cartitemqty.innerText=qty;
let str = idstring + "i";
let doc = document.getElementById(str);
let itemname=doc.dataset.cole;
doc.innerHTML=`<b>${itemname}  Rs.<span>${P}</span> </b>`;
let grandtotal = document.getElementById("grandtotal");
        let totalprice = grandtotal.innerText;
        if(qty>=1){
        let P1 = parseInt(totalprice) - parseInt((btn.dataset.columns));
        
        grandtotal.innerText = P1;
        }
        return;
    }
      });

    }
