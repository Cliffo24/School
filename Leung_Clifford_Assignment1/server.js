//Copied from info server ex5 
var express = require('express');// require express
var app = express();//require express
var myParser = require("body-parser");//require body parser
const queryString = require("query-string");

var products = require('./public/products_data.js'); //require data from products_data.js

//Route to handle any request; also calls next
app.all('*', function (request, response, next) {
    console.log (request.method + ' to path ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
//Rule to handle process_form request form purchasing page

function isNonNegativeInteger(inputString, returnErrors = false) {
    //Validate that an input value is a non-negative integer
    // inputString is input string; returnErrors indicates how the funciton returns: true means return
    errors = []; // assume no errors at first
    if(Number(inputString) != inputString) {
        errors.push('Not a number!'); // Check if string is a number value

    } 
   else{
    if(inputString < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(inputString) != inputString) errors.push('Not an integer!'); // Check that it is an integer
     } 
     return returnErrors ? errors : (errors.length == 0)
}
//processes the form
app.post("/process_form", function (request, response) {
    let POST = request.body; 
    console.log(POST)
   //validation

   //checks if quantities are defined in each textbox
    if (typeof POST['submit_purchase'] != 'undefined') {
        var negative = false;
        var Pos = false;
        for(let i = 0; i < POST.length; i++)
        {
    if(POST[i] < 0){
        negative = true;}
    else if(POST[i] >0){Pos=true;}
    } 
    const stringified = queryString.stringify(POST);

    if(!negative && !Pos){
        response.redirect("./invoice.html?"+stringified)
    }else{
        response.redirect("./products_display.html?" + stringified)
    }
        //var hasvalidquantities=true; //assuming there are valid quantites
      //  var hasquantities=true ; //asumming it has quantities

        //redirects if the it has valid quantities to invoice; else it stays on same page
        
      //  if (hasvalidquantities && hasquantities) {
        // response.redirect("./invoice.html?"+stringified); 
      //  }  
       // else { 
      //     response.redirect("./products_display.html?" + stringified) 
       // }
    }
});




app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
