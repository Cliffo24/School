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
//require data from products_data.js /loading it
    var data = require('./public/products_data.json'); 
    var nodemailer = require(`nodemailer`)
    const cookieParser = require('cookie-parser');
//Code from bottom of product_data.js
    var products = data.products; 

//starts parser
    app.use(myParser.urlencoded({ extended: true }));
//global variable to recall back the function to display the array after running through validation because this wasn't running I made another global variable at the bottom
    var stringified ={}
//Route to handle any request; also calls next
app.all('*', function (request, response, next) {
    console.log (request.method + ' to path ' + request.path);
    next();
});
//global variable to recall the quantities from products.display page
var PermQuantities= {}

//gets product information and loads it later (Assignment 3 example)
app.post("/get_products_data", function(request, response){
    products_data = products
    response.json(products);
});
//gets user information and loads it later taken from (Assignment 3 example)
app.post("/user_data", function (request, response) { 
    response.json(user_data);
});

//processes the form takes the /POST from products_display.html
app.post("/process_form", function (request, response) {
    let POST = request.body;
    PermQuantities = POST
    const objarray= Object.values(POST)
    console.log(PermQuantities)
    console.log(products.length)
    
//validation
//checks if quantities are defined in each textbox
//start with result being false
    var result= false 
    for(i = 0; i < objarray.length; i++)
    {   
            
// Check if it is non-negative
    var initialquantites= objarray[i]
    var totalquantities= totalquantities+initialquantites
    if(totalquantities != "undefined")
    {


//To Check if it is a posive number
    if(0>objarray[i])
    {
    return response.send(`<script>
        alert("Please enter a positive number"); 
        window.history.back();
                
         </script>`);
    }
//To check if it is a whole number 
    if(parseInt(Number(objarray[i])) != (objarray[i])){        
        return response.send(`<script>
        alert("Please enter a whole number"); 
        window.history.back();
        </script>`);
    }
//To Check if it is a valid number
    if(Number(objarray[i])!=objarray[i])
    {
    return response.send(`<script>
        alert("Please enter a valid number"); 
        window.history.back();
                    
        </script>`);
    }
   
//if it ends true meaning if all the validation is right 
    else
        {
        result=true
        }
//if the purchase quantity amount exceeds the amount available it would send error
    if(Number(objarray[i]) > products[i].quantity_available){
        return response.send(`<script>
        alert("Available Quantity Exceeded! please choose an amount within available quantity"); 
        window.history.back();
                    
        </script>`);
    }
    }
        }    
    stringified = queryString.stringify(POST);
 
//if the results =true it would redirect to login but if it fails validation it pops up error and redirects to display page
    if(result==true){
        response.redirect("./login?"+ stringified)
    }
    else{
        alert("Enter valid quantity")
        response.redirect("./products_display.html?" + stringified)
        
    }
});


//to read user files, taken from lab 14 and modified, load user.json
if (fs.existsSync(user_data_filename)) 
    {
    data = fs.readFileSync(user_data_filename, 'utf-8');
//parse the json file to convert into object/array
    user_data = JSON.parse(data);
    console.log("User_data=", user_data);
//to log the size of the json file, the amount of characters in the file
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
//redirected from login page and POST the username and login to verify in the next steps
app.post("/loginform", function (request, response){
    console.log(PermQuantities)
    console.log("got a post")
    POST = request.body;
    user_name = POST["username"];
    user_pass = POST["password"];
    console.log(POST)
     
   

//to verify a existing user and login taken from FILE/IO lab and modified
if(typeof user_data[user_name] != 'undefined'){
    if((user_data[user_name].password == user_pass)== true){
        console.log(user_name + " Logged in");
//if it is verified positively it would redirect to invoice
    var invoiceview = fs.readFileSync('./public/invoice.view', 'utf-8');
//load the template
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
console.log(PermQuantities)
});
//reads and writes the register.view /register page
app.get("/register", function (request, response) {
    console.log(PermQuantities)
    var registerview = fs.readFileSync('./public/register.view', 'utf-8');
    response.send(eval('`' + registerview + '`'));
});
//taken from File/IO Lab and modified for registration
app.post("/registernew", function (request, response){
    console.log("got a new register")
    POST = request.body;
//getting the user info from the /register page and putting it into variables for validation. put username and email to lower case to prevent identical copies from forming
    var user_name = POST["username"].toLowerCase();
    var new_user_password = POST["password"];
    var new_user_password_rpt = POST["passwordrpt"];
    var new_user_email = POST["email"].toLowerCase();
    var new_user_fullname = POST["fullname"];
    console.log(POST)
    

 console.log(new_user_fullname)
    
//register validation 
if(typeof user_data[user_name] != 'undefined')
{
    response.send(`<script>
        alert("Username: ${user_name} exists please enter another username"); 
        window.history.back();
        
        </script>`);
    console.log("Username Exist")
    }else{ 
        var UsernameExist = true
    }  
//uses function below to validate username for register page
if(!validateUsername(user_name)){
    response.send(`<script>
    alert("Username: ${user_name} Needs to be no less than 5 characters and must exceed 15 characters"); 
    window.history.back();
    
    </script>`);
    }else{
        var validusername= true
}
//uses function below to validate fullname for regeister page
if(!validatefullname(new_user_fullname)){
    response.send(`<script>
    alert("Fullname: ${new_user_fullname} Must between 0 and 30 characters following the prompt Last Name, First Name"); 
    window.history.back();
    
    </script>`);
    }else{
        var validfullname = true
}
//uses function below to validate email for register page
if(!validateEmail(new_user_email)){
    response.send(`<script>
    alert("Email: ${new_user_email} Must follow the example jimmie@gmail.com or jimmie@hotmail.al"); 
    window.history.back();
    
    </script>`);
    }else{
        var validemail=true
}
//validates if first password matches with the confirmation password in register page
if(new_user_password != new_user_password_rpt){
    response.send(`<script>
    alert("Passwords do not match please make sure and re-confirm that passwords match"); 
    window.history.back();
    </script>`);
    }else{
        var passwordmatch= true
}
console.log("REGISTRATION COMPLETE")
//if it all checks to be true it will write the new user data into user_data.json taken from File/IO Lab and modified 
if(UsernameExist && validusername && validfullname && validemail &&passwordmatch){
    
    user_data[user_name] ={}
    user_data[user_name].fullname = POST["fullname"]
    user_data[user_name].email = POST["email"]
    user_data[user_name].password = POST["password"]
    user_data[user_name].passwordrpt = POST["passwordrpt"]



    data = JSON.stringify(user_data);
//load the user_data.json file to prepare to write the register data after validation
    fs.writeFileSync(user_data_filename, data, "utf-8");
//after it redirects to invoice to show the invoice after registration
    var invoiceview = fs.readFileSync('./public/invoice.view', 'utf-8');
    response.send(eval('`' + invoiceview + '`'));
        }else{
            response.redirect("/register")
    }

});


//Validation functions taken from the Internet in order to validate username characters, full name characters, valid email.
function validateUsername(user) {
    const re = /^[a-zA-Z0-9]{5,15}$/;
    return re.test(String(user).toLowerCase());
}

function validatefullname(fullname){
    const re = /^[ +a-zA-Z,]{0,30}$/
    return re.test(String(fullname));
}

function validateEmail(email) {//used =@ and +\. to seperate sections of email
    const re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-z]{2,3}$/;
    return re.test(String(email).toLowerCase());
}

//Taken from Assignment 1 example. and modified, will be used to for invoice.view to take all the values gathered from products.html and print out the values into the invoice
function display_invoice_table_rows() {

    subtotal = 0;
    str = '';
    console.log(PermQuantities['quantity1'])
    for (i = 0; i < products.length; i++) {
        a_qty = 0;
        if (typeof PermQuantities[`quantity${i}`] != undefined) {
            a_qty = PermQuantities[`quantity${i}`];
        }
        if (a_qty > 0) {
            // product row
            extended_price = a_qty * products[i].price
            subtotal += extended_price;
            str += (`
      <tr>
      <td style="text-align: left;" width="40%">${products[i].model}</td>
      <td width="20%">${PermQuantities[`quantity${i}`]}</td>
      <td width="20%">\$${products[i].price}</td>
      <td width="20%">\$${extended_price}</td>
      </tr>
      `);
      
        }
    }

//Taken from Invoice Lab and modified
// Compute tax
    tax_rate = 0.0471;
    tax = tax_rate * subtotal;

// Compute shipping
if (subtotal <= 1000) {
        shipping = 50;
    }
    else if (subtotal <= 2000) {
        shipping = 100;
    }
    else {
        shipping = 0.10 * subtotal;
    }

// Compute grand total
    total = subtotal + tax + shipping;

    return str;

}



app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
