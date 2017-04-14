const express = require('express');
const router  = express.Router();


router.get('/', require('./middleware/history_middleware'),(req, res)=>{
  res.send(req.historyArr);
});

module.exports=router;
