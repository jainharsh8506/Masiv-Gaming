////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, bgContainer, objContainer, blockBackContainer, blockFrontContainer, bikeContainer, mainContainer, gameContainer, resultContainer;
var logo, buttonStartTxt, bgSky, bgGround, bgRoadWhite, bgRoadWhite, bike, bikeTyreBack, bikeTyreFront, human, humanLeftLegData, humanLeftLegAnime, humanRightLegData, humanRightLegAnime, buttonLeft, buttonRight, buttonSwitch, distanceTxt, distanceShadowTxt, timeTxt, timeWarningTxt, timeShadowTxt, buttonReplay, buttonFacebook, buttonTwitter, buttonGoogle, shareTxt, shareShadowTxt, board, boardTxt, resultScoreTxt, resultScoreShadowTxt, overlayInstruction, instructionTxt, instructionShadowTxt;

$.object={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	bgContainer = new createjs.Container();
	objContainer = new createjs.Container();
	blockBackContainer = new createjs.Container();
	blockFrontContainer = new createjs.Container();
	bikeContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStartTxt = new createjs.Text();
	buttonStartTxt.font = "50px riffic_free_mediumbold";
	buttonStartTxt.color = "#ffffff";
	buttonStartTxt.text = startButtonText;
	buttonStartTxt.textAlign = "center";
	buttonStartTxt.textBaseline='alphabetic';
	buttonStartTxt.x = canvasW/2;
	buttonStartTxt.y = canvasH/100*93;
	
	board = new createjs.Bitmap(loader.getResult('board'));
	centerReg(board);
	board.regY = board.image.naturalHeight;
	board.x = -(board.image.naturalWidth);
	board.visible = false;
	
	boardTxt = new createjs.Text();
	boardTxt.font = "50px riffic_free_mediumbold";
	boardTxt.color = "#ffffff";
	boardTxt.text = boardText;
	boardTxt.textAlign = "center";
	boardTxt.textBaseline='alphabetic';
	
	bgSky = new createjs.Bitmap(loader.getResult('bgSky'));
	bgGround = new createjs.Bitmap(loader.getResult('bgGround'));
	bgGround.y = canvasH/100 * 52;
	
	var groundImg = loader.getResult("bgRoadWhite");
	bgRoadWhite = new createjs.Shape();
	bgRoadWhite.graphics.beginBitmapFill(groundImg).drawRect(0, 0, canvasW + groundImg.width, groundImg.height);
	bgRoadWhite.tileW = groundImg.width;
	bgRoadWhite.y = canvasH/100 * 73;
	
	bike = new createjs.Bitmap(loader.getResult('bike'));
	centerReg(bike);
	
	bikeTyreBack = new createjs.Bitmap(loader.getResult('bikeTyre'));
	centerReg(bikeTyreBack);
	
	bikeTyreFront = new createjs.Bitmap(loader.getResult('bikeTyre'));
	centerReg(bikeTyreFront);
	
	human = new createjs.Bitmap(loader.getResult('human'));
	centerReg(human);
	
	var _frame = {"regX": 0, "regY": 0, "height": 220, "count": 25, "width": 130};
	var _animations = {anime:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24], speed: 1}};
						
	humanLeftLegData = new createjs.SpriteSheet({
		"images": [loader.getResult('bikeLeftLeg').src],
		"frames": _frame,
		"animations": _animations
	});
	
	humanLeftLegAnime = new createjs.Sprite(humanLeftLegData, "anime");
	humanLeftLegAnime.framerate = 20;
	
	var _frame = {"regX": 0, "regY": 0, "height": 220, "count": 25, "width": 130};
	var _animations = {anime:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24], speed: 1}};
						
	humanRightLegData = new createjs.SpriteSheet({
		"images": [loader.getResult('bikeRightLeg').src],
		"frames": _frame,
		"animations": _animations
	});
	
	humanRightLegAnime = new createjs.Sprite(humanRightLegData, "anime");
	humanRightLegAnime.framerate = 20;
	
	buttonLeft = new createjs.Bitmap(loader.getResult('buttonLeft'));
	buttonRight = new createjs.Bitmap(loader.getResult('buttonRight'));
	buttonSwitch = new createjs.Bitmap(loader.getResult('buttonSwitch'));
	centerReg(buttonLeft);
	centerReg(buttonRight);
	centerReg(buttonSwitch);
	buttonLeft.x = canvasW/100*10;
	buttonRight.x = canvasW/100*90;
	buttonSwitch.x = canvasW/2;
	
	buttonLeft.y = buttonRight.y = buttonSwitch.y = canvasH/100 * 87;
	
	distanceTxt = new createjs.Text();
	distanceTxt.font = "50px riffic_free_mediumbold";
	distanceTxt.color = distanceColour;
	distanceTxt.text = '';
	distanceTxt.textAlign = "center";
	distanceTxt.textBaseline='alphabetic';
	distanceTxt.x = canvasW/2;
	distanceTxt.y = canvasH/100*13;
	
	distanceShadowTxt = new createjs.Text();
	distanceShadowTxt.font = "50px riffic_free_mediumbold";
	distanceShadowTxt.color = "#000000";
	distanceShadowTxt.text = '';
	distanceShadowTxt.textAlign = "center";
	distanceShadowTxt.textBaseline='alphabetic';
	distanceShadowTxt.x = distanceTxt.x - 5;
	distanceShadowTxt.y = distanceTxt.y + 5;
	distanceShadowTxt.alpha = .3;
	
	timeTxt = new createjs.Text();
	timeTxt.font = "70px riffic_free_mediumbold";
	timeTxt.color = timerColour;
	timeTxt.text = '';
	timeTxt.textAlign = "center";
	timeTxt.textBaseline='alphabetic';
	timeTxt.x = canvasW/2;
	timeTxt.y = canvasH/100*22;
	
	timeWarningTxt = new createjs.Text();
	timeWarningTxt.font = "70px riffic_free_mediumbold";
	timeWarningTxt.color = timerWarningColour;
	timeWarningTxt.text = '';
	timeWarningTxt.textAlign = "center";
	timeWarningTxt.textBaseline='alphabetic';
	timeWarningTxt.x = timeTxt.x;
	timeWarningTxt.y = timeTxt.y;
	timeWarningTxt.alpha = 0;
	
	timeShadowTxt = new createjs.Text();
	timeShadowTxt.font = "70px riffic_free_mediumbold";
	timeShadowTxt.color = "#000000";
	timeShadowTxt.text = '';
	timeShadowTxt.textAlign = "center";
	timeShadowTxt.textBaseline='alphabetic';
	timeShadowTxt.x = timeTxt.x - 5;
	timeShadowTxt.y = timeTxt.y + 5;
	timeShadowTxt.alpha = .3;
	
	buttonReplay = new createjs.Text();
	buttonReplay.font = "50px riffic_free_mediumbold";
	buttonReplay.color = "#ffffff";
	buttonReplay.text = replayButtonText;
	buttonReplay.textAlign = "center";
	buttonReplay.textBaseline='alphabetic';
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100*93;
	buttonReplay.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));	
	
	gameData.objDistance = [];
	for(n=0;n<background_arr.length;n++){
		gameData.objDistance.push(0);
		for(s=0;s<background_arr[n].src.length;s++){
			$.object[background_arr[n].type+s] = new createjs.Bitmap(loader.getResult(background_arr[n].type+s));
			$.object[background_arr[n].type+s].regX = background_arr[n].src[s].regX;
			$.object[background_arr[n].type+s].regY = background_arr[n].src[s].regY;
			$.object[background_arr[n].type+s].y = 0 - $.object[background_arr[n].type+s].image.naturalHeight;
			
			bgContainer.addChild($.object[background_arr[n].type+s]);
		}
	}
	
	for(n=0;n<distraction_arr.length;n++){
		$.object[n] = new createjs.Bitmap(loader.getResult('obj'+n));
		centerReg($.object[n]);
		$.object[n].regY = $.object[n].image.naturalHeight;
		
		bgContainer.addChild($.object[n]);
	}
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
	
	centerReg(buttonFacebook);
	centerReg(buttonTwitter);
	centerReg(buttonGoogle);
	
	buttonFacebook.x = canvasW/100 * 40;
	buttonTwitter.x = canvasW/2;
	buttonGoogle.x = canvasW/100 * 60;
	buttonFacebook.y = buttonTwitter.y = buttonGoogle.y = canvasH/100 * 38;
	
	shareTxt = new createjs.Text();
	shareTxt.font = "50px riffic_free_mediumbold";
	shareTxt.color = "#ffffff";
	shareTxt.text = shareText;
	shareTxt.textAlign = "center";
	shareTxt.textBaseline='alphabetic';
	shareTxt.x = canvasW/2;
	shareTxt.y = canvasH/100*30;
	
	shareShadowTxt = new createjs.Text();
	shareShadowTxt.font = "50px riffic_free_mediumbold";
	shareShadowTxt.color = "#000000";
	shareShadowTxt.text = shareText;
	shareShadowTxt.textAlign = "center";
	shareShadowTxt.textBaseline='alphabetic';
	shareShadowTxt.x = shareTxt.x - 5;
	shareShadowTxt.y = shareTxt.y + 5;
	shareShadowTxt.alpha = .3;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "80px riffic_free_mediumbold";
	resultScoreTxt.color = "#ffffff";
	resultScoreTxt.text = shareText;
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100*20;
	
	resultScoreShadowTxt = new createjs.Text();
	resultScoreShadowTxt.font = "80px riffic_free_mediumbold";
	resultScoreShadowTxt.color = "#000000";
	resultScoreShadowTxt.text = shareText;
	resultScoreShadowTxt.textAlign = "center";
	resultScoreShadowTxt.textBaseline='alphabetic';
	resultScoreShadowTxt.x = resultScoreTxt.x - 5;
	resultScoreShadowTxt.y = resultScoreTxt.y + 5;
	resultScoreShadowTxt.alpha = .3;
	
	overlayInstruction = new createjs.Bitmap(loader.getResult('overlayInstruction'));
	
	instructionTxt = new createjs.Text();
	instructionTxt.font = "40px riffic_free_mediumbold";
	instructionTxt.color = "#ffffff";
	instructionTxt.text = instructionText;
	instructionTxt.textAlign = "center";
	instructionTxt.textBaseline='alphabetic';
	instructionTxt.x = canvasW/2;
	instructionTxt.y = canvasH/100*58;
	
	instructionShadowTxt = new createjs.Text();
	instructionShadowTxt.font = "40px riffic_free_mediumbold";
	instructionShadowTxt.color = "#000000";
	instructionShadowTxt.text = instructionText;
	instructionShadowTxt.textAlign = "center";
	instructionShadowTxt.textBaseline='alphabetic';
	instructionShadowTxt.x = instructionTxt.x - 5;
	instructionShadowTxt.y = instructionTxt.y + 5;
	instructionShadowTxt.alpha = .3;
	
	if($.browser.mobile || isTablet){
		instructionTxt.text = instructionShadowTxt.text = instructionMobileText;
	}
	
	bgContainer.addChild(bgGround, bgRoadWhite, objContainer, board, boardTxt, blockBackContainer, bikeContainer, blockFrontContainer);
	bikeContainer.addChild(bikeTyreBack, bikeTyreFront, humanRightLegAnime, bike, humanLeftLegAnime, human);
	mainContainer.addChild(logo, buttonStartTxt);
	gameContainer.addChild(distanceShadowTxt, distanceTxt, timeShadowTxt, timeTxt, timeWarningTxt, overlayInstruction, instructionShadowTxt, instructionTxt, buttonLeft, buttonRight, buttonSwitch);
	resultContainer.addChild(resultScoreShadowTxt, resultScoreTxt, shareShadowTxt, shareTxt, buttonFacebook, buttonTwitter, buttonGoogle, buttonReplay);
	canvasContainer.addChild(bgSky, bgContainer, mainContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		//canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame(event);
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}