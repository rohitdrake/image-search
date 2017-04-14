module.exports=(req, res, next)=>{
  req.historyArr=[];
  req.db.collection('histories')
  .find().toArray()
  .then((arr)=>{
    let len=arr.length
    if(len<10) {
      req.historyArr=arr;
      next();
      return;
    }else{
      let i;
      for(i=(len-10);i<len;i++){
        req.historyArr.push(arr[i]);
      }
      next();
    }
  }).catch((e)=>{
    res.status(404).send("Error!");
  });
}
