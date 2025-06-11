let routes=require("express");
let regCtrl=require("../controller/homepagectrl");
let router=routes.Router();
router.get("/",regCtrl.homepagectrl);
router.get("/login",regCtrl.login);
router.get("/signup",regCtrl.signup);
router.post("/register",regCtrl.regCtrl);
module.exports=router;