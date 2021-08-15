function addcart(id){
 console.log(typeof (id));
 let _data={
     userid:id
 }
console.log("maa k ladla");
 $.post('/user/addcart',{id: id},function(data){

    if(typeof data.error !='undefined'){
        new Noty({
            theme:"relax",
            text:data.error,
            type:"error",
            layout:"topRight",
            timeout:1500
         }).show();
     
    }else{
        new Noty({
            theme:"relax",
            text:data.success,
            type:"success",
            layout:"topRight",
            timeout:1500
         }).show();
       
    
         disableButton1(id);
        }
 })



}



//order button function
function order(id){
    console.log(id);  
    
 let idstring=id.substring(0,id.length-1);

}

function disableButton1(id) {
    var btn = document.getElementById(id);
    btn.disabled = true;
 
  }