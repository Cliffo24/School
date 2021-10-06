require("./products_data.js");

var num_products = 5;

var count = 0;
while (count < num_products){
   count++;
    if (count > num_products / 2 && count < (num_products *0.75)) {
       console.log(`${eval('name'+ count)} is sold out.`);
    }
    else if (count > num_products/ 2){
        console.log ("That's all we have!")
        Process.exit ()
    }
    else { 
    console.log(`${count}. ${eval('name' + count)}`);
    }
}



var num_products = 5;
for (var count = 1; eval("typeof name"+count) != 'undefined'; count++) {
    if (count > num_products/2) {
        console.log("That's enough!");
        process.exit();
    }
    console.log(`${count}. ${eval('name' + count)}`);
}
