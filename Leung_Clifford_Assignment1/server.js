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


function isValidNumber(q) {
    //assume no errors
    var result = true;

    // handle blank inputs as if they are 0
    if (q == '') 
        q = 0;

    // Check if string is a number value
    if (!Number(q)){
        errors.push('<font color="red">Not a number!</font>'); 
        result =false;
    }

    // Check if it is non-negative
    if (q < 0){
        errors.push('<font color="red">Negative value!</font>'); 
        result =false;
    }

    // Check that it is an integer
    if (!Number.isInteger(q)){
        errors.push('<font color="red">Not an integer!</font>'); 
        return_errors=false;
    }

    //Check available quantity
    if (q > products[i].quantity_available){ 
        errors.push('<font color="red">Over quantity available!</font>'); 
        return_errors=false;
    }

    return return_errors;
}

 
//processes the form
app.post("/process_form", function (request, response) {
    let POST = request.body; 
    console.log(POST)
   //validation

   //checks if quantities are defined in each textbox
    if (typeof POST['submit_purchase'] != 'undefined') {
        var invalid = false;
        for(let i = 0; i < POST.length; i++)
        {
            if(!isValidNumber(POST[i])){
                invalid = true;
            }
        }
    } 
    const stringified = queryString.stringify(POST);

    if(!invalid){
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
});




app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
