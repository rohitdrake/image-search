



module.exports=function(req, res, next){
  if(!req.query.offset) req.query.offset=0;
  const https = require('https');
  req.params.id=req.params.id.replace(/\s+/g,"\\s");
  console.log(req.params.id);
  let str = "";
  let callback = function(response){
    response.setEncoding('utf-8');
    response.on('data', (chunk)=>{
      str+=chunk;
    });
    response.on('end', ()=>{
      try {
        let jsonArr=[];
        JSON.parse(str).value.forEach((element)=>{
          let{name, thumbnailUrl, contentUrl, hostPageUrl, encodingFormat}=element;
          let jsonObj={name, thumbnailUrl, contentUrl, hostPageUrl, encodingFormat};
          jsonArr.push(jsonObj);
        });
        req.jsonArr=jsonArr;
      }catch(e){
        res.status(400).send(e.message);
        return;
      }
      next();
    });
  };

  let options = {
    host: 'api.cognitive.microsoft.com',
    path: `/bing/v5.0/images/search?q=${req.params.id}&10&offset=${req.query.offset}`,
    headers:{
      'Content-Type': 'Aplication/JSON',
      'Ocp-Apim-Subscription-Key': '984754b7a49141208b5d9f0fc44bad07'
    },
    method: 'GET'
  };

  https.request(options, callback).on('error', (e)=>{
    console.log(e.message);
  }).end();
};
