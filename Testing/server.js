//Copied from info server ex5 and part of lab 14
var fs = require('fs');
// require express
    var express = require('express');
//require express
    var app = express();
//require body parser
    var myParser = require("body-parser");
//require json file for user information
    var user_data_filename = "./user_data.json"; 
//require querystring
    var queryString = require("query-string") 
    const { stringify } = require('query-string');
//require data from products_data.js
    var products = require('./public/products_data.js'); 
    const {response} = require ('express')

//starts parser
    app.use(myParser.urlencoded({ extended: true }));


//Route to handle any request; also calls next
app.all('*', function (request, response, next) {
    console.log (request.method + ' to path ' + request.path);
    next();
});


//Keep values from POST
    var PermQuantities = {};

//processes the form
app.post("/process_form", function (request, response) {
    let POST = request.body;
    const objarray= Object.values(POST)
         console.log(POST)
//Use to recall this function in invoice      
    PermQuantities=POST 
//validation
    
//checks if quantities are defined in each textbox
//start with result being false
    var result= false 
    for(i = 0; i < objarray.length; i++)
    {   
            
// Check if it is non-negative
    var initialquantites= objarray[i]
    var totalquantities= totalquantities+initialquantites
        console.log((parseInt(objarray[i])!=parseFloat(objarray[i])))
    if(totalquantities != "undefined")
    {

// }
    //To Check if it is a posive number
    if(0>objarray[i])
    {
    return response.send(`<script>
        alert("Please enter a positive number"); 
        window.history.back();
                
         </script>`);
    }
     //To check if it is a whole number but code did not work so I did not include
    // if(parseInt(objarray[i]) != (objarray[i])){        
       // return response.send(`<script>
         //  alert("Please enter a whole number"); 
          // window.history.back();
        // </script>`);
   // }
    //To Check if it is a valid number
    if(Number(objarray[i])!=objarray[i])
    {
    return response.send(`<script>
        alert("Please enter a valid number"); 
        window.history.back();
                    
        </script>`);
    }
   
    //if it ends true meaning if all the validation is right it goes redirects to invoice which calculates the invoice
    else
        {
        result=true
        }
    }
        }    
    const stringified = queryString.stringify(POST);
//if the results =true it would redirect to invoice but if it fails validation it pops up error and redirects to display page
    if(result==true){
        response.redirect("./login?"+stringified)
    }
    else{
        alert("Enter valid quantity")
        response.redirect("./products_display.html?" + stringified)
    }
});



//to read user files, taken from lab 14 and modified
if (fs.existsSync(user_data_filename)) 
    {
    data = fs.readFileSync(user_data_filename, 'utf-8');
//parse the json file to convert into object/array
    user_data = JSON.parse(data);
    console.log("User_data=", user_data);
//to look at the size of the json file
    fileStats = fs.statSync(user_data_filename);
    console.log("File " + user_data_filename + " has " + fileStats.size + " characters");
    }    
//if the json file doesnt exist 
else{
    console.log(user_data_filename + "Wrong filename. Enter the right filename!");
    }



//Get request from login.view
app.get("/login", function (request, response){
    var loginview = fs.readFileSync("./public/login.view",'utf-8');
//loading the template
    response.send(eval('`' + loginview + '`'));
});
//taken form File I/O Lab and modified
app.post("/loginform", function (request, response){
    console.log("got a post")
    POST = request.body;
    user_name = POST["username"];
    user_pass = POST["password"];

    console.log(POST);
    entered_username = request.body.username.toLowerCase();
if(typeof user_data[user_name] != 'undefined'){
    if((user_data[user_name].password == user_pass)== true){
        console.log(user_name + "Logged in");
        full_name = user_data[user_name].name;
        var invoiceview = fs.readFileSync('./public/invoice.view', 'utf-8');
         response.send(eval('`' + invoiceview + '`'));
    
}   else{ 
    response.send(`<script>
        alert("Password entered is wrong"); 
        window.history.back();
        
        </script>`);
    }
}
        else{
            response.send(`<script>
                alert("Username entered is wrong"); 
                window.history.back();
                
         </script>`);
        }

});

app.post("/register", function (request, response){
    var new_user_name = request.body.username;
    var new_user_password = request.body.password;
    var new_user_email = request.body.email.toLowerCase();
    var new_user_fullname = request.body.name;
});





app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
