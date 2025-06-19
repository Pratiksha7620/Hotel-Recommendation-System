let regmodel=require("../models/regmodel.js");
exports.homepagectrl=(req,res)=>{
    res.render("homepage.ejs");
}
exports.login=(req,res)=>{
    res.render("login.ejs",{msg:""});
}
exports.signup=(req,res)=>{
    res.render("signup.ejs",{msg:""});
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
//hoteltab controller
exports.hotelTab = (req, res) => {
  const show = req.query.show || "";
    const cities = req.query.cities || "";
  if (show === "viewhotels") {
    // Example: get hotels from DB
    regmodel.getAllHotels((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "hoteltab.ejs", show, hotels: [],cities:[]});
      }
      res.render("admindashboard", { name: "hoteltab.ejs", show, hotels ,cities});
    });
  } else {
    res.render("admindashboard", { name: "hoteltab.ejs", show,cities });
  }
};

// exports.hotelTab = (req, res) => {
//   const show = req.query.show || "";

//   if (show === "viewhotels") {
//     regmodel.getAllHotels((err, hotels) => {
//       if (err) {
//         console.error("Error fetching hotels:", err);
//         return res.render("admindashboard", {
//           name: "hoteltab.ejs",
//           show,
//           hotels: [],
//           cities: []
//         });
//       }
//       res.render("admindashboard", {
//         name: "hoteltab.ejs",
//         show,
//         hotels,
//         cities: []
//       });
//     });
//   } else {
//     regmodel.fetchCities().then((cities) => {
//       res.render("admindashboard", {
//         name: "hoteltab.ejs",
//         show,
//         cities,
//         hotels: [] // provide empty list to avoid undefined in viewhotels
//       });
//     }).catch((err) => {
//       console.error("Error fetching cities:", err);
//       res.render("admindashboard", {
//         name: "hoteltab.ejs",
//         show,
//         cities: [],
//         hotels: []
//       });
//     });
//   }
// };

//citytab controller
exports.cityTab=(req,res)=>{
  const show = req.query.show || "none";
  if (show === "viewcity") {
    // Example: get hotels from DB
    regmodel.getAllcity((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "citytab.ejs", show,hotels: [] });
      }
      res.render("admindashboard", { name: "citytab.ejs", show, hotels });
    });
  } else {
    res.render("admindashboard", { name: "citytab.ejs", show });
  }
};
exports.addcityPage= (req, res) => {
  res.render("addcity.ejs",{msg:""});
};




exports.cityAddPage=(req,res)=>{
    let{city_name,pincode}=req.body;
   let result=regmodel.acceptcityData(city_name,pincode);
   result.then((data)=>{
    res.render("addcity.ejs",{data,msg:"City Added Successfully"})
   })
}



exports.showCityPage=(req,res)=>{
  let result=regmodel.getAllcityPage();
  result.then((data)=>{
    res.render("viewcity.ejs",{data :data})
    // res.render("viewcity.ejs",data);
  });
};
//delete city from viewcity.ejs 
exports.deleteCity=(req,res)=>{
  let city_id=parseInt(req.query.city_id.trim());
  let result=regmodel.cityDelete(city_id);
  //console.log(city_id);
  result.then((data)=>{
    res.render("viewcity.ejs",{data:data[0]}); 
  })
};
//amenities tab controller
 exports.amenetiesTab=(req,res)=>{
   const show = req.query.show || "nofile";
  if (show === "viewamenities") {
    // Example: get hotels from DB
    regmodel.getAllamenities((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "amenitiestab.ejs", show, hotels: [] });
      }
      res.render("admindashboard", { name: "amenitiestab.ejs", show, hotels });
    });
  } else {
    res.render("admindashboard", { name: "amenitiestab.ejs", show });
  }

 };
 exports.addAmenitiesPage=(req,res)=>{
  res.render("admindashboard",{name:"amenitiestab.ejs",show:"addamenities.ejs",msg:""});
 };
 //add amenites in form/database controller
exports.amenitiesAddPage=(req,res)=>{
  let{amenity_name}=req.body;
  let result=regmodel.acceptAmenityData(amenity_name);
  //console.log(amenity_name);
  result.then((data)=>{
     res.render("admindashboard",{name:"amenitiestab.ejs",show:"addamenities.ejs",msg:"Amenities Added Sucesfully"});
  })
};
//show all amenities on viewamenities page controller
exports.showAmenitiesPage=(req,res)=>{
 let result=regmodel.getAllAmenites();
 result.then((data)=>{
  res.render("admindashboard",{name:"amenitiestab.ejs",show:"viewamenities.ejs",data:data});;
 })
};
//Delete amenities controller
exports.deleteAmenities=async(req,res)=>{
  let amenity_id=parseInt(req.query.amenity_id.trim());
 try{
      let result=await regmodel.deleteAmenity(amenity_id);
  console.log(result);
        res.render("viewamenities",{data:result});
 }
 catch(err)
 {
    console.log(err);
 }
};
//area tab controller that is addarea viewarea 
exports.areaTab=(req,res)=>{
 const show = req.query.show || "";
  if (show === "viewarea") {
    // Example: get hotels from DB
    regmodel.getAllarea((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "areatab.ejs", show, hotels: [] });
      }
      res.render("admindashboard", { name: "areatab.ejs", show, hotels });
    });
  } else {
    res.render("admindashboard", { name: "areatab.ejs", show });
  }
};
//create addareaform page controller
exports.addAreaPage=(req,res)=>{
  res.render("addarea.ejs",{msg:""});
};
//area add in database page controller
exports.areaAddPage=(req,res)=>{
  let{area_name}=req.body;
  let result=regmodel.acceptAreaData(area_name);
  result.then((data)=>{
    res.render("addarea.ejs",{data,msg:"area Added Successfully"})
  })
};
//show all area on viewarea page controller
exports.showAreaPage=(req,res)=>{
  let result=regmodel.getAllArea();
   result.then((data)=>{
    res.render("viewarea.ejs",{data :data})
  });
};
//area delete controller
exports.deleteArea=async(req,res)=>{
  let area_id=parseInt(req.query.area_id.trim());
 try{
      let result=await regmodel.deleteAreas(area_id);
  console.log(result);
        res.render("viewarea",{data:result});
 }
 catch(err)
 {
    console.log(err);
 }
};
//reviewtab controller means addreview and viewreviewtab
exports.reviewTab=(req,res)=>{
  const show = req.query.show || "";
  if (show === "viewreview") {
    // Example: get hotels from DB
    regmodel.getAllreview((err, hotels) => {
      if (err) {
        console.error("Error fetching hotels:", err);
        return res.render("admindashboard", { name: "reviewtab.ejs", show, hotels: [] });
      }
      res.render("admindashboard", { name: "reviewtab.ejs", show, hotels });
    });
  } else {
    res.render("admindashboard", { name: "reviewtab.ejs", show });
  }
};
//add review form controller
exports.addReviewPage=(req,res)=>{
  res.render("addreview.ejs",{msg:""});
};
//add data in database controller
exports.reviewAddPage=(req,res)=>{
  let{rev_text,rating,rev_date}=req.body;
  let result=regmodel.acceptReviewData(rev_text,rating,rev_date);
  result.then((data)=>{
    res.render("addreview.ejs",{msg:"review Added successfully.."})
  })
};
//view all data on viewreview.ejs controller
exports.showReviewPage=(req,res)=>{
 let result=regmodel.getAllReview();
 result.then((data)=>{
  res.render("viewreview.ejs",{data:data});
 })
};

//delete data from review controller
exports.deleteReview=async(req,res)=>{
let rev_id=parseInt(req.query.rev_id.trim());
 try{
      let result=await regmodel.deleteReviews(rev_id);
  console.log(result);
        res.render("viewreview",{data:result});
 }
 catch(err)
 {
    console.log(err);
 }
};

exports.cityareajoinpage=(req,res)=>{
 let city_id=req.params.city_id;
 let result=regmodel.fetchareacity(city_id);
 result.then((data)=>{
  res.json(data);
 })
};
exports.Addhotel = (req, res) => {
  // Load both cities and areas
  Promise.all([regmodel.showcities(), regmodel.getarea()])
    .then(([cities, areas]) => {
      res.render("addhotels.ejs", { cities, areas, msg: null });
    })
    .catch(err => {
      console.error(err);
      res.send("Error loading form");
    });
};

exports.hotelFormPage = (req, res) => {
  let {
    hotel_name,
    hotel_address,
    hotel_email,
    hotel_contact,
    rating,
    reviewcount,
    city_id,
    area_id,
  } = req.body;

  console.log("Form Data:", req.body); // Check values

  // Convert to proper types
  city_id = parseInt(city_id);
  area_id = parseInt(area_id);
  rating = parseFloat(rating);
  reviewcount = parseInt(reviewcount);

  if (!city_id || !area_id) {
    Promise.all([regmodel.showcities(), regmodel.getarea()])
      .then(([cities, areas]) => {
        res.render("admindashboard", {
          name: "hoteltab.ejs",
          show: "addhotels",
          cities,
          areas,
          msg: "Please select city and area properly.",
        });
      });
    return;
  }

  regmodel.accepthotelformdata(
    hotel_name,
    hotel_address,
    hotel_email,
    hotel_contact,
    rating,
    reviewcount,
    city_id,
    area_id
   ).then((hotel_id) => {
    console.log("New hotel ID:", hotel_id);
//     console.log("Received body:", req.body);
// console.log("Received file:", req.file);


    if (req.file) {
      const filename = req.file.filename;

      regmodel.saveHotelImage(filename, hotel_id)
        .then(() => {
          console.log("Image saved.");
          showHotelFormSuccess(res, "Hotel and image added successfully!");
        })
        .catch((err) => {
          console.error("Image save error:", err);
          showHotelFormSuccess(res, "Hotel added, but image failed to save.");
        });
    } else {
      showHotelFormSuccess(res, "Hotel added successfully (no image).");
    }
  }).catch((err) => {
    console.error("Hotel insert error:", err);
    res.send("Error saving hotel.");
  });
};

function showHotelFormSuccess(res, msg) {
  Promise.all([regmodel.showcities(), regmodel.getarea()])
    .then(([cities, areas]) => {
      res.render("admindashboard", {
        name: "hoteltab.ejs",
        show: "addhotels",
        cities,
        areas,
        msg,
      });
    });
};
exports.viewHotelPage=(req,res)=>{
  let result=regmodel.getAllHotelsWithImage();
  result.then(hotels=>{
    res.render("admindashboard",{
      name:"viewhotels.ejs",
      show:"viewhotels",
      hotels
    });
  })
  result.catch(err=>{
    console.log("Error loading hotel list:",err);
    res.send("Error loading hotel list");
  });

};