window.onload = function() {
  var retrievedObject = sessionStorage.getItem('player1'); ////example of how to retrieve sessionstorage
//  console.log('retrievedObject: ', JSON.parse(retrievedObject)); ///look at bottom

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
  var player1 = new Player('p1', user1name, 0, 425, 0);
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

 // var point = [point1, point2];

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
    for (var i = 0; i < point.length; i++) {
      var check = player.x + 72 > point[i].x && player.x < point[i].x + point[i].w && player.y + 100 > point[i].y &&
        player.y < point[i].y + point[i].h;
      if (check && point[i] !== null) {
        player.score++;
        console.log(player.score);
        scoreBoard.tag.innerHTML = player.score;
        console.log('collect objective!!!!!!!');
        var rm = point[i].tag;
        point[i] = ''; ///removes point from array
        rm.parentNode.removeChild(rm); //removes from board
      }
    }
  }
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
  //this is where the events during the turn will go (player onboard,setTimer,score>player,turnEnd)
  var currentTurn = 0; // even=player1 , odd=player 2
  // maybe needs a button to start? or on window load
  if (currentTurn % 2 === 0) { //is even
  var point1 = new Frame('firePoint point pointAnimate', 10, 160, 80, 114);
  var point2 = new Frame('firePoint point pointAnimate', 360, 160, 80, 114);
    onBoard(player1); //setTimer onBoard
   // score(player1); //score onBoard
    keyStuff(player1);
  } else if (currentTurn % 2 === 1) {
   point1 = new Frame('waterPoint point pointAnimate', 10, 135, 75, 129);
   point2 = new Frame('waterPoint point pointAnimate', 360, 135, 75, 129);

    onBoard(player2);
   // score(player2);
    keyStuff(player2);
  }
  var point = [point1, point2];

  /*____________________________Player Movement_____________________________________*/
  Player.prototype.moveX = function(player, currentKey) {
    var currentId = document.getElementById(player.tag.id);
    var att=('left:' + player.x + 'px' + ';top:' + player.y + 'px');
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
        currentId.setAttribute('style',att);
      }
    }
  };
  Player.prototype.moveY = function(player, currentKey) {
    var currentId = document.getElementById(player.tag.id);
    var att=('left:' + player.x + 'px' + ';top:' + player.y + 'px');
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
      if (event.keyCode !== 91 && event.keyCode !== 82 ) {
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

  /*____________________________Score_______________________________________*/
  //display (complete/total) objectives
  //maybe: OOOOO(start) >>> XOOOO(after one objective) like hearts in zelda

  
  var scoreBoard = new Frame('scoreB', 750, 5, 125, 40);
  var sb = domSelector('.gameHeader');
  sb=sb[0];
  console.log(sb);
  sb.append(scoreBoard.tag);
  scoreBoard.tag.innerHTML = 0;

  function reset() { //refreshes page
    location.reload();
  }
  /*____________________________Timer_______________________________________*/
  //√√countdown timer
  //maybe: in a loading bar format
  //√√00:00 >> end of turn
  //pop-up window to display score and other info about turn
  /*
  var count=2; //count to 60seconds
  var countInterval = setInterval(timer,1000);  //1000ms===1s
  function timer(player){
    count -=1;
    if(count<0){
      clearInterval(countInterval);
      return;
    }
    domSelector('#timer').innerHTML=count+" seconds";
    if(count===0){
      sessionStorage.setItem(player.id, JSON.stringify(player)); //save player info to sessionStorage
      alert('Your score was: '+player.score);          //display results
      currentTurn++;  
    reset();
    }
  }*/
};

/*document.addEventListener('keydown',function(event){      ///finds the keycode of each key pressed
  console.log(event.which);
});*/
//"< arrow" = 37
//"> arrow" = 39
//"^" arrow = 38
//"v" arrow = 40