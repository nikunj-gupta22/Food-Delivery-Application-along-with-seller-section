const node_mailer=require("../config/nodemailer.js");
exports.bookorder=(detail)=>{
    let HtmlString=node_mailer.renderTemplate({detail:detail},"/neworder.ejs");
    node_mailer.transporter.sendMail({
        from:"nikunjniv2228@gmail.com",
        to:detail.email,
        subject:"FoodoFest Booking",
        html:HtmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
      return;  }
      console.log("message sent",info);
      return;


    })
}