const express= require("express");
const app= express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
const dotenv = require("dotenv");
const result = dotenv.config()
    
app.use(express.static(__dirname + '/'));
app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/index.html")
});


app.post("/",function(req,res)
{
    const query=req.body.cityName; 
    const apiKey= result.parsed.API_KEY;
    
    console.log(query);
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;// + "&units=" + unit;
    console.log(url);
    https.get(url, function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData = JSON.parse(data)
           console.log(weatherData);
            const temp = weatherData.main.temp;
            
            const description = weatherData.weather[0].description;
            
            const icon = weatherData.weather[0].icon;
            
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p> The weather is currently " + description + "<p>");
            res.write("<h1> The temperature in " + query + " is " + temp + " degrees celcius " );
            res.write("<img src=" + imageURL + ">");
            res.send();

        });
    });
    
})


app.listen(3000, function()
{
    console.log("Server started on port 3000.")
})
