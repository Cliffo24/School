//Copied from info server ex5 
var express = require('express');// require express
var app = express();//require express
var myParser = require("body-parser");//require body parser
var data = require ('./public/products_data.js'); //load product_data.js
var products = data.products; //Code from bottom of 


var products = require('./products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get("/products_data.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
 });


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
//Route to handle any request; also calls next
app.all('*', function (request, response, next) {
    console.log (request.method + ' to path ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
//Rule to handle process_form request form purchasing page
app.post("/process_form", function (request, response) {
   let POST = request.body;
   let brand = products[0]['model'];
    let brand_price = products[0]['price'];
   
   if(typeof POST ['quantity_textbox'] != 'undefined')
   {
       let quantity = POST ['quantity_textbox'];
       if(isNonNegativeInteger(quantity)){
           products[0]['total_sold'] += Number(quantity);
           response.redirect('receipt.html?quantity=' + quantity);  
       }else{
           response.redirect('order_page.html?error=Invalid%20Quantity&quantity_textbox=' + quantity)
       }
   }
});
app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
