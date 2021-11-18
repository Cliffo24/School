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
    errors = []

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
        result=false;
    }

    return result;
}

 
//processes the form
app.post("/process_form", function (request, response) {
    let POST = request.body;
    const objarray= Object.values(POST)
   var result =true
  
   //validation
    
   //checks if quantities are defined in each textbox
    if (typeof request.query['purchase_submit'] != 'undefined')
        for(i = 0; i < objarray.length; i++){   
            
    // Check if it is non-negative
    var initialquantites= objarray[i]
    var totalquantities= totalquantities+initialquantites
    console.log(objarray)
    if(totalquantities != "undefined"){

    errors = []

        // handle blank inputs as if they are 0
        
            if (objarray[i] == '') 
            objarray[i] = 0;

        // Check if string is a number value
            if (!Number(objarray[i])){
                errors.push('<font color="red">Not a number!</font>'); 
                result =false;
}

        // Check if it is non-negative
            if (objarray < 0){
                errors.push('<font color="red">Negative value!</font>'); 
                result =false;
}

        // Check that it is an integer
            if (!Number.isInteger(i)){
                errors.push('<font color="red">Not an integer!</font>'); 
                 result=false;
}

            return result;
}
 
}

    if(result){
        const stringified = queryString.stringify(POST);
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
