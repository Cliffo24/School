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

function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if (q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    else if (q > products[i].quantity_available - products[i]["total_sold"]) errors.push('<font color="red">Over quantity available!</font>'); //Check available quantity
    return return_errors ? errors : (errors.length == 0);
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
