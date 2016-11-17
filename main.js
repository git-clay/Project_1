window.onload=function(){
	/*var retrievedObject = localStorage.getItem('testObject');		////example of how to retrieve sessionstorage
console.log('retrievedObject: ', JSON.parse(retrievedObject));*/	///look at bottom

var inputInfo = window.location.search; //drops info from previous inputs (?Player+1=c&Player+2=s)
var user1name = inputInfo.slice(10,inputInfo.indexOf('&')); //slices ^ to get player1name
var user2name = inputInfo.slice(inputInfo.indexOf('&')+10); //slices to get player 2 name

var obMax;
var obMin;

var domSelector =function(element){		//function to search for id,class,or tag (element)
	var found;
	if(element[0]==='#'){
		found = document.getElementById(element.slice(1,element.length));
	} else if(element[0]==='.'){
		found = document.getElementsByClassName(element.slice(1,element.length));
	} else{
		found = document.getElementsByTagName(element);
	}
	return found;
};
var board=domSelector(".htmlBoard");
board= board[0];


/*____________________________Player Objects_____________________________________*/
function Player(id,name,x,y,score){
this.tag=document.createElement('div');
this.class= "player";
this.tag.id = id;
this.name = name;
this.x=x;
this.y=y;
this.w=this.x+100;
this.h=this.y+100;
this.score=score;

////////// make 'occupied-zone based on x,y,w,h'

}
var player1 = new Player('p1',user1name,0,0,0);
var player2 = new Player('p2',user2name,10,400,0);
/*playerX+50<=Frame && playerX-50>=Frame && playerY+50<=Frame && playerY-50>=Frame  if these are true then frame is inside player*/

/*____________________________Structure Objects_____________________________________*/
function Frame(cl,x,y,w,h){
this.tag = document.createElement('div');
this.tag.setAttribute('class',cl);
this.x = x;
this.y = y;
this.tag.setAttribute('style','left:'+x+'px'+';top:'+y+'px'+';width:'+w+'px'+';height:'+h+'px');
this.h = h;
this.w = w;
}

////////// make 'dead-zone based on x,y,w,h'

var floor = new Frame('floor',0,525,888,75);
var plat1 = new Frame('platform',0,101,200,50);
var plat2 = new Frame('platform',350,101,200,50);

var objects = [floor,plat1,plat2];

console.log(objects);

/*_______________________collision_________________________________*/

function collision(player){
	for(var i=0;i<objects.length;i++){
		//var currentOb = objects[i].x;
	//	console.log(objects[i]);
	//	console.log('ob.x'+objects[i].x);
	//	console.log('ob.y'+objects[i].x);
var check = player.x+player.w>objects[i].x && player.x<objects[i].x+objects[i].w && player.y+player.h>objects[i].y && player.y<objects[i].y+objects[i].h;
		if(check){
	console.log('collision!!!!!!!');
		return true;

		}
		
	/*
	(player.x + player.w > object.x && player.x < object.x + object.width()) &&
    (player.y + player.h > object.y && player.y < object.y + object.height())
	*/
	}
//	console.log('func collision ran');
}

/*____________________________Board ____________________________________________*/
//create floor 
//create platforms
//√√√call and place *current player* (if turn===...)
function onBoard(player, frame){
//console.log(player.tag.id);
board.append(player.tag);
board.append(floor.tag);
board.append(plat1.tag);
board.append(plat2.tag);

//console.log(this.frame);
//////border@ x=-390>390  y=0>500
}
/*____________________________Turn_______________________________________________*/
//this is where the events during the turn will go (player onboard,setTimer,score>player,turnEnd)
var currentTurn=0; // even=player1 , odd=player 2
// maybe needs a button to start? or on window load
if(currentTurn%2===0){ //is even
//player 1 functions
onBoard(player1);		//initial to begin
						//setTimer onBoard
						//score onBoard
}else if(currentTurn%2===1){
//player 2 functions
onBoard(player2);
}

/*____________________________Player Movement_____________________________________*/

/////////////// make attribute for objects to store deadzones???


Player.prototype.moveX=function(player,currentKey){
	var currentId= document.getElementById(player.tag.id);
//	console.log(player.tag.id+' '+'moved');
//	console.log('x'+player.x);
if(currentKey===37){			//checkes keypress for left arrow (currentKey in moveX()) left=++
	player.x = player.x -=20;
//console.log(player.x);
		if(player.x<0){  //checks x position of player to determin if out of bounds
		console.log('out of bounds'+player.x);
		player.x = 0;
		}
		else if(collision(player)===true){
			player.x = player.x+20;
	//		console.log(player.x);
		}
		else{
		currentId.setAttribute('style','left:'+player.x+'px'+';top:'+player.y+'px');
		//player.x = player.x -=20;

		}
}else if(currentKey===39){		//checks for right arrow press left = --
	player.x = player.x +=20;
		if(player.x>800){
		console.log('out of bounds'+player.x);
		player.x = player.x =800;
		} else if(collision(player)===true){
		player.x = player.x-20;
		}else{
		currentId.setAttribute('style','left:'+player.x+'px'+';top:'+player.y+'px');
			
		}

}

//√√√√if statements to determine direction pressed then apply setAttribute to change player's style(left/top)
//console.log('px'+player.x);
//			console.log('py'+player.y);
};
Player.prototype.moveY=function(player,currentKey){
	var currentId= document.getElementById(player.tag.id);

	if(currentKey===38){			//checkes keypress for up arrow (currentKey in moveX()) top=++
	player.y = player.y -=20;
		if(player.y<0){
		console.log('out of bounds'+player.y);
		player.y=0;
		}else if(collision(player)===true){
		player.y = player.y+20;
		}else{
		currentId.setAttribute('style','top:'+player.y+'px'+';left:'+player.x+'px');
		}
	}else if(currentKey===40){		//checks for down arrow press top = --
	player.y = player.y +=20;
		if(player.y>500){
		console.log('out of bounds'+player.y);
		player.y=500;
		}else if(collision(player)===true){
		player.y = player.y-20;
		}else{
		currentId.setAttribute('style','top:'+player.y+'px'+';left:'+player.x+'px');
		}
	}

//	console.log('px'+player.x);
//			console.log('py'+player.y);

};

//console.log(player1.moveX(player1));
//console.log(player1.moveY(player1));

/*document.addEventListener('keydown',function(event){			///finds the keycode of each key pressed
	console.log(event.which);
});*/
//"< arrow" = 37
//"> arrow" = 39
//"^" arrow = 38
//"v" arrow = 40
function keyStuff(player) {
	document.addEventListener('keydown',function(event){	//looks for a keypress>>passes # for corrasponding keyCode
	var currentKey = event.keyCode;
	switch(event.keyCode){
		case 37: 	//<
			//console.log(currentKey);
			//call move function for left here & store into player
			player.moveX(player,currentKey);		//calls move() which appends style
				event.preventDefault();	//prevents arrow from scrolling page
			//	console.log('<'+player.tag.id);	
		break;

		case 39: 	//>
		//call move function for right here & store into player
		//player.moveX(player);
				player.moveX(player,currentKey);
				event.preventDefault();	//prevents arrow from scrolling page
				//console.log('>');	
		break;

		case 38: 	//^
		//call move function for up here & store into player
		//player.moveY(player);
				event.preventDefault();	//prevents arrow from scrolling page
				player.moveY(player,currentKey);
				//console.log('^');
		break;

		case 40: 	//v
		//call move function for down here & store into player
		//player.moveY(player);
				event.preventDefault();		//prevents arrow from scrolling page
				player.moveY(player,currentKey);
				//console.log('v');
		break;
	}
});	
}
keyStuff(player1);
/*--if you need a location check (objectives met) they go here
	in the form of 'if' statements*/


/*____________________________Objective Objects___________________________*/
//create objective object (player obtains these or passes by them)
//figure out how to make unique objective items based on current player

/*____________________________Score_______________________________________*/
//display (complete/total) objectives
//maybe: OOOOO(start) >>> XOOOO(after one objective) like hearts in zelda

/*____________________________Timer_______________________________________*/
//√√countdown timer
//maybe: in a loading bar format
//√√00:00 >> end of turn
//pop-up window to display score and other info about turn
//***** store player info with sessionStorage *******
/*function reset(){		//refreshes page
	location.reload();
}*/
/*
var count=5; //count to 60seconds
var countInterval = setInterval(timer,1000);	//1000ms===1s

function timer(){
	count -=1;
	if(count<0){
		clearInterval(countInterval);
		return;
	}
	domSelector('#timer').innerHTML=count+" seconds";
	if(count===0){
		console.log('0000');	
		sessionStorage.setITEM('player1', JSON.stringify(player1))						//save player info to sessionStorage
								//display results
								//turn++
	}
}
*/

/*___________________________________________________________________________*/

};