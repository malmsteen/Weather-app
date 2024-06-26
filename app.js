const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var city = req.body.cityName;
  const apiKey = "e1bcce55f10a84608e8109ab4bb2ba44#";
  const units = "metric"
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + apiKey;
  
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;      
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" +  icon + "@2x.png";

      // res.write("<input type=text name=" + city + " placeholder=City Name>");
      res.write("<p>The weather in " + city + " is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius.</h1>");
      res.write("<img src =" + imageURL + ">");
      
      res.send();
    });
  });  
});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});