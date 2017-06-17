var express = require('express');
var moment = require('moment');

var router = express.Router();

router.get('/:timestampQuery', function(req, res) {
  var timestamp = req.params.timestampQuery;

  var timestampObj = { unix: null, natural: null };
  if(+timestamp >= 0)
  {
    console.log("Recieved UNIX Timestamp");
    timestampObj.natural = unixToNatural(timestamp);
    timestampObj.unix = timestamp;
  }
  else if(isNaN(+timestamp))
  {
    if(moment(timestamp, "MMMM D, YYYY").isValid())
    {
      console.log("Recieved Natural Language Timestamp");
      timestampObj.unix = naturalToUnix(timestamp);
      timestampObj.natural = timestamp;
    }
  }
  res.set('Content-Type', 'application/json');
  if(timestampObj.unix != null && timestampObj.natural != null)
  {
  	res.send(JSON.stringify(timestampObj));	
  }
  else
  {
  	res.send('Invalid Timestamp');		
  }
});

var unixToNatural = function(unixTimestamp) {
    return moment.unix(unixTimestamp).format("MMMM D, YYYY");
}

var naturalToUnix = function(naturalTimestamp) {
     return moment(naturalTimestamp, "MMMM D, YYYY").format("X");
}

module.exports = router