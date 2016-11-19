var count = 10; //count to 60seconds
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
var board = domSelector(".htmlBoard");
board = board[0];

window.onload = function() {

  var scoreBoard = new Frame('scoreB', 750, 5, 125, 40);
  var sb = domSelector('.gameHeader');
  sb = sb[0];
  // console.log(sb);
  sb.append(scoreBoard.tag);
  scoreBoard.tag.innerHTML = 0;
  // currentTurn++;
  var board = domSelector(".htmlBoard");
  board = board[0];
  //   console.log(currentTurn);

  /*____________________________Board ____________________________________________*/
  function onBoard(player, frame) {
    board.append(player.tag);
    board.append(floor.tag);
    board.append(plat1.tag);
    board.append(plat2.tag);
    board.append(point1.tag);
    board.append(point2.tag);

  }
  /*____________________________Turn_______________________________________________*/

  /*____________________________Player Objects_____________________________________*/
  function Player(id, name, x, y, score) {
    this.tag = document.createElement('div');
    this.tag.setAttribute('class', "playerAnimate");
    this.tag.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.tag.setAttribute('style', 'left:' + x + 'px' + ';top:' + y + 'px' + ';width:' + 72.5 + 'px' + ';height:' +
      100 + 'px');
    this.score = score;
  }
  var p1Score = sessionStorage.getItem('p1Score'); ////example of how to retrieve sessionstorage

  console.log(p1Score);
  //console.log(p2Score);

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
  var floor = new Frame('floor', 0, 525, 900, 75);
  var plat1 = new Frame('platform', 0, 251, 200, 50);
  var plat2 = new Frame('platform', 350, 251, 200, 50);
  var objects = [floor, plat1, plat2];

  /*____________________________Objective Objects___________________________*/
  //figure out how to make unique objective items based on current player
  //var point1 = new Frame('waterPoint point pointAnimate', 10, 135, 75, 129);
  // var point2 = new Frame('waterPoint point pointAnimate', 360, 135, 75, 129);

  /*____________________________Score_______________________________________*/
  //display (complete/total) objectives
  //maybe: OOOOO(start) >>> XOOOO(after one objective) like hearts in zelda

  /*_______________________collision & collector_________________________________*/
  function collision(player) {
    for (var i = 0; i < objects.length; i++) {
      var check = player.x + 72 > objects[i].x && player.x < objects[i].x + objects[i].w && player.y + 100 > objects[
        i].y && player.y < objects[i].y + objects[i].h;
      if (check) {
        console.log('collision!!!!!!!' + i);
        return true;
      }
    }
  }

  function collect(player) {
    for (var i = 0; i < point.length; i++) {  //point is an array to store points available
      var check = player.x + 72 > point[i].x && player.x < point[i].x + point[i].w && player.y + 100 > point[i].y &&
        player.y < point[i].y + point[i].h;
      if (check && point[i] !== null) {
        player.score++;
        console.log(player.score);
        scoreBoard.tag.innerHTML = player.score;
        console.log('collect objective!!!!!!!');
        var rm = point[i].tag;
        point[i] = ''; ///removes point from array
       // rm.parentNode.removeChild(rm); //removes from board
        //change class of object
        if(player.tag.id==='p1'){
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
      if (player.x < 0) { //checks x position of player to determin if out of bounds
        console.log('out of bounds' + player.x);
        player.x = 0;
      } else if (collision(player) === true) {
        player.x = player.x + 20;
      } else if (collect(player) === true) {} else {
        currentId.setAttribute('style', att);
      }
    } else if (currentKey === 39) { //checks for right arrow press left = --
      if (player.x > 800) {
        console.log('out of bounds' + player.x);
        player.x = player.x = 800;
      } else if (collision(player) === true) {
        player.x = player.x - 20;
      } else if (collect(player) === true) {} else {
        console.log(att);
        currentId.setAttribute('style', att);
      }
    }
  };
  Player.prototype.moveY = function(player, currentKey) {
    var currentId = document.getElementById(player.tag.id);
    var att = ('left:' + player.x + 'px' + ';top:' + player.y + 'px');
    if (currentKey === 38) { //checkes keypress for up arrow (currentKey in moveX()) top=++
      if (player.y < 0) {
        console.log('out of bounds' + player.y);
        player.y = 0;
      } else if (collision(player) === true) {
        player.y = player.y + 20;
      } else if (collect(player) === true) {} else {
        currentId.setAttribute('style', att);
      }
    } else if (currentKey === 40) { //checks for down arrow press top = --
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
  //maybe: in a loading bar format
  var countInterval = setInterval(timer, 1000); //1000ms===1s

  if (retrievedTurn % 2 === 0) { //is even
    var point1 = new Frame('firePoint point pointAnimate', 10, 145, 80, 129);
    var point2 = new Frame('firePoint point pointAnimate', 360, 145, 80, 129);
    onBoard(player1); //setTimer onBoard

    timer(player1);
    keyStuff(player1);
  
  } else if (retrievedTurn % 2 === 1) {
    point1 = new Frame('waterPoint point pointAnimate', 10, 135, 75, 129);
    point2 = new Frame('waterPoint point pointAnimate', 360, 135, 75, 129);

    onBoard(player2);
    timer(player2);
    // score(player2);
    keyStuff(player2);
  }
  //   console.log(currentTurn);
  var point = [point1, point2];
function timer(player) {
  count -= 1;
  // console.log(retrievedTurn);
  if (count < 0) {
    if(retrievedTurn%2===0){ ///after player1
    sessionStorage.setItem('p1Score', JSON.stringify(player1.score)); //save player info to sessionStorage
    alert(user2name+' get ready!');
    }
    else{
      if(p1Score==player2.score){
        alert('Tie\n'+ user1name+' ignited '+p1Score+' fire(s)! ' +user2name + ' extinguished '+player2.score + ' fire(s)!');
      }else if(p1Score>player2.score){
        alert(user1name+' WINS!\n'+ user1name+' ignited '+p1Score+' fire(s)! ' +user2name + ' extinguished '+player2.score + ' fire(s)!');
      }else{
        alert(user2name+' WINS!\n'+user1name+' ignited '+p1Score+' fire(s)! ' +user2name + ' extinguished '+player2.score + ' fire(s)!');
      }
    }
    //sessionStorage.setItem('p1name', JSON.stringify(player1.name)); //save player info to sessionStorage
   // sessionStorage.setItem('p2name', JSON.stringify(player2.name)); //save player info to sessionStorage
    //      alert(player.name+'Your score was: '+player.score);          //display results
    retrievedTurn++;
    //console.log(player1.score);
    //    console.log(player2.score);

    sessionStorage.setItem('currentTurn', JSON.stringify(retrievedTurn)); //save player info to sessionStorage
    clearInterval(countInterval);
    reset();
   // return;
  }
  domSelector('#timer').innerHTML = "0:" + count;
}
};

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