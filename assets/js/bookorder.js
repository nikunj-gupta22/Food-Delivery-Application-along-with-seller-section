
console.log("hii");

let book=$(".book");

book.click(function(e){
console.log(e.target.id);
let itemName=e.target.parentNode.parentNode.cells[0].innerHTML;
let Qty=e.target.parentNode.parentNode.cells[1].innerHTML;
let price=e.target.parentNode.parentNode.cells[2].innerHTML;
let hotel=e.target.parentNode.parentNode.cells[3].innerHTML;
disableButton(e.target.id);
$.post("/admin/bookorderinhotel",{
    itemName:itemName,
    Qty:Qty,
    price:price,
    hotel:hotel
},function(data){
 
    if(typeof data.success != 'undefined'){
        activateButton(data.success,e.target.id);
    }
})

})


function disableButton(id) {
    var btn = document.getElementById(id);
    btn.disabled = true;
    btn.innerText = 'Posting...'
  }
  function activateButton(text,id){
    var btn = document.getElementById(id);
    btn.disabled = false;
    btn.innerText = text
  }




  //Admin order page js
  let acceptbtn=$(".accept");

  acceptbtn.click(function(e){
      console.log(e.target.id);
      $.post("/admin/changeorderstatus1",{id:e.target.id},function(data){
          console.log(data);
      })
  })






  


















