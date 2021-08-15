let btn = $("#addItem-btn");
let Itemscards=$("#Itemscards");
let savingitembtn=$("#savingitembtn");
let formElem=$('#formElem');
btn.click(function () {
  //  addItemform .style.display = 'block';

  $("#addItemform").css("display", "block");
  $(document).scrollTop($(document).height());
});


  savingitembtn.click(async (e) => {
    e.preventDefault();
    console.log("hii master ji");
   
 let obj={

 }

    let response = await fetch('/hotel/addnewItem', {
      method: 'POST',
      body: new FormData(document.getElementById("formElem"))
    });

    let result = await response.json();
  
    if(typeof result.err !='undefined'){
      new Noty({
        theme:"relax",
        text:result.err,
        type:"error",
        layout:"topRight",
        timeout:1500
     }).show();
     activateButton()
    }else{ activateButton()
      console.log(result.Item);
  let html=`<div class="card mx-3 my-3"  id="${result.Item.itemName}"  style="width: 18rem">
  <img class="card-img-top" src="${result.Item.avatar}" alt="Card image cap" height="164" width="265" />
  <div class="card-body">

  <h3 class="card-title" style="text-transform: uppercase; font-style:italic">${result.Item. hotelname}</h3>
  <p class="card-text" style="font-size:20px;"><b> ${result.Item.itemName}</b>  </p>
  <p class="card-text" style="font-size:20px;"><b>Price :Rs ${result.Item.price}</b></p>
  <p><span style="color:rgb(247, 36, 36);font-size:20px;">Online Available: </span><b>${result.Item.Availability==true?"YES":"No"}</b></p>

 </div>
<div style="margin-bottom: 10px; text-align: center;">
 <button class="btn btn-danger editbtn" id="${result.Item._id}" onClick="edit_click(this.id)" style="width:80px;"><i class="far fa-edit"></i></button>
 <button class="btn btn-danger deletebtn" id="${result.Item._id}" onClick="delete_click(this.id)" style="width:80px;"><i class="fas fa-trash"></i></button>
 </div>
 </div>`;
  Itemscards.append(html);
      new Noty({
        theme:"relax",
        text:result.success,
        type:"success",
        layout:"topRight",
        timeout:1500
     }).show();
    }
  

   
});
// $(".deletebtn").click(async (e)=>{
// let obj1={id:e.target.id};
// let myobj=e.target.parentNode;
// console.log(myobj);
// console.log(obj1.id);
//    let response = await fetch('/hotel/deleteItem', {
//      method: 'POST',
//      body: obj1
//    });
//    let result = await response.json();

//  if(result.success){
//  new Noty({
//    theme:"relax",
//      text:result.success,
//      type:"success",
//      layout:"topRight",
//      timeout:1500
//   }).show();

//  myobj.remove();
//  }else{
//    new Noty({
//      theme:"relax",
//      text:result.err,
//      type:"error",
//      layout:"topRight",
//      timeout:1500
//   }).show();
//  }

// })

// );
async function delete_click(id){

  
console.log("id is",id);
 let obj1={id:id};
 console.log(obj1);
let btn=document.getElementById(id);
 
$.post('/hotel/deleteItem', {
        id:id
      },function(data){

        if(data.success !='undefined'){
          let btn=document.getElementById(id);
          let myobj=btn.parentNode.parentNode;
          myobj.remove();
        }
      
      }
      
      );
    
 


}
function disableButton() {
  var btn = document.getElementById('savingitembtn');
  btn.disabled = true;
  btn.innerText = 'Posting...'
}
function activateButton(){
  var btn = document.getElementById('savingitembtn');
  btn.disabled = false;
  btn.innerText = 'Submit'
}



