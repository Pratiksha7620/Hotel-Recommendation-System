let db=require("../../db");
exports.acceptData=(...regData)=>{
  db.query("insert into usermaster values('0',?,?,?,?,?)",[...regData]);
   return true;
}