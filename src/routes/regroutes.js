let routes=require("express");
let regCtrl=require("../controller/homepagectrl");
let router=routes.Router();
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

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });

//router.get("/getareas/:cityid",regCtrl.cityareajoinpage);
router.get("/gethotel",regCtrl.Addhotel);
// router.get("/getarea",regCtrl.area);
router.post("/hotelform", upload.single("hotel_image"), regCtrl.hotelFormPage);
// router.get("/addhotel", regCtrl.loadAddHotelForm);

router.get("/viewhotels",regCtrl.viewHotelPage);
module.exports=router;