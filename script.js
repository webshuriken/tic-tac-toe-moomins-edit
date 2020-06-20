/*
 * name: Noughts and Crosses. MOOMINS AND MYS style.
 * author: Amy L Sutton (Designer), Carlos EAM (Developer)
 * description: A free game of noughts and crosses.
 * Based on the kids novel the Moomins, we do not own any rights to their name or products.
 * This  game was made over a couple of days for fun.
 * Anyone can copy this game free of charge.
 * created: 28/01/17
 * revised: 20-06-2020
 * version: 1.0
 */

// TODO: Update the code to ES6

function startMMGame(){
  Game_Page_UI.initGameSettings();
}
/*
 * Game_Page_UI. The games home page.
 */
var Game_Page_UI = {
  gamePageUIOpen: false,
  coverPageOn: null,
  characterSelectPageOpen: false,
  gamePlayPageOpen: false,
  playerCharacter: null,
  computerCharacter: null,
  initGameSettings: function() {
	// move #cover-page-ui block to background
	this.coverPage = document.getElementById("cover-page-ui");
	setTimeout(function(){ Game_Page_UI.coverPage.className="reveal-cover-page"; }, 300);
    // switch gamePageUI on.
	this.gamePageUIOpen = true;
	// call Character_Select_UI object and init
	this.openCharacterSelect();
  },
  openCharacterSelect: function(){
	Character_Select_UI.initUISettings();
	Character_Select_UI.openCloseUI(true);
	this.characterSelectPageOpen = true;
  },
  openGamePlay: function(){
	this.gamePlayPageOpen = true;
	// all settings must be init at start, every time.
	Game_Play_UI.initUISettings(this.playerCharacter, this.computerCharacter);
  },
  checkTheProperties: function() {
    // check that all settings have been set properly
  },
  exitGame: function(){
	this.playerCharacter = null;
	this.computerCharacter = null;
	this.characterSelectPageOpen = false;
	this.gamePlayPageOpen = false;
	this.gamePageUIOpen = false;
	// display the home page
	setTimeout(function(){ Game_Page_UI.coverPage.className=""; }, 300);
  },
  loadGame: function(player, computer){
	this.characterSelectPageOpen = false;
	this.playerCharacter = player;
	// make sure computer and payer dont have the same characters
	while(computer == player){
      computer = Character_Select_UI.randomSelection();
	}
	this.computerCharacter = computer;
	this.openGamePlay();
  },
}

/*
 * Character selection UI.
 */
var Character_Select_UI = {
  uiActive: false,
  uiOpen: false,
  playerCharacter: null,
  computerCharacter: null,
  msg: null,
  characters: ["hatifatner","snuffkin","sniff","little-my","moomin","groke","moomin-mama","light-house","moomin-papa"],
  initUISettings: function(){
	this.uiActive = true;
	// buttons
	this.btns = document.getElementsByClassName("select-btns");
	this.btns[0].className = "btn-buttons select-btns";
  	this.btns[1].className = "btn-buttons select-btns";
	// add event listeners to the list of characters to detect user selection
	this.charList = document.getElementById("list-of-characters").getElementsByTagName("LI");
	for ( var i=0; i < 9; i++ ){
	  this.charList[i].className = "open-char-select";
	  this.charList[i].getElementsByTagName("IMG")[0].addEventListener( 'touchstart', Character_Select_UI.characterSelect, false );
	  this.charList[i].getElementsByTagName("IMG")[0].addEventListener( 'click', Character_Select_UI.characterSelect, false );
	};
	// add event listeners to the ok and quit buttons
	var elem = document.getElementById("character-select-footer-wrapper").getElementsByTagName("p");
	for ( var i=1; i <= 2; i++ ){
	  elem[i].addEventListener( 'touchstart', Character_Select_UI.btnOkQuit, false );
	  elem[i].addEventListener( 'click', Character_Select_UI.btnOkQuit, false );
	}
	// assign element for msg.
	this.msg = document.getElementById("select-character-msg");
  },
  clearSettings: function(){
	// reset all settings for this object and exit the game
	this.btns[0].className = "btn-buttons select-btns ani-btns";
  	this.btns[1].className = "btn-buttons select-btns ani-btns";
	this.uiActive = false;
	this.uiOpen = false;
	if ( this.playerCharacter ){
	  Character_Select_UI.playerCharacter.className = "";
	}
	// make the characters opacity 0 again
	for ( var i=0; i < 9; i++ ){
	  this.charList[i].className = "";
	};
	// reset variables
	this.playerCharacter = null;
	this.computerCharacter = null;
  },
  openCloseUI: function(openOrClose) {
	/*
	 * the openCloseUI method takes a boolean parameter to indicate if
	 * the request is to close the window (false) or open it (true)
	 */
	var elem = document.getElementById("choose-character-ui");
	if ( openOrClose && !this.uiOpen ){
	  elem.style.zIndex=40;
	  this.uiOpen = true;
	}else if ( !openOrClose && this.uiOpen ){
	  elem.style.zIndex=66;
	  this.clearSettings();
	  this.uiOpen = false;
	}else {
	  console.log("EPA! - Character_Select_UI, openCloseUI");
	}
  },
  characterSelect: function(e){
	// remove shadow from previous selection so no 2 characters are highlighted simultaneously
    if (Character_Select_UI.playerCharacter != null) {
      Character_Select_UI.playerCharacter.className = "";
	}
	this.className = "chosen-character";
	Character_Select_UI.playerCharacter = this;
  },
  randomSelection: function(){
	var a = 0;
	for (var i=0;i < 9; i++){
	  a += Math.round(Math.random());
	}
	return this.characters[a];
  },
  gameMsg: function(){
	  Character_Select_UI.msg.style.display="block";
	  Character_Select_UI.msg.style.opacity=1;
	setTimeout(function(){
	  Character_Select_UI.msg.style.display="hidden";
	  Character_Select_UI.msg.style.opacity=0;
	}, 1500);
  },
  btnOkQuit: function(e){
	if ( this.innerHTML == "OK" ){
	  Character_Select_UI.loadGame();
	}else if ( this.innerHTML == "QUIT" ){
	  Character_Select_UI.openCloseUI(false);
	  Game_Page_UI.exitGame();
	}else{
	  console.log("EPA! - Character_Select_UI, btnOkQuit");
	}
  },
  aniBtns: function() {
  	this.btns[0].className = "btn-buttons select-btns ani-btns";
  	this.btns[1].className = "btn-buttons select-btns ani-btns";
  },
  loadGame: function() {
	if (this.playerCharacter != null) {
	  this.aniBtns();
	  Game_Page_UI.loadGame(this.playerCharacter.getAttribute("alt"), this.randomSelection());
	  this.openCloseUI(false);
	}else{
	  Character_Select_UI.gameMsg();
	}
  },
}

/*
 * Game play UI, this is the where game is played
 */
var Game_Play_UI = {
  uiActive: false,
  uiOpen: false,
  player: null,
  computer: null,
  foundWinner: false,
  uiWrapper: null,
  gameBoardWrapper: null,
  // all possible moves stored in 1 array of arrays. 8 possible moves. Constant.
  WinMoves: [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ],
  // gameBoardSelection is to keep track of where on the board the user has placed a move 0-computer, 1-human
  gameBoardSelection: [0,0,0,0,0,0,0,0,0],
  // availability of space on the board regardless of which player moved there.
  spacesAvail: [0,0,0,0,0,0,0,0,0],
  cMovesMade: [],
  cMovesAvail: [],
  cLastMove: null,
  oMovesMade: [],
  playerTurn: 0,
  initUISettings: function(player, computer){
  	// initialize the properties
  	this.uiActive = true;
  	this.player = "images/characters/" + player + ".png";
  	this.computer = "images/characters/" + computer + ".png";
  	this.uiWrapper = document.getElementById("game-play-ui");
  	// win lose images
  	this.imgWrapper = document.getElementsByClassName("win-loose-wrapper");
    this.wlImg = document.getElementsByClassName("win-lose-img");
  	// buttons
  	this.btns = document.getElementsByClassName("select-btns");
  	this.btns[2].className = "btn-buttons select-btns";
    	this.btns[3].className = "btn-buttons select-btns";
    	this.btns[4].className = "btn-buttons select-btns";
  	this.gameBoardWrapper = document.getElementById("the-game-board").getElementsByTagName("IMG");
  	// add event listeners to the grid the user will interact with
  	for ( var i=0; i < 9; i++ ){
  	  this.gameBoardWrapper[i].addEventListener( 'touchstart', Game_Play_UI.playerMove, false );
  	  this.gameBoardWrapper[i].addEventListener( 'click', Game_Play_UI.playerMove, false );
  	};
  	// add event listeners to the back, quit and restart buttons
  	var elem = document.getElementById("game-play-footer-wrapper").getElementsByTagName("p");
  	for ( var i=0; i <= 2; i++ ){
  	  elem[i].addEventListener( 'touchstart', Game_Play_UI.btnBackQuitRestart, false );
  	  elem[i].addEventListener( 'click', Game_Play_UI.btnBackQuitRestart, false );
  	};
  	// add images to top of game board. Player 1 vs player 2
  	var playersImg = document.getElementById("game-ui-header").getElementsByTagName("IMG");
  	playersImg[0].setAttribute("src", this.player);
  	playersImg[1].setAttribute("src", this.computer);
  	// build UI
  	this.openUI();
  },
  openUI: function(){
  	this.uiWrapper.className = "game-play-wrapper";
  	this.uiOpen = true;
  },
  closeUI: function(quitGame){
  	// clear the board
  	this.restart(true)
  	// reset object properties to original values
  	this.btns[2].className = "btn-buttons select-btns ani-btns";
    	this.btns[3].className = "btn-buttons select-btns ani-btns";
    	this.btns[4].className = "btn-buttons select-btns ani-btns";
      this.uiWrapper.className = "";
      this.player = null;
      this.computer = null;
      this.uiWrapper = null;
  	this.uiOpen = false;
  	this.uiActive = false;
  	// call main Exit method to close the whole game
  	if (quitGame){
  	  Game_Page_UI.exitGame();
  	}
  },
  // the parameter tells it if it is quitting the game or restarting
  restart: function(wannaQuit){
  	this.imgWrapper[0].className = "win-loose-wrapper";
  	this.wlImg[0].className = "win-lose-img";
  	this.wlImg[1].className = "win-lose-img";
  	// clear the board
  	for (var i=0; i < 9; i++){
  	  // place-holder.png is a transparent image used to reset the game board
  	  this.gameBoardWrapper[i].setAttribute("src", "images/backgrounds/place_holder.png");
  	  this.gameBoardSelection[i] = 0;
  	}
  	// reset variables so game can restart
  	this.playerTurn = 0;
  	this.cMovesMade = [];
  	this.cMovesAvail = [];
  	this.cLastMoves = null;
  	this.oMovesMade = [];
  	this.spacesAvail = [0,0,0,0,0,0,0,0,0];
  	this.foundWinner = false;
  },
  back: function(){
  	Game_Play_UI.closeUI(false);
  	Game_Page_UI.openCharacterSelect();
  },
  playerMove: function(){
    // continue to place pieces on board only if there has not been a winner
  	if (!Game_Play_UI.foundWinner){
  	  // call method to add image to grid area user selected
  	  if (Game_Play_UI.gameBoardSelection[this.getAttribute("alt")] == 0){
  	    Game_Play_UI.makeMove(this);
  	  }else{
  	    return;
  	  }
  	  // computer takes turns right after human if he/she has not won
  	  if (!Game_Play_UI.foundWinner){
  	    Game_Play_UI.computerMove();
  	  }
  	}
  },
  computerMove: function(){
  	var moveTo;
  	if (this.playerTurn == 1){
  	  moveTo = this.randomMove(9);
  	  this.makeMove(this.gameBoardWrapper[moveTo]);
  	}else if (this.playerTurn == 3){
  	  moveTo = this.smartMove(false);
  	  this.makeMove(this.gameBoardWrapper[moveTo]);
  	}else if (this.playerTurn >= 4){
  	  moveTo = this.smartMove(false);
  	  this.makeMove(this.gameBoardWrapper[moveTo]);
  	}else{
  	  // do nothing
  	}
  },
  randomMove: function(nOfLoops){
  	var a = 0;
  	for (var i=0;i < nOfLoops; i++){
  	  a += Math.round(Math.random());
  	}
  	// check if the space is free, if not then recursion.
  	if (this.spacesAvail[a] == 1){
  	  a = this.randomMove(9);
  	}
  	return a;
    },
    smartMove: function(smartRandom){
  	var moveTo;
  	if (!smartRandom){
  	  moveTo = this.whereToMove(3);
  	}
  	return moveTo;
  },
  makeMove: function(elem){
  	// update the spacesAvail array to show the latest move;
  	var spaceTakenBy = elem.getAttribute("id").substring(7,8);
  	this.spacesAvail[spaceTakenBy] = 1;
  	// check who made the this move and update accordingly.
  	if ( (this.playerTurn % 2) && this.playerTurn < 9 ){
  	  // even is computer turn
  	  setTimeout(function(){
          elem.setAttribute("src", Game_Play_UI.computer);
  	    Game_Play_UI.cMovesMade.push(spaceTakenBy);
  	    Game_Play_UI.cLastMove = spaceTakenBy;
  	  }, 200, elem);
  	  this.gameBoardSelection[elem.getAttribute("alt")] = 1;
  	}else if ( this.playerTurn < 9 ){
        // odd are the human player turn
  	  elem.setAttribute("src", this.player);
  	  this.oMovesMade.push(spaceTakenBy);
  	  this.gameBoardSelection[elem.getAttribute("alt")] = 4;
  	}else{
  	  console.log("EPA! - Game_Play_UI, makeMove");
  	}
  	if (this.playerTurn >= 4){
  	  this.checkMove();
  	}
  	this.playerTurn++;
  },
  whereToMove: function(onMove){
  	var moveTo;
  	if (onMove >= 3){
  	  moveTo = this.checkMovesAvail(3);
  	}else{
  	  console.log("whereToMove method, shouldnt be here");
  	}
  	return moveTo;
  },
  checkMovesAvail: function(onMove){
  	var moveTo;
  	if (onMove >= 3){
  	  // check win moves
  	  moveTo = this.checkWinMoves(this.cMovesMade, 1);
  	  return moveTo;
  	}
  },
  checkWinMoves: function(playerToCheck, nOfLoops){
  	var availMoves = [];
  	var moveTo;
  	var v;
  	// cycle through WinMoves and find the patterns which are a combination of 2 of the opponents moves. Create a list.
  	for (var outter=0; outter < playerToCheck.length; outter++){
  	  for (var h=0; h < 8; h++){
  	    v = 0;
  	    while(v < 3){
  		  if (this.WinMoves[h][v] == playerToCheck[outter]){
  		    availMoves.push(h);
  	      }
  	    v++;
  	    }
  	  }
      }
  	// go through the list just adquired and delete duplicate items value
  	for (var i=0; i < availMoves.length; i++){
  	  innerLoop = 0;
  	  a = 0;
  	  while (innerLoop < availMoves.length){
  		a += (availMoves[i] == availMoves[innerLoop])?1:0;
  		if (a == 2){
  		  availMoves.splice(innerLoop,1);
  		}
  		innerLoop++;
  	  }
  	}
  	// now take the array availMoves and find the patterns which are a combination of 2 of the opponents moves.
  	var pattern = [0,0,0,0,0,0,0,0];
  	for (var outterLoop=0; outterLoop < availMoves.length; outterLoop++){
  	  for (var middleLoop=0; middleLoop < playerToCheck.length; middleLoop++){
  		v=0;
  		while (v < 3){
  	      if (this.WinMoves[availMoves[outterLoop]][v] == playerToCheck[middleLoop]){
  			pattern[outterLoop]++;
  		  }
  		  v++;
  		}
  	  }
  	}
  	// filters throught the pattern array and get which patterns are to be countered
  	var patternB = [];
  	for(var i=0; i < pattern.length; i++){
  	  if (pattern[i] == 2){
  		patternB.push(availMoves[i]);
  	  }
  	}
  	// find free space on the board to move to.
  	for (var i=0; i < patternB.length; i++){
  	  v=0;
  	  while (v < 3){
  		if (this.spacesAvail[this.WinMoves[patternB[i]][v]] == 0){
  		  moveTo = this.WinMoves[patternB[i]][v];
  		}
  		v++;
  	  }
  	}
  	// check for winning moves or make a random move.
  	if (moveTo == undefined && nOfLoops == 1){
  	  moveTo = this.checkWinMoves(this.oMovesMade, 2);
  	}else if (moveTo == undefined && nOfLoops ==2){
  	  v=0;
  	  while (v<9){
  		if (this.spacesAvail[v] == 0){
  		  moveTo = v;
  		}
  		v++;
  	  }
  	}
    return moveTo;
  },
  checkMove: function(){
  	// array stores results of each loop and is sent as parameter to checkForWinner method
  	var points = [0,0,0,0,0,0,0,0];
  	this.winningPos;
  	// Check top horizontal row
  	var i = 0;
  	while(i < 3){
  	  points[0] += this.gameBoardSelection[i];
  	  i++;
  	}
  	if (points[0] == 3 || points[0] == 12) this.winningPos = 0;
  	// Check middle horizontal row
  	i = 3;
  	while(i < 6){
  	  points[1] += this.gameBoardSelection[i];
  	  i++;
  	}
  	if (points[1] == 3 || points[1] == 12) this.winningPos = 1;
  	// Check bottom horizontal row
  	i = 6;
  	while(i < 9){
  	  points[2] += this.gameBoardSelection[i];
  	  i++;
  	}
  	if (points[2] == 3 || points[2] == 12) this.winningPos = 2;
  	// check vertical moves
  	i = 0;
  	while (i<9){
  	  points[3] += this.gameBoardSelection[i];
  	  i++;
  	  points[4] += this.gameBoardSelection[i];
  	  i++;
  	  points[5] += this.gameBoardSelection[i];
  	  i++;
  	}
  	if (points[3] == 3 || points[3] == 12) this.winningPos = 3;
  	if (points[4] == 3 || points[4] == 12) this.winningPos = 4;
  	if (points[5] == 3 || points[5] == 12) this.winningPos = 5;
  	// Check diagonal line starting at top left corner
  	i = 0;
  	while(i < 9){
  	  points[6] += this.gameBoardSelection[i];
  	  i += 4;
  	}
  	if (points[6] == 3 || points[6] == 12) this.winningPos = 6;
  	// Check diagonal line starting at top left corner
  	i = 2;
  	while(i < 7){
  	  points[7] += this.gameBoardSelection[i];
  	  i += 2;
  	}
  	if (points[7] == 3 || points[7] == 12) this.winningPos = 7;
  	// call checkForWinner passing the array points[] to see who has won
  	this.checkForWinner(points);
  },
  checkForWinner: function(points){
  	var playerMove = ( (this.playerTurn%2) == 0 )?12:3;
  	for (var i=0; i<8; i++){
  	  if (points[i] == playerMove){
  	  	switch(this.winningPos) {
            case 0:
              this.winnerLights(0, 1);
              break;
            case 1:
              this.winnerLights(3, 1);
              break;
            case 2:
              this.winnerLights(6, 1);
              break;
            case 3:
              this.winnerLights(0, 3);
              break;
            case 4:
              this.winnerLights(1, 3);
              break;
            case 5:
              this.winnerLights(2, 3);
              break;
            case 6:
              this.winnerLights(0, 4);
              break;
            case 7:
              this.winnerLights(2, 2, false);
              break;
            default:
              // it should never land here
              console.log("!!!Breaking as checkForWinner");
          }
  		this.foundWinner = true;
  		var tis = this;
  		setTimeout(function(){
  		  tis.showWinner(playerMove);
  	    }, 2000, tis, playerMove);
  		break;
  	  }
  	}
  },
  winnerLights: function(startAt, increment, lightsOn){
  	var countFrom = startAt;
  	var cName = (lightsOn)?"":"winning-lights";
  	// turns lights ON and OFF for the winning move
  	for (var i=0; i < 3; i++){
      document.getElementById("square-" + countFrom).className=cName;
      // set timeout so the lights go outter
      countFrom += increment;
  	}
  	// functions call itself if the light are turning on to turn them OFF
  	if (!lightsOn){
  	  setTimeout(function(){Game_Play_UI.winnerLights(startAt, increment, true);}, 2000, startAt, increment);
    }
  },
  showWinner: function(winner){
  	// computer = 3 and human = 12 to win
  	this.imgWrapper[0].className = "win-loose-wrapper win-loose-ani-wrap"
  	if (winner == 3){
  	  // computer wins
  	  this.wlImg[1].className = "win-lose-img win-ani-img";
  	}else {
  	  // human wins
  	  this.wlImg[0].className = "win-lose-img win-ani-img";
  	}
  },
  btnBackQuitRestart: function(){
  	if ( this.innerHTML == "RESTART" ){
  	  Game_Play_UI.restart();
  	}else if ( this.innerHTML == "QUIT" ){
  	  Game_Play_UI.closeUI(true);
  	}else if ( this.innerHTML == "BACK" ){
  	  Game_Play_UI.back();
  	}else{
  	  console.log("EPA! - Game_Play_UI, btnBackQuitRestart");
  	}
  }
}

// add event listener to start button so to be able to start the game.
var startButton = document.getElementById("btn-play-wrapper").getElementsByTagName("p")[0];
startButton.addEventListener('touchstart', startMMGame, false);
startButton.addEventListener('click', startMMGame, false);