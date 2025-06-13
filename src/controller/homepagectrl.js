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
// exports.validate = (req, res) => {
//   let { username, password } = req.body;
//   let result;
//   async function getdata() {
//     result = await regmodel.validateFromDB(username, password);
// //     result.then((r) => {
// //     console.log(r.length);
// //     if (r.length > 0) {
// //       req.session.uid = r[0].rid;
// //       console.log("login user id stored in session" + r[0].rid);
// //       res.render("admindashboard.ejs");
// //     } else {
// //       res.render("login.ejs", { msg: "Invalid username and password" });
// //     }
// //   }).catch((err) => {
// //     res.render("error.ejs"); // ❗ Happens when there's an error in DB query
// //   });
// console.log(result);
// if(result.length>0)
// {
//     let id=result[0].userid;
//     console.log(id);
//   req.session.uid = id;
//     console.log("login user id stored in session" + id);
//       //  res.render("userdashboard.ejs");
//       res.render("admindashboard.ejs");
// }
// else
// {
//    res.render("login.ejs", { msg:"Invalid username and password" }) 
// }
// }
//   getdata();
// };


// exports.admindashboard = (req, res) => {
//   const { username, password, type } = req.body;

//   regmodel.whologin(username, password, type, (err, result) => {
//     if (err) {
//       console.error("DB error during login:", err);
//       return res.render("login", { msg: "Something went wrong." });
//     }

//     if (result.length > 0) {
//       // Set session here if needed
//       req.session.uid = result[0].userid;

//       if (type === "admin") {
//         res.render("admindashboard");
//       } else {
//         res.render("userdashboard");
//       }
//     } else {
//       res.render("login", { msg: "Invalid username, password, or role." });
//     }
//   });
// };
//  exports.userdashboard=(req,res)=>{
//   res.render("userdashboard");
//  }

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
      } else if (type === "guest") {
        return res.render("userdashboard");
      } else {
        return res.render("login", { msg: "Unknown user type." });
      }
    } else {
      return res.render("login", { msg: "Invalid username, password, or role." });
    }
  });
};
exports.hotelTab=(req,res)=>{
  // res.render("hoteltab.ejs");
  res.render("admindashboard",{name:"hoteltab.ejs"});
};

exports.addHotels=(req,res)=>{
  res.render("addhotels.ejs");

};
