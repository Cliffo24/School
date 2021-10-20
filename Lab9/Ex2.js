//Check if controller is stuck
if (robot.IsFacingWall){
    controller.turnLeft
}
else{
    controller.move()
}

//Eliminate infinite moves 
num_turns_to_360 = 4; // four turns to 360 

controller.turnRight();

turns = 0; 

while( controller.isFacingWall() && 
	turns++ < num_turns_to_360) {
		controller.turnLeft();
}

