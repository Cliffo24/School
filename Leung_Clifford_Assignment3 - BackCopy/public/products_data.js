var products = [
    { //3080 Nvida Graphics card
    "model":"Nvdia RTX 3080",  
    "price": 820.00,  
    "image": "3080.jpg",
    "quantity_available": 100
    },
    {  //3070 Nvida Graphics card
    "model":"Nvdia RTX 3070",  
    "price": 700.00,  
    "image": "3070.jpg",
    "quantity_available": 100
    },
    {  //3060 Nvida Graphics card
     "model":"Nvdia RTX 3060",  
    "price": 650.00,  
     "image": "3060.jpg",
     "quantity_available": 100
     },
     {  //3080 TI Nvida Graphics card
     "model":"Nvdia RTX 3080 TI",  
    "price": 1800.00,  
     "image": "3080ti.jpg",
     "quantity_available": 100
      },
     {  //3070 TI Nvida Graphics card
    "model":"Nvdia RTX 3070 TI",  
    "price": 1500.00,  
    "image": "3070ti.jpg",
    "quantity_available": 100
     },
    {  //3060 TI Nvida Graphics card
     "model":"Nvdia RTX 3060 TI",  
    "price": 1200.00,  
     "image": "3060ti.jpg",
    "quantity_available": 100
     }
  ];
  if(typeof module != 'undefined') {
    module.exports.products = products;
  }