# Project_1

user story:  https://trello.com/b/b5gdksBg/project-1-game
  
wireframe:  https://app.moqups.com/clay_code/Sx2Qmlvpak/edit/page/a109a8ab2


In this game I relyed heavily on object constructors and css DOM manipulation. The player, barriers, and point objectives all are created from constructors so if I did want to add different levels or characters it would be eaiser.  All movement of the character and position checks happen from the '.setAttribute' style or class.  This basically is how I created an x and y axis to base the board on. 

The turns are based off of a sessionStorage variable that adds one each time the board is reset and saves the total turn count.  From there, objects and players are placed on the board depending if the count is even or odd.

The timer has an interval of 1000 ms. A count is used for total time. When the count hits 0 an alert is displayed depending on the turn. 
