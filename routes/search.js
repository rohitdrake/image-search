const express = require('express');
const router  = express.Router();

router.get('/:id', require('./middleware/log_middleware'), require('./middleware/search_middleware'),(req, res)=>{
  res.send(req.jsonArr);
});

module.exports=router;
