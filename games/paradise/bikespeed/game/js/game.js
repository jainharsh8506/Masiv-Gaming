////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var startButtonText = 'TAP TO RIDE'; //text for start button
var instructionText = 'Press keyboard left and right arrow\nrepeatly to increase speed.\n\nSpacebar to switch lane.' //text for instruction
var instructionMobileText = 'Press left and right arrow\nrepeatly to increase speed.\n\nSwitch to switch lane.' //text for instruction
var distanceText = '[NUMBER]KM'; //text for distance

var timerColour = '#ffffff'; //timer text colour
var timerWarningColour = '#FF4D4D'; //timer text warning colour
var distanceColour = "#f4f0ee"; //distance text colour

var keyboard_arr = [37,32,39]; //keyboard key code, start with left, switch and right
var keyboardAlpha = .6; //button opacity number
var keyboardPressAlpha = .3; //button pressed opacity number

var bikeMaxSpeed = 30;
var switchLaneSpeed = .3; //bike switch lane speed

var boardText = '+10'; //checkpoint board text (+10 sec)
var level_arr = {timer:30000, //timer countdown
				checkpointDistance:3, //distance for checkpoint
				timerIncrease:10000, //timer increase when checkpoint reached
				distanceIncrease:3} //distance increase for next checkpoint

//background objects			
var background_arr = [{src:[{src:'assets/bg_cloud.png', regX:57, regY:26.5}], type:'cloud', distance:800, speed:25, index:3, scaleRange:5, startRange:[100, 300]},
					  {src:[{src:'assets/bg_mountain01.png', regX:450.5, regY:125},{src:'assets/bg_mountain02.png', regX:458, regY:242}], type:'mountain', distance:2000, speed:50, index:2, scaleRange:3, startRange:[400]},
					  {src:[{src:'assets/bg_tree01.png', regX:28, regY:148},{src:'assets/bg_tree02.png', regX:98/2, regY:169}], type:'tree', distance:500, speed:80, index:1, scaleRange:3, startRange:[400, 470]},
					  {src:[{src:'assets/bg_grass.png', regX:53.5, regY:18}], type:'grass', distance:300, speed:80, index:0, scaleRange:3, startRange:[400, 470]},];

//distraction
var distractionDistance = 1500;	//the distraction object display timer 
var distraction_arr = [{src:'assets/obj_rock1.png', sound:'assets/sounds/rock.ogg', decrease:5, index:1},
						{src:'assets/obj_rock2.png', sound:'assets/sounds/rock.ogg', decrease:5, index:1},
						{src:'assets/obj_water.png', sound:'assets/sounds/water_step.ogg', decrease:5, index:1},
						{src:'assets/obj_hole.png', sound:'assets/sounds/hole.ogg', decrease:10, index:1},
						{src:'assets/obj_cone.png', sound:'assets/sounds/cone.ogg', decrease:30, index:0}];

var replayButtonText = 'TAP TO REPLAY'; //text for replay button

//Social share, [SCORE] will replace with game time
var shareText = ''; //text for share
var shareTitle = 'Highscore on Bike Speed is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Bike Speed! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
				  
var bikeRacePosition = 280;
var bikeWidth = 300;
var playerData = {distance:0, distanceNum:0, time:0, timeTotal:0, checkpointDistance:0};
var gameData = {action:false, speed:0, maxSpeed:bikeMaxSpeed, key:false, keyNum:0, side:false, hit:false, frameDelta:0, frame:0, blockDis:0, blockDisCount:0, clockDis:0, objDistance:[], paused:true, block:false};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	if($.browser.mobile || isTablet){
		
	}else{
		var isInIframe = (window.location != window.parent.location) ? true : false;
		if(isInIframe){
			this.document.onkeydown = keydown;
			this.document.onkeyup = keyup;
		
			$(window).blur(function() {
				appendFocusFrame();
			});
			appendFocusFrame();
        }else{
            this.document.onkeydown = keydown;
			this.document.onkeyup = keyup;
        }
	}
	
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('game');
	});
	
	buttonLeft.addEventListener("mousedown", function(evt) {
		controlInput('left');
	});
	
	buttonLeft.addEventListener("pressup", function(evt) {
		controlRelease('left');
	});
	
	buttonRight.addEventListener("mousedown", function(evt) {
		controlInput('right');
	});
	
	buttonRight.addEventListener("pressup", function(evt) {
		controlRelease('right');
	});
	
	buttonSwitch.addEventListener("mousedown", function(evt) {
		controlInput('switch');
	});
	
	buttonSwitch.addEventListener("pressup", function(evt) {
		controlRelease('switch');
	});
	
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonGoogle.cursor = "pointer";
	buttonGoogle.addEventListener("click", function(evt) {
		share('google');
	});
}

function appendFocusFrame(){
	$('#mainHolder').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	$('#focus').click(function(){
		$('#focus').remove();
	});	
}

function setupGameButton(){
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerMethod);
}

function removeGameButton(){
	stage.cursor = null;
	stage.removeEventListener("click", handlerMethod);
}

function handlerMethod(evt) {
	 switch (evt.type){
		 case 'click':
		 	playSound('soundClick');
		 	goPage('game');
		 	break;
	 }
}

/*!
 * 
 * KEYBOARD EVENTS - This is the function that runs for keyboard events
 * 
 */
function keydown(event) {
	console.log(event.keyCode)
	var curKeyboardIndex = keyboard_arr.indexOf(event.keyCode);
	
	if(curKeyboardIndex != -1){
		if(curKeyboardIndex == 0){
			//left
			controlInput('left');
		}else if(curKeyboardIndex == 2){
			//right
			controlInput('right');
		}else if(curKeyboardIndex == 1){
			//switch
			controlInput('switch');
		}
	}
}

function keyup(event) {
	var curKeyboardIndex = keyboard_arr.indexOf(event.keyCode);
    if(curKeyboardIndex != -1){
		if(curKeyboardIndex == 0){
			//left
			controlRelease('left');
		}else if(curKeyboardIndex == 2){
			//right
			controlRelease('right');
		}else if(curKeyboardIndex == 1){
			//switch
			controlRelease('switch');
		}
	}
}

/*!
 * 
 * INPUT EVENTS - This is the function that runs for control events
 * 
 */
function controlInput(type){
	if(!gameData.paused){
		overlayInstruction.visible = instructionShadowTxt.visible = instructionTxt.visible = false;
		
		if(type == 'left' && gameData.key){
			gameData.key = false;
			gameData.keyNum++;
			buttonLeft.alpha = keyboardPressAlpha;
		}else if(type == 'right' && !gameData.key){
			gameData.key = true;
			gameData.keyNum++;
			buttonRight.alpha = keyboardPressAlpha;
		}else if(type == 'switch'){
			if(gameData.speed > 0){
				switchSide();
			}	
			buttonSwitch.alpha = keyboardPressAlpha;
		}
		
		if(gameData.keyNum >= 2){
			gameData.keyNum = 0;
			gameData.speed++;
			gameData.speed = gameData.speed > gameData.maxSpeed ? gameData.maxSpeed : gameData.speed;
			stopActionInterval();
		}
	}
}

function controlRelease(type){
	if(type == 'left'){
		buttonLeft.alpha = keyboardAlpha;
	}else if(type == 'right'){
		buttonRight.alpha = keyboardAlpha;
	}else if(type == 'switch'){
		buttonSwitch.alpha = keyboardAlpha;
	}	
}


/*!
 * 
 * BIKE RIDE ACTION - This is the function that runs for bike ride action
 * 
 */
var actionInterval = null;
function stopActionInterval(){
	gameData.action = true;
	clearActionInterval();
	actionInterval = setInterval(stopActionIntervalComplete, 500);
	clearSlowDownInterval();
}

function clearActionInterval(){
	clearInterval(actionInterval);
	actionInterval = null;
}

function stopActionIntervalComplete(){
	clearActionInterval();
	gameData.action = false;
	slowDownInterval();	
}

var slowInterval = null;
function slowDownInterval(){
	clearSlowDownInterval();
	var slowTimer = gameData.speed * 50;
	slowInterval = setInterval(slowDownIntervalComplete, slowTimer);
}

/*!
 * 
 * BIKE SLOW DOWN - This is the function that runs for bike slow down when no action
 * 
 */
function slowDownIntervalComplete(){
	gameData.speed--;
	gameData.speed = gameData.speed <= 0 ? 0 : gameData.speed;
	slowDownInterval();
}

function clearSlowDownInterval(){
	clearInterval(slowInterval)
	slowInterval = null;	
}


/*!
 * 
 * BIKE SWITCH LANE - This is the function that runs for bike switch lane animation
 * 
 */
function switchSide(){
	var newY = 0;
	if(gameData.side){
		gameData.side = false;
		newY = canvasH/100*65;
	}else{
		gameData.side = true;
		newY = canvasH/100*55;	
	}
	TweenMax.to(bike, switchLaneSpeed, {x:bikeRacePosition, y:newY, overwrite:true});
	playSound('soundBikeLane');
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	removeGameButton();
	stopAnimateButton(buttonStartTxt);
	stopAnimateButton(buttonReplay);
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			setupGameButton();
			startAnimateButton(buttonStartTxt);
			setupBike('main');
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			startAnimateButton(buttonReplay);
			
			stopGame();
			saveGame(playerData.distance);
		break;
	}
	
	targetContainer.visible=true;
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:0}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	playerData.distance = 0;
	playerData.distanceNum = 0;
	playerData.time = 0;
	playerData.timeTotal = level_arr.timer;
	playerData.checkpointDistance = level_arr.checkpointDistance;
	
	gameData.hit = false;
	gameData.blockDis = distractionDistance;
	gameData.blockDisCount = 0;
	overlayInstruction.visible = instructionShadowTxt.visible = instructionTxt.visible = true;
	
	setupBike('game');
	updateStat();
	
	buttonLeft.alpha = buttonRight.alpha = buttonSwitch.alpha = keyboardAlpha;
	toggleGameTimer(true);
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	updateStat();
	clearActionInterval();
	clearSlowDownInterval();
	setupBike('result');
	
	toggleGameTimer(false);
}

 /*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * SETUP BIKE ANIMATION - This is the function that runs to setup bike for different page
 * 
 */
function setupBike(con){
	switch (con){
		 case 'main':
		 	gameData.speed = 10;
			bike.x = canvasW/2;
			bike.y = canvasH/100*65;
			gameData.action = true;
			gameData.paused = true;
			gameData.block = false;
		 	break;
			
		case 'game':
			TweenMax.to(gameData, 1, {speed:0, overwrite:true});
			TweenMax.to(bgContainer, 1, {y:-50, overwrite:true});
			TweenMax.to(bike, 1, {x:bikeRacePosition, overwrite:true});
			gameData.action = false;
			gameData.paused = false;
		 	break;
			
		case 'result':
			TweenMax.to(bgContainer, 1, {y:0, overwrite:true});
			gameData.speed = 10;
			gameData.paused = true;
			gameData.action = false;
			gameData.hit = true;
			gameData.block = false;
		 	break;
	 }	
}

/*!
 * 
 * CREATE OBJECTS - This is the function that runs to create objects
 * 
 */
function createObjects(){
	for(n=0;n<background_arr.length;n++){
		if(gameData.objDistance[n] <= 0){
			gameData.objDistance[n] = getValue(background_arr[n].type, 'distance');
			createObj(background_arr[n].type);
		}else{
			gameData.objDistance[n] -= gameData.speed;	
		}
	}
	
	/*//cloud
	if(gameData.cloudDis <= 0){
		gameData.cloudDis = getValue('cloud', 'distance');
		createObj('cloud');
	}else{
		gameData.cloudDis -= gameData.speed;
	}
	
	//mountain
	if(gameData.mountainDis <= 0){
		gameData.mountainDis = getValue('mountain', 'distance');
		createObj('mountain');
	}else{
		gameData.mountainDis -= gameData.speed;
	}
	
	//grass
	if(gameData.grassDis <= 0){
		gameData.grassDis = getValue('grass', 'distance');
		createObj('grass');
	}else{
		gameData.grassDis -= gameData.speed;
	}
	
	//tree
	if(gameData.treeDis <= 0){
		gameData.treeDis = getValue('tree', 'distance');
		createObj('tree');
	}else{
		gameData.treeDis -= gameData.speed;
	}*/
	
	//loop
	if(gameData.block){
		if(gameData.blockDis <= 0){
			gameData.blockDisCoun++;
			
			if(gameData.blockDisCoun > 5){
				gameData.blockDisCoun = 0;
				gameData.blockDis = (distractionDistance*2) + (Math.random()*((distractionDistance*2)/2));
			}else{
				gameData.blockDis = distractionDistance + (Math.random()*(distractionDistance/2));
			}
			createObj('block');
		}else{
			gameData.blockDis -= gameData.speed;
		}
	}
}

/*!
 * 
 * UPDATE STAT - This is the function that runs to update stat
 * 
 */
function updateStat(){
	playerData.distance = (playerData.distanceNum * .0002).toFixed(1);
	
	resultScoreTxt.text = resultScoreShadowTxt.text = distanceText.replace('[NUMBER]',playerData.distance);
	distanceTxt.text = distanceShadowTxt.text = distanceText.replace('[NUMBER]',playerData.distance);
	timeTxt.text = timeShadowTxt.text = timeWarningTxt.text = millisecondsToTime(playerData.timeTotal - playerData.time);
}

/*!
 * 
 * CREATE OBJECT - This is the function that runs to create object
 * 
 */
var backgroundObj_arr = [];
var backgroundBlock_arr = [];

function createObj(type){
	var newObj
	var randomNum
	var newSpeed = getValue(type, 'speed');
	var indexNum = getValue(type, 'index');
	
	for(n=0;n<background_arr.length;n++){
		if(type == background_arr[n].type){
			randomNum = Math.floor(Math.random()*background_arr[n].src.length);
			newObj = $.object[background_arr[n].type+randomNum].clone();	
			newObj.x = canvasW + newObj.image.naturalWidth;
			
			newObj.scaleX = newObj.scaleY = ((Math.random()*(background_arr[n].scaleRange)) *.1)+((10 - background_arr[n].scaleRange)*.1);
			
			if(background_arr[n].startRange.length == 1){
				newObj.y = background_arr[n].startRange[0];
			}else{
				var distanceNum = background_arr[n].startRange[1] - background_arr[n].startRange[0];
				newObj.y = Math.random()* (distanceNum) + background_arr[n].startRange[0];
				newSpeed += Math.round(Math.random()*(newSpeed/canvasH * distanceNum));
			}
		}
	}
	
	if(type == 'block'){
		randomNum = Math.floor(Math.random()*distraction_arr.length);
		newObj = $.object[randomNum].clone();
		newObj.x = canvasW + newObj.image.naturalWidth;
		newObj.decrease = distraction_arr[randomNum].decrease;
		newObj.sound = 'soundObj'+randomNum;
		indexNum = distraction_arr[randomNum].index;
		
		newObj.hit = false;
		if(randomBoolean()){
			newObj.side = false;
			newObj.y = canvasH/100*82;
		}else{
			newObj.side = true;
			newObj.y = canvasH/100*70;
		}
		newSpeed = 100;
	}
	
	if(randomBoolean()){
		newObj.scaleX = -(newObj.scaleX);	
	}
	
	if(type == 'block'){
		backgroundBlock_arr.push({obj:newObj, type:type, speed:newSpeed, index:indexNum});
		
		if(newObj.side==true || indexNum == 1){
			blockBackContainer.addChild(newObj);
		}else{
			blockFrontContainer.addChild(newObj);
		}
	}else{
		backgroundObj_arr.push({obj:newObj, type:type, speed:newSpeed, index:indexNum});
		
		sortIndex();
		objContainer.addChild(newObj);	
	}
}

function getValue(type, val){
	for(o=0;o<background_arr.length;o++){
		if(type == background_arr[o].type){
			return background_arr[o][val];
		}
	}
}

/*!
 * 
 * SORT OBJECTS INDEX - This is the function that runs to sort background objects index
 * 
 */
function sortIndex(){
	sortOnObject(backgroundObj_arr, 'index');
	
	var indexNum = backgroundObj_arr.length-1;
	
	for(s=0;s<backgroundObj_arr.length;s++){
		if(backgroundObj_arr[s].type != 'block'){
			objContainer.setChildIndex(backgroundObj_arr[s].obj, indexNum);
			indexNum--;
		}
	}
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(event){
	playerData.distanceNum += gameData.speed;
	if(playerData.distance > playerData.checkpointDistance){
		increaseCheckpoint();
	}
	
	updateBackground();
	updateCheckpoint();
	createObjects();
	updateBike();
	
	if(gameTimerUpdate){
		nowDate = new Date();
		playerData.time = (nowDate.getTime() - beforeDate.getTime());
		
		if(playerData.time > 3000){
			gameData.block = true;	
		}
		
		updateStat();
		
		var timeConvert = playerData.timeTotal - playerData.time;
		if(timeConvert <= 5000){
			updateTimerSound('fast');
		}else if(timeConvert <= 10000){
			updateTimerSound('slow');
		}else {
			updateTimerSound('');	
		}
		
		var distance = nowDate.getTime() - gameData.clockDis.getTime();
		if(soundTimerCon == 'fast') {
			if(distance > 500){
				gameData.clockDis = new Date();
				playSound('soundClock');
				blindTimer(timeWarningTxt);
			}
		}else if(soundTimerCon == 'slow') {
			if(distance > 1000){
				gameData.clockDis = new Date();
				playSound('soundClock');
				blindTimer(timeWarningTxt);
			}	
		}
		
		if(playerData.time >= playerData.timeTotal){
			playSound('soundFail');
			goPage('result');
		}
	}
}

/*!
 * 
 * TIMER WARNING SOUND - This is the function that runs to play timer warning sound
 * 
 */
var soundTimerCon = '';
function updateTimerSound(con){
	if(soundTimerCon != con){
		soundTimerCon = con;
	}	
}

/*!
 * 
 * TOGGLE GAME TIMER - This is the function that runs to toggle game timer
 * 
 */
var beforeDate, nowDate
var gameTimerUpdate
function toggleGameTimer(con){
	if(con){
		beforeDate = new Date();
		gameData.clockDis = new Date();
		updateStat();
	}
	gameTimerUpdate = con;
}

/*!
 * 
 * UPDATE BACKGROUND - This is the function that runs to update background objects position
 * 
 */
function updateBackground(){
	bgRoadWhite.x = (bgRoadWhite.x - gameData.speed) % bgRoadWhite.tileW;
	
	for(n=0;n<backgroundObj_arr.length;n++){
		backgroundObj_arr[n].obj.x -= gameData.speed/100 * backgroundObj_arr[n].speed;
		
		if(backgroundObj_arr[n].obj.x < 0-(backgroundObj_arr[n].obj.image.naturalWidth)){
			objContainer.removeChild(backgroundObj_arr[n].obj);
			backgroundObj_arr.splice(n,1);
		}
	}
	
	for(n=0;n<backgroundBlock_arr.length;n++){
		backgroundBlock_arr[n].obj.x -= gameData.speed/100 * backgroundBlock_arr[n].speed;
		
		if(backgroundBlock_arr[n].obj.x < 0-(backgroundBlock_arr[n].obj.image.naturalWidth)){
			if(backgroundBlock_arr[n].side==true){
				blockBackContainer.removeChild(backgroundBlock_arr[n].obj);
			}else{
				blockFrontContainer.removeChild(backgroundBlock_arr[n].obj);
			}
			backgroundBlock_arr.splice(n,1);
		}else{
			checkObjectHit(backgroundBlock_arr[n].obj);
		}
	}	
}

/*!
 * 
 * UPDATE CHECKPOINT BOARD - This is the function that runs to update checkpoint board position
 * 
 */
function updateCheckpoint(){
	if(board.visible){
		if(board.x < 0-(board.image.naturalWidth)){
			board.visible = false;
		}else{
			var endRight = bikeRacePosition + (bikeWidth/2);
			if(board.x < endRight && !board.hit){
				board.hit = true;
				increaseTimer();
			}
			board.x -= gameData.speed;	
			boardTxt.x = board.x ; 
		}
	}
}

/*!
 * 
 * INCREASE CHECKPOINT - This is the function that runs to increase checkpoint
 * 
 */
function increaseCheckpoint(){
	playerData.checkpointDistance += level_arr.distanceIncrease;
	
	board.visible = boardTxt.visible = true ;
	board.x = canvasW + board.image.naturalWidth;
	boardTxt.x = board.x;
	
	board.y = canvasH/100 * 63;
	board.hit = false;
	boardTxt.y = board.y - 38;
}

/*!
 * 
 * INCREASE TIMER - This is the function that runs to increase timer
 * 
 */
function increaseTimer(){
	playSound('soundBikeBell');
	playerData.timeTotal += level_arr.timerIncrease;
	console.log('increase');
}

/*!
 * 
 * TIMER ANIMATION - This is the function that runs to play timer animation
 * 
 */
function blindTimer(obj){
	obj.alpha = 0;
	TweenMax.to(obj, .3, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(obj, .3, {alpha:0, overwrite:true, onComplete:function(){
			
		}});
	}});	
}

/*!
 * 
 * CHECK OBJECT HIT - This is the function that runs to check hit objects
 * 
 */
function checkObjectHit(obj){
	var objW = obj.image.naturalWidth/2;
	var endLeft = bikeRacePosition - (bikeWidth/2);
	var endRight = bikeRacePosition + (bikeWidth/2);
	if(obj.x > (endLeft+objW) && obj.x < (endRight+objW) && gameData.side == obj.side && !obj.hit){
		playSound(obj.sound);
		
		obj.hit = true;
		gameData.speed -= obj.decrease;
		gameData.speed = gameData.speed < 0 ? 0 : gameData.speed;
		
		if(obj.decrease == gameData.maxSpeed){
			goPage('result');
		}
	}
}

/*!
 * 
 * UPDATE BIKE - This is the function that runs to update bike position and animation
 * 
 */
function updateBike(){
	if(gameData.hit){
		bike.x -= gameData.speed;	
		bike.x = bike.x < -500 ? -500 : bike.x;
	}
	
	bikeTyreBack.x = bike.x - 110;
	bikeTyreBack.y = bike.y + 45;
	
	bikeTyreFront.x = bike.x + 105;
	bikeTyreFront.y = bike.y + 45;
	
	human.x = bike.x + 5
	human.y = bike.y - 142;
	
	humanLeftLegAnime.x = bike.x - 87;
	humanLeftLegAnime.y = bike.y - 105;
	
	humanRightLegAnime.x = humanLeftLegAnime.x;
	humanRightLegAnime.y = humanLeftLegAnime.y;
	
	if(!gameData.hit){
		bikeTyreBack.rotation += gameData.speed;
		bikeTyreFront.rotation += gameData.speed;
	}
	
	if(gameData.action){
		gameData.frameDelta++;
		if(gameData.frameDelta > ((gameData.maxSpeed - gameData.speed)*.2) && gameData.speed > 0){
			gameData.frameDelta = 0;
			gameData.frame++;
		}
		var totalFrames = humanLeftLegData.getNumFrames()-1;
		gameData.frame = gameData.frame > totalFrames ? 1 : gameData.frame;
		
		humanLeftLegAnime.gotoAndStop(gameData.frame);
		humanRightLegAnime.gotoAndStop(gameData.frame);
	}
	
	if(curPage == 'result'){
		updateBikeSound('');
	}else if(gameData.speed > 0){
		if(gameData.action){
			updateBikeSound('ride');
		}else{
			if(gameData.speed >10){
				updateBikeSound('fast');	
			}else{
				updateBikeSound('slow');
			}
		}
	}else{
		updateBikeSound('');
	}
}

/*!
 * 
 * UPDATE BIKE SOUND - This is the function that runs to update and play bike sound
 * 
 */
var curBikeSound = '';
function updateBikeSound(con){
	if(curBikeSound != con){
		curBikeSound = con;
		
		stopSoundLoop('soundBikeRide');
		stopSoundLoop('soundBikeLoopSlow');
		stopSoundLoop('soundBikeLoopFast');
		
		if(con == 'ride'){
			playSoundLoop('soundBikeRide');
		}else if(con == 'slow'){
			playSoundLoop('soundBikeLoopSlow');
		}else if(con == 'fast'){
			playSoundLoop('soundBikeLoopFast');
		}else if(con == ''){
			
		}
	}
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
	  
	  if(seconds<10){
		seconds = '0'+seconds;  
	  }
	  
	  if(minutes<10){
		minutes = '0'+minutes;  
	  }
	  
	  return minutes+':'+seconds;
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", playerData.distance);
	text = shareMessage.replace("[SCORE]", playerData.distance);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}