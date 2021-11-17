//Copied from info server ex5 
var express = require('express');// require express
var app = express();//require express
var myParser = require("body-parser");//require body parser
var data = require('products.json'); //load products.json
var products = data.products; //assign products with data
var http = require('http');


var products = require('./products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get("./products.json", function (request, response, next) {
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
//Rule to handle process_form request form products_display
app.post("/purchase", function (request, response, next) {
    let POST = request.body;
    if(typeof POST['purchase_submit'] == 'undefined') {
        console.log('No purchase form data');
        next();
    } 

    function display_invoice_table_rows() {
        subtotal = 0;
        str = '';
        for (i = 0; i < products.length; i++) {
            a_qty = 0;
            if(typeof POST[`quantity${i}`] != 'undefined') {
                a_qty = POST[`quantity${i}`];
            }
            if (a_qty > 0) {
                // product row
                extended_price =a_qty * products[i].price
                subtotal += extended_price;
                str += (`
      <tr>
        <td width="43%">${products[i].model}</td>
        <td align="center" width="11%">${a_qty}</td>
        <td width="13%">\$${products[i].price}</td>
        <td width="54%">\$${extended_price}</td>
      </tr>
      `);
            }
        }
        // Compute tax
        tax_rate = 0.0575;
        tax = tax_rate * subtotal;

        // Compute shipping
        if (subtotal <= 50) {
            shipping = 2;
        }
        else if (subtotal <= 100) {
            shipping = 5;
        }
        else {
            shipping = 0.05 * subtotal; // 5% of subtotal
        }

        // Compute grand total
        total = subtotal + tax + shipping;

        return str;
    }

});
app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here
