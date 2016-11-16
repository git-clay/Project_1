window.onload=function(){

var inputInfo = window.location.search; //drops info from previous inputs (?Player+1=c&Player+2=s)
var user1name = inputInfo.slice(10,inputInfo.indexOf('&')); //slices ^ to get player1name
var user2name = inputInfo.slice(inputInfo.indexOf('&')+10); //slices to get player 2 name

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
this.score=score;
//console.log(board[0]);
//board[0].append(char);

}
var player1 = new Player('p1',user1name,0,0,0);
var player2 = new Player('p2',user2name,10,400,0);

/*____________________________Board ____________________________________________*/
//create floor 
//create platforms
//call and place *current player* (if turn===...)
function onBoard(player){
//console.log(player.tag.id);
board.append(player.tag);
console.log(board);

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
Player.prototype.moveX=function(player,currentKey){
	var currentId= document.getElementById(player.tag.id);
//	console.log(player.tag.id+' '+'moved');
//	console.log(currentKey);
if(currentKey===37){			//checkes keypress for left arrow (currentKey in moveX()) left=++
	player.x = player.x -=20;
	currentId.setAttribute('style','left:'+player.x+'px'+';top:'+player.y+'px');
		console.log(currentId);

}else if(currentKey===39){		//checks for right arrow press left = --
	player.x = player.x +=20;
	currentId.setAttribute('style','left:'+player.x+'px'+';top:'+player.y+'px');
		console.log(currentId);
}


//if statements to determine direction pressed then apply setAttribute to change player's style(left/top)

};
Player.prototype.moveY=function(player,currentKey){
	var currentId= document.getElementById(player.tag.id);
	console.log(player.tag.id+' '+'movedY');

if(currentKey===38){			//checkes keypress for up arrow (currentKey in moveX()) top=++
	player.y = player.y -=20;
	currentId.setAttribute('style','top:'+player.y+'px'+';left:'+player.x+'px');
		console.log(currentId);

}else if(currentKey===40){		//checks for down arrow press top = --
	player.y = player.y +=20;
	currentId.setAttribute('style','top:'+player.y+'px'+';left:'+player.x+'px');
		console.log(currentId);
}
	

//if statements to determine direction pressed then apply setAttribute to change player's style(left/top)

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
				console.log('>');	
		break;

		case 38: 	//^
		//call move function for up here & store into player
		//player.moveY(player);
				event.preventDefault();	//prevents arrow from scrolling page
				player.moveY(player,currentKey);
				console.log('^');
		break;

		case 40: 	//v
		//call move function for down here & store into player
		//player.moveY(player);
				event.preventDefault();		//prevents arrow from scrolling page
				player.moveY(player,currentKey);
				console.log('v');
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
//countdown timer
//maybe: in a loading bar format
//00:00 >> end of turn
//pop-up window to display score and other info about turn
//***** store player info with sessionStorage *******
/*function reset(){		//refreshes page
	location.reload();
}*/



/*___________________________________________________________________________*/
};
