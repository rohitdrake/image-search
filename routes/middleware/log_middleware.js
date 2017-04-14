module.exports = (req, res, next)=>{
  let log={};
  log.time=(new Date()).toUTCString();
  log.search=req.params.id;
  console.log(log);
  req.db.collection('histories')
  .insertOne(log)
  .then((doc)=>{
    console.log("History logged");
    next();
    return;
  })
  .catch((e)=>{
    res.satus(400).send('unable to log history');
    return;
  });
}
