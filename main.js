var count = 20; //how long the timer runs
var retrievedTurn = sessionStorage.getItem('currentTurn'); ////saved turn #
  var inputInfo = window.location.search; //drops info from previous inputs (?Player+1=c&Player+2=s)
  var user1name = inputInfo.slice(10, inputInfo.indexOf('&')); //slices ^ to get player1name
  var user2name = inputInfo.slice(inputInfo.indexOf('&') + 10); //slices to get player 2 name

var domSelector = function(element) { //function to search for id,class,or tag (element)
  var found;
  if (element[0] === '#') {
    found = document.getElementById(element.slice(1, element.length));
  } else if (element[0] === '.') {
    found = document.getElementsByClassName(element.slice(1, element.length));
  } else {
    found = document.getElementsByTagName(element);
  }
  return found;
};

window.onload = function() { //waits for the page to load, then runs this

  var scoreBoard = new Frame('scoreB', 750, 5, 125, 40);
  var sb = domSelector('.gameHeader');
  sb = sb[0];
  var nameInHeader = domSelector ('.name');
  nameInHeader = nameInHeader[0];
  nameInHeader.innerHTML = user1name;

  sb.append(scoreBoard.tag);

  scoreBoard.tag.innerHTML = 0;
  var board = domSelector(".htmlBoard");
  board = board[0]; //stores the dom board for easy access later


  /*____________________________Board ____________________________________________*/
  function onBoard(player, frame) {
    board.append(player.tag);
    board.append(floor.tag);
    
    board.append(plat1.tag);
    board.append(plat2.tag);
    board.append(plat3.tag);
    board.append(plat4.tag);

    board.append(point1.tag);
    board.append(point2.tag);
    board.append(point3.tag);
    board.append(point4.tag);
    board.append(point5.tag);
  }
  

  /*____________________________Player Constructor and make players_____________________________________*/
  function Player(id, name, x, y, score) {
    this.tag = document.createElement('div');
    this.tag.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.tag.setAttribute('style', 'left:' + x + 'px' + ';top:' + y + 'px' + ';width:' + 72.5 + 'px' + ';height:' +
      100 + 'px');  //places player on board by appending css style
    this.score = score;
  }
  var p1Score = sessionStorage.getItem('p1Score'); ////saves previous p1 score


  var player1 = new Player('p1', user1name, 0, 425, 0,p1Score);
  var player2 = new Player('p2', user2name, 0, 425, 0);

  /*____________________________Structure Objects_____________________________________*/
  function Frame(cl, x, y, w, h) {
    this.tag = document.createElement('div');
    this.tag.setAttribute('class', cl);
    this.x = x;
    this.y = y;
    this.tag.setAttribute('style', 'left:' + x + 'px' + ';top:' + y + 'px' + ';width:' + w + 'px' + ';height:' + h +
      'px');
    this.h = h;
    this.w = w;
  }
  var floor = new Frame('floor', 0, 525, 900, 75);  //floor player cannot move through

  var plat1 = new Frame('platform', 0, 351, 200, 50);   ///platforms that player cannot move through
  var plat2 = new Frame('platform', 450, 251, 200, 50);
  var plat3 = new Frame('platform', 75, 110, 200, 50);
  var plat4 = new Frame('platform', 690, 151, 200, 50);

  var objects = [floor, plat1, plat2,plat3,plat4];


  /*_________________________determines turn makes points accordingly___________*/
  if (retrievedTurn % 2 === 0) { //is even

    var point1 = new Frame('firePoint point pointAnimate', 10, 245, 80, 129);
    var point2 = new Frame('firePoint point pointAnimate', 460, 145, 80, 129);
    var point3 = new Frame('firePoint point pointAnimate', 800, 45, 80, 129);
    var point4 = new Frame('firePoint point pointAnimate', 800, 445, 80, 129);
    var point5 = new Frame('firePoint point pointAnimate', 75, 0, 80, 129);
    onBoard(player1); 

    timer(player1);
    keyStuff(player1);
  
   } else if (retrievedTurn % 2 === 1) {

    point1 = new Frame('waterPoint point pointAnimate', 10, 236, 75, 129);
    point2 = new Frame('waterPoint point pointAnimate', 460, 135, 75, 129);
    point3 = new Frame('waterPoint point pointAnimate', 800, 35, 75, 129);
    point4 = new Frame('waterPoint point pointAnimate', 800, 425, 75, 129);
    point5 = new Frame('waterPoint point pointAnimate', 75, 0, 75, 129);
    onBoard(player2);
    timer(player2);
    // score(player2);
    keyStuff(player2);
  }
  //   console.log(currentTurn);
  var point = [point1, point2,point3,point4,point5];
  /*____________________________Score_______________________________________*/
 

  /*_______________________collision & collector_________________________________*/
  function collision(player) {    //detects when player interacts with solid objects, does not let player move through
    for (var i = 0; i < objects.length; i++) {
      var check = player.x + 72 > objects[i].x && player.x < objects[i].x + objects[i].w && player.y + 100 > objects[
        i].y && player.y < objects[i].y + objects[i].h;  //checks player x&y and compares to objects
      if (check) {
        console.log('collision!!!!!!!' + i);
        return true;
      }
    }
  }
  function collect(player) {
    for (var i = 0; i < point.length; i++) {  //point is an array to store points available
      var check = player.x + 72 > point[i].x && player.x < point[i].x + point[i].w && player.y + 100 > point[i].y &&
        player.y < point[i].y + point[i].h; //checks players position compares to point positions
      if (check && point[i] !== null) {
        player.score++; //adds to players score
        scoreBoard.tag.innerHTML = player.score + "/"+point.length; //puts new score on board
        console.log('collect objective!!!!!!!');
        var rm = point[i].tag;  //identifies which point was interacted with
        point[i] = ''; ///removes point from array
        if(player.tag.id==='p1'){  //changes class of point for p1 or p2 to make correct animation
         rm.setAttribute('class', 'fireAfter point pointAnimate');
       } else {
        rm.setAttribute('class', 'waterAfter point pointAnimate');
       }
      }
    }
  }

  /*____________________________Player Movement_____________________________________*/
  Player.prototype.moveX = function(player, currentKey) {
    var currentId = document.getElementById(player.tag.id);
    var att = ('left:' + player.x + 'px' + ';top:' + player.y + 'px');
    if (currentKey === 37) { //checkes keypress for left arrow (currentKey in moveX()) left=++
      player.tag.setAttribute('class', 'playerAnimateL'); //adds animation class
      if (player.x < 0) { //checks x position of player to determin if out of bounds
        console.log('out of bounds' + player.x);
        player.x = 0;
      } else if (collision(player) === true) {  //checks for collision and regresses position back to last place
        player.x = player.x + 20;
      } else if (collect(player) === true) {} else { //if interacting with a point
        currentId.setAttribute('style', att);
      }
    } else if (currentKey === 39) { //checks for right arrow press left = --
      player.tag.setAttribute('class', 'playerAnimateR');
      if (player.x > 800) {
        console.log('out of bounds' + player.x);
        player.x = player.x = 800;
      } else if (collision(player) === true) {
        player.x = player.x - 20;
      } else if (collect(player) === true) {} else {
        //console.log(att);
        currentId.setAttribute('style', att);
      }
    }
  };
  Player.prototype.moveY = function(player, currentKey) {
    var currentId = document.getElementById(player.tag.id);
    var att = ('left:' + player.x + 'px' + ';top:' + player.y + 'px');
    if (currentKey === 38) { //checkes keypress for up arrow (currentKey in moveX()) top=++
    player.tag.setAttribute('class', 'playerAnimateU');
      if (player.y < 0) {
        console.log('out of bounds' + player.y);
        player.y = 0;
      } else if (collision(player) === true) {    
        player.y = player.y + 20;
      } else if (collect(player) === true) {} else {
        currentId.setAttribute('style', att);
      }
    } else if (currentKey === 40) { //checks for down arrow press top = --
    player.tag.setAttribute('class', 'playerAnimateD');
      if (player.y > 500) {
        console.log('out of bounds' + player.y);
        player.y = 500;
      } else if (collision(player) === true) {
        player.y = player.y - 20;
      } else if (collect(player) === true) {} else {
        currentId.setAttribute('style', att);
      }
    }
  };

  function keyStuff(player) {
    document.addEventListener('keydown', function(event) { //looks for a keypress>>passes # for corrasponding keyCode
      var currentKey = event.keyCode;
      if (event.keyCode !== 91 && event.keyCode !== 82) {
        event.preventDefault(); //prevents arrow from scrolling page
        switch (event.keyCode) {
          case 37: //<
            player.x = player.x -= 20;
            player.moveX(player, currentKey); //calls move() which appends style
            break;

          case 39: //>
            player.x = player.x += 20;
            player.moveX(player, currentKey);
            break;

          case 38: //^
            player.y = player.y -= 20;
            player.moveY(player, currentKey);
            break;

          case 40: //v
            player.y = player.y += 20;
            player.moveY(player, currentKey);
            break;
        }
        console.log('px:' + player.x + 'py:' + player.y);
      }
    });
  }

  /*____________________________Timer_______________________________________*/
    var countInterval = setInterval(timer, 1000); //1000ms===1s

  
    function timer(player) {
      count -= 1;  //how much time passes each itteration
      if (count < 0) {
        if(retrievedTurn%2===0){ ///after player1
        sessionStorage.setItem('p1Score', JSON.stringify(player1.score)); //save player info to sessionStorage
        alert(user2name+' get ready!');  //break between players
        }
        else{
          if(p1Score==player2.score){ //tie condition
            alert('Tie\n'+ user1name+' ignited '+p1Score+' fire(s)! ' +user2name + ' extinguished '+player2.score + ' fire(s)!');
          }else if(p1Score>player2.score){ //p1 win condition
            alert(user1name+' WINS!\n'+ user1name+' ignited '+p1Score+' fire(s)! ' +user2name + ' extinguished '+player2.score + ' fire(s)!');
          }else{ //p2 win condition
            alert(user2name+' WINS!\n'+user1name+' ignited '+p1Score+' fire(s)! ' +user2name + ' extinguished '+player2.score + ' fire(s)!');
          }
        }
        retrievedTurn++; //adds 1 to current turn

        sessionStorage.setItem('currentTurn', JSON.stringify(retrievedTurn)); //save player info to sessionStorage
        clearInterval(countInterval);
        reset();  // calls page reset at the end of each turn
      }
      domSelector('#timer').innerHTML = count; //timer on board and update 
  }
}; //end of onLoad

function reset() { //refreshes page
  location.reload();
}



/*document.addEventListener('keydown',function(event){      ///finds the keycode of each key pressed
  console.log(event.which);
});*/
//"< arrow" = 37
//"> arrow" = 39
//"^" arrow = 38
//"v" arrow = 40