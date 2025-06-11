let regmodel=require("../models/regmodel.js");
exports.homepagectrl=(req,res)=>{
    res.render("homepage.ejs");
}
exports.login=(req,res)=>{+
    res.render("login.ejs");
}
exports.signup=(req,res)=>{
    res.render("signup.ejs");
}
exports.regCtrl=(req,res)=>{
     let {username,useremail,password,contact,type}=req.body;
    let result=regmodel.acceptData(username,useremail,password,contact,type);
     res.render("signup.ejs",{msg:result});
}