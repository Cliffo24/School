//Check if Robot is stuck
if (robot.IsFacingWall){
    robot.turnLeft
}
else{
    robot.moveFwd
}

//Eliminate infinite moves 
num_turns_to_360 = 4; // four turns to 360 

robot.turnRight();

turns = 0; 

while( robot.isFacingWall() && 
	turns++ < num_turns_to_360) {
		robot.turnLeft();
}

