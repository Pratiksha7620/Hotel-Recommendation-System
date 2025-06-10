let mysql=require("mysql2");
require("dotenv").config();
//console.log(process.env.DB_PASSWORD);
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});
db.connect((err)=>{
    if(err)throw err;
    else{
        console.log("Database is connected")
    }
});
module.exports=db;