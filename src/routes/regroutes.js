let routes=require("express");
let regCtrl=require("../controller/homepagectrl");
let router=routes.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });
router.get("/",regCtrl.homepagectrl);
router.get("/login",regCtrl.login);
router.get("/signup",regCtrl.signup);
router.post("/register",regCtrl.regCtrl);
router.post("/validate",regCtrl.validate);
// router.post("/admindashboard",regCtrl.admindashboard);
// router.post("/userdshboard",regCtrl.userdashboard);
router.get("/hoteltab",regCtrl.hotelTab);

router.get("/citytab",regCtrl.cityTab);
router.get("/addcity",regCtrl.addcityPage);
router.post("/cityadd",regCtrl.cityAddPage);
router.get("/showcity",regCtrl.showCityPage);
router.get("/deletecity",regCtrl.deleteCity);

router.get("/amenitiestab",regCtrl.amenetiesTab);
router.get("/addamenities",regCtrl.addAmenitiesPage);
router.post("/amenitiesadd",regCtrl.amenitiesAddPage);
router.get("/showamenities",regCtrl.showAmenitiesPage);
router.get("/deleteamenities",regCtrl.deleteAmenities);

router.get("/areatab",regCtrl.areaTab);
router.get("/addarea",regCtrl.addAreaPage);
router.post("/areaadd",regCtrl.areaAddPage);
router.get("/showarea",regCtrl.showAreaPage);
router.get("/deletearea",regCtrl.deleteArea);

router.get("/reviewtab",regCtrl.reviewTab);
router.get("/addreview",regCtrl.addReviewPage);
router.post("/reviewadd",regCtrl.reviewAddPage);
router.get("/showreview",regCtrl.showReviewPage);
router.get("/deletereview",regCtrl.deleteReview);
router.get("/gethotel",regCtrl.Addhotel);
router.post('/addhotel', upload.single('image'), regCtrl.hotelFormPage);
router.get("/viewhotels",regCtrl.viewHotelPage);

router.post("/logout",regCtrl.logoutadmin);


//user dashboard
router.get("/bookingstab",regCtrl.bookingTab);
router.get("/viewhoteltouser",regCtrl.viewHotelToUser);
router.get("/logoutuser",regCtrl.logOutUser);
module.exports=router;