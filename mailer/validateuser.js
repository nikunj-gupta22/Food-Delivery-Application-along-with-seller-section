const node_mailer=require("../config/nodemailer.js");
exports.newuser=(user,num)=>{
    let HtmlString=node_mailer.renderTemplate({user:user,otp:num},"/newuser.ejs");
    node_mailer.transporter.sendMail({
        from:"nikunjniv2228@gmail.com",
        to:user.email,
        subject:"FoodoFest Verification",
        html:HtmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
      return;  }
      console.log("message sent",info);
      return;


    })
}

exports.newusersuccess=(user)=>{
    let HtmlString=node_mailer.renderTemplate({user:user},"/newusersuccess.ejs");
    node_mailer.transporter.sendMail({
        from:"nikunjniv2228@gmail.com",
        to:user.email,
        subject:"FoodoFest Signup",
        html:HtmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
      return;  }
      console.log("message sent",info);
      return;


    })
}

exports.newrestaurent=(rest)=>{
    let HtmlString=node_mailer.renderTemplate({rest:rest},"/newrestaurent.ejs");
    node_mailer.transporter.sendMail({
        from:"nikunjniv2228@gmail.com",
        to:rest.email,
        subject:"FoodoFest Signup",
        html:HtmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
      return;  }
      console.log("message sent",info);
      return;


    })
}