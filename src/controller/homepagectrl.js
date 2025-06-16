let regmodel=require("../models/regmodel.js");
exports.homepagectrl=(req,res)=>{
    res.render("homepage.ejs");
}
exports.login=(req,res)=>{
    res.render("login.ejs",{msg:""});
}
exports.signup=(req,res)=>{
    res.render("signup.ejs");
}
exports.regCtrl = (req, res) => {
  const { username, useremail, password, contact } = req.body;

  regmodel.acceptData(username, useremail, password, contact, (err, resultMsg) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.render("signup", { msg: "Registration failed. Please try again." });
    }

    return res.render("signup", { msg: resultMsg });
  });
};
exports.validate = (req, res) => {
  const { username, password, type } = req.body;

  regmodel.whologin(username, password, type, (err, result) => {
    if (err) {
      console.error("DB error during login:", err);
      return res.render("login", { msg: "Something went wrong." });
    }

    if (result.length > 0) {
      req.session.uid = result[0].userid;

      if (type === "admin") {
        return res.render("admindashboard",{name:"no"});
      } else if (type === "user") {
        return res.render("userdashboard");
      } else {
        return res.render("login", { msg: "Unknown user type." });
      }
    } else {
      return res.render("login", { msg: "Invalid username, password, or role." });
    }
  });
};
exports.hotelTab = (req, res) => {
  const show = req.query.show || "";

  if (show === "viewhotels") {
    // Example: get hotels from DB
    regmodel.getAllHotels((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "hoteltab.ejs", show, hotels: [] });
      }
      res.render("admindashboard", { name: "hoteltab.ejs", show, hotels });
    });
  } else {
    res.render("admindashboard", { name: "hoteltab.ejs", show });
  }
};
exports.cityTab=(req,res)=>{
  const show = req.query.show || "";

  if (show === "viewcity") {
    // Example: get hotels from DB
    regmodel.getAllcity((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "citytab.ejs", show, hotels: [] });
      }
      res.render("admindashboard", { name: "citytab.ejs", show, hotels });
    });
  } else {
    res.render("admindashboard", { name: "citytab.ejs", show });
  }
};
exports.addcity= (req, res) => {
  res.render("addcity",{msg:""});
};



//city added controller
// exports.cityAdd = (req, res) => {
//   const { city_name, pincode } = req.body;

//   regmodel.acceptcityData(city_name, pincode, (err, resultMsg) => {
//     if (err) {
//       console.error("Insert failed:", err);
//       return res.render("addcity", { msg: "Failed to add city. Try again." });
//     }

//     return res.render("addcity", { msg: "City added successfully!" });
//   });
// };

exports.cityAdd=(req,res)=>{
    let{city_name,pincode}=req.body;
    let result=regmodel.acceptcityData(city_name,pincode);
    res.render("addcity",{msg:result});
}

exports.showCity=(req,res)=>{
  
}
