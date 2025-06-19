let conn=require("../../db");
let type='user';
exports.acceptData = (username, useremail, password, contact, callback) => {
  const sql = "INSERT INTO usermaster VALUES (0, ?, ?, ?, ?, ?)";
  conn.query(sql, [username, useremail, password, contact, type], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, "User registered successfully.");
  });
};

exports.validateFromDB=(...userCred)=>{
  return  new Promise((resolve,reject)=>{
    conn.query("select *from usermaster where username=? and password=?",
      [...userCred],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        console.log(result);
        resolve(result);
      }
    })
  });
  return promise;
    
};
exports.whologin = (username, password, type, callback) => {
  const sql = "SELECT * FROM usermaster WHERE username=? AND password=? AND type=?";
  conn.query(sql, [username, password, type], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.getAllHotels = (callback) => {
  const sql = " SELECT h.hotel_id, h.hotel_name, h.rating, c.city_name FROM hotelmaster h LEFT JOIN citymaster c ON h.city_id = c.city_id";
  conn.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.acceptcityData = (...cityData) => {
 return new Promise((resolve,reject)=>{
   conn.query("insert into citymaster values('0',?,?)",
    [...cityData],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });

 })
    return true;
};
 
exports.getAllcityPage = () => {
  return new Promise((resolve,reject)=>{
    conn.query("select *from citymaster",(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};

exports.cityDelete=(city_id)=>{
  return new Promise((resolve,reject)=>{
    conn.query("delete from citymaster where city_id=?",[city_id],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};

exports.acceptAmenityData=(...AmenityData)=>{
  return new Promise((resolve,reject)=>{
    conn.query("insert into amenities values('0',?)",[...AmenityData],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};

exports.getAllAmenites=()=>{
  return new Promise((resolve,reject)=>{
    conn.query("select *from amenities",(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};
exports.deleteAmenity=(amenity_id)=>{
  return new Promise((resolve,reject)=>{
    conn.query("delete from amenities where amenity_id=?",[amenity_id],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        conn.query("select * from amenities",(err,r)=>
        {
            if(err)
            {
              console.log(err);
              reject(err);
            }
            else
            {
               resolve(r);
            }
        });
      }
    })
  })
};
exports.acceptAreaData=(...areadata)=>{
  return new Promise((resolve,reject)=>{
    conn.query("insert into areamaster values('0',?)",[...areadata],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};
exports.getAllArea=()=>{
  return new Promise((resolve,reject)=>{
    conn.query("select *from areamaster",(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};
exports.deleteAreas=(area_id)=>{
  return new Promise((resolve,reject)=>{
    conn.query("delete from areamaster where area_id=?",[area_id],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        conn.query("select * from areamaster",(err,r)=>
        {
            if(err)
            {
              console.log(err);
              reject(err);
            }
            else
            {
               resolve(r);
            }
        });
      }
    })
  })
};
exports.acceptReviewData=(...reviewData)=>{
  return new Promise((resolve,reject)=>{
    conn.query("insert into reviewmaster values('0',?,?,?)",[...reviewData],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};
exports.getAllReview=()=>{
  return new Promise((resolve,reject)=>{
    conn.query("select *from reviewmaster",(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    })
  })
};
exports.deleteReviews=(rev_id)=>{
return new Promise((resolve,reject)=>{
    conn.query("delete from reviewmaster where rev_id=?",[rev_id],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        conn.query("select * from reviewmaster",(err,r)=>
        {
            if(err)
            {
              console.log(err);
              reject(err);
            }
            else
            {
               resolve(r);
            }
        });
      }
    })
  })
};

exports.fetchareacity=(city_id)=>{
  return new Promise((resolve,reject)=>{
    conn.query("select am.area_id, am.area_name from areamaster am  join cityareajoin caj on am.area_id = caj.area_id where caj.city_id = ?",[city_id],
      (err,result)=>{
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      })
  })
};

exports.showcities=()=>{
  return new Promise((resolve,reject)=>{
    conn.query("select * from citymaster",(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });
    })
}
exports.getarea=()=>{
  return new Promise((resolve,reject)=>{
    conn.query("select * from areamaster",(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });
    })
};
exports.accepthotelformdata = (...allHotelData) => {

  console.log("Form data :"+allHotelData);
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO hotelmaster 
      (hotel_name, hotel_address, hotel_email, hotel_contact, rating, reviewcount, city_id, area_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    conn.query(sql, allHotelData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Hotel inserted:", result);
        resolve(result.insertId);//return new hotel_id
      }
    });
  });
};

exports.saveHotelImage=(filename,hotel_id)=>{
  return new Promise((resolve,reject)=>{
    conn.query("insert into hotelpicjoin (filename,hotel_id)values(?,?)",[filename,hotel_id],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        console.log("hotel image saved:",result);
        resolve(result);
      }
    })
  })
};

exports.getAllHotelsWithImage = () => {
  console.log("✅ getAllHotelsWithImage RUNNING..."); // Add this
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        h.hotel_id,
        h.hotel_name,
        h.hotel_address,
        h.hotel_email,
        h.hotel_contact,
        h.rating,
        h.reviewcount,
        c.city_name,
        a.area_name,
        i.filename
      FROM hotelmaster h
      LEFT JOIN citymaster c ON h.city_id = c.city_id
      LEFT JOIN areamaster a ON h.area_id = a.area_id
      LEFT JOIN hotelpicjoin i ON h.hotel_id = i.hotel_id
    `;
    conn.query(sql, (err, result) => {
      if (err) reject(err);
      else {
        console.log("✅ Query result sample:", result[0]); // print one row
        resolve(result);
      }
    });
  });
};
