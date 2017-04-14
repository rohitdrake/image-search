const express=require('express');
const MongoClient=require('mongodb').MongoClient;

let app=express();
app.set('port', (process.env.port||3000));
app.listen(app.get('port'), ()=>{
  console.log('server is listening at '+app.get('port'));
});

MongoClient.connect(process.env.MONGOLAB_URI, (err, db)=>{
  app.use((req, res, next)=>{
    req.db=db;
    console.log("request at app.use recieved!");
    next();
  });

  app.use('/search', require('./routes/search'));
  app.use('/latest', require('./routes/history'));
});
