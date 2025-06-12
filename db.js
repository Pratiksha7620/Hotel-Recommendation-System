let mysql=require("mysql2");
require("dotenv").config();
//console.log(process.env.DB_PASSWORD);
const conn=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:'hotelrecommendationproject',
     waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});
//conn.connect((err)=>{
//     if(err)throw err;
//     else{
//         console.log("Database is connected")
//     }
// });

conn.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('❌ Database connection failed:', err.message);
    } else {
      console.log('✅ Database connected successfully.');
    }
  });

module.exports=conn;