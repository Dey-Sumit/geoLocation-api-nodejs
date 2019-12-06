//set up express
const express = require('express');
const app = express();

//set up DataBase
const dataStore = require('nedb');
const dataBase = new dataStore('database.db');

//listen to port
app.listen(3000, () =>
  console.log('listening at 3000 '));
dataBase.loadDatabase();

//host static Content
//To serve static files such as images, CSS files, and JavaScript files,
//use the express.static built-in middleware function in Express.

app.use(express.static('public'))

app.use(express.json());

//setting up ROUTE
//this 'home' route will catch any post request to it
app.post('/home', (request, response) => {
  console.log("post request coming");
  //console.log(request.body);
  const data = request.body;
  //attach timeStamp to the data
  const timeStamp = Date();
  data.timeStamp = timeStamp;
  dataBase.insert(data);

  /*response.json({
    status: 'success',
    long: data.long,
    lat: data.lat,
    timeStamp: timeStamp
  })*/
  response.json(data);

})

//this 'home' route will catch any get request to it
app.get('/home', (request, response) => {
  console.log("get request on home");
  //send response
  dataBase.find({}, (error, data) => {
    if (error)
      console.log('error');
    response.json(data);
  });

});