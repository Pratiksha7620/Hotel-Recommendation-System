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

