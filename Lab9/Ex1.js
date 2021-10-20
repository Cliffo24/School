step1 = 01;
step2 = parseInt(step1/4);
step3 = step2 + step1;
step4 = 3; // Not Jan, so look at month before on table
step6 = step4 + step3;
step7 = step6 + 4;
step8 = (step7-1);
if (step8 <= 7){
   console.log(step8/7)  
}
else{
    console.log(step8)
}

//02/04/2001