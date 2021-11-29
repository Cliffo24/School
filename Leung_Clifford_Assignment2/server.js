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

 
//processes the form
app.post("/process_form", function (request, response) {
    let POST = request.body;
    const objarray= Object.values(POST)
         console.log(POST) 
  
   //validation
    
    //checks if quantities are defined in each textbox
    //start with result being false
   var result= false 
    for(i = 0; i < objarray.length; i++){   
            
        // Check if it is non-negative
        var initialquantites= objarray[i]
        var totalquantities= totalquantities+initialquantites
                 console.log((parseInt(objarray[i])!=parseFloat(objarray[i])))
            if(totalquantities != "undefined"){
            //To check if it is a whole number but code did not work so I did not include
            //if(parseInt(objarray[i])!=parseFloat(objarray[i])){
                
            // return response.send(`<script>
                //  alert("Please enter a whole number"); 
                // window.history.back();
                //  </script>`);
           // }
           //To Check if it is a posive number
            if(0>objarray[i]){
                return response.send(`<script>
                alert("Please enter a positive number"); 
                window.history.back();
                
                </script>`);
            }//To Check if it is a valid number
            if(Number(objarray[i])!=objarray[i]){
                return response.send(`<script>
                alert("Please enter a valid number"); 
                window.history.back();
                    
                    </script>`);
            }
            //if it ends true meaning if all the validation is right it goes redirects to invoice which calculates the invoice
            else{
                result=true
            }
        }
    }    
    const stringified = queryString.stringify(POST);
//if the results =true it would redirect to invoice but if it fails validation it pops up error and redirects to display page
    if(result==true){
        response.redirect("./invoice.html?"+stringified)
    }else{
        response.redirect("./products_display.html?" + stringified)
    }
});




app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
