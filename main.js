
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
		found = document.getElementByTagName(element);
	}
	return found;
};
/*____________________________Turn___________________________*/
var currentTurn=0; // even=player1 , odd=player 2


/*____________________________Player Objects_______________________________*/
function Player(name,x,y,score){
this.name=name;
this.x=x;
this.y=y;
this.score=score;
}

/*____________________________Board __________________________________*/
function onBoard(){

}

/*____________________________Player Movement___________________________*/


/*____________________________Objective Objects___________________________*/


/*____________________________Timer___________________________*/


/*____________________________Score___________________________*/


/*_______________________________________________________*/
