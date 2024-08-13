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

var canvasContainer, tableContainer, mainContainer, gameContainer, resultContainer;
var background, logo, buttonStartTxt, beer, beerShadow, chair, tableSide, tableTop, tableEnd, tableTarget, tableMask, tableTopImg, tableSideImg, boards, boardsImg, iconBeer, txtChances, txtScores, txtDistance, distanceBg, txtInstruction, buttonFacebook, buttonTwitter, buttonGoogle, txtResultTitle, txtResultScore, buttonReplay, swipeArrow;

$.beers = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	tableContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStartTxt = new createjs.Text();
	buttonStartTxt.font = "50px neutonregular";
	buttonStartTxt.color = "#ffffff";
	buttonStartTxt.text = startButtonText;
	buttonStartTxt.textAlign = "center";
	buttonStartTxt.textBaseline='alphabetic';
	buttonStartTxt.x = canvasW/2;
	buttonStartTxt.y = canvasH/100 * 70;
	
	chair = new createjs.Bitmap(loader.getResult('chair'));
	centerReg(chair);
	chair.x -= chair.image.naturalWidth;
	
	boardsImg = loader.getResult("boards");
	boards = new createjs.Shape();
	boards.graphics.beginBitmapFill(boardsImg).drawRect(0, 0, canvasW + (boardsImg.width*2), boardsImg.height);
	boards.tileW = boardsImg.width;
	boards.y = canvasH/100 * 20;
	
	tableSideImg = loader.getResult("tableSide");
	tableSide = new createjs.Shape();
	tableSide.graphics.beginBitmapFill(tableSideImg).drawRect(0, 0, canvasW + (tableSideImg.width*2), tableSideImg.height);
	tableSide.tileW = tableSideImg.width;
	tableSide.y = canvasH - tableSideImg.naturalHeight;
	
	tableTopImg = loader.getResult("tableTop");
	tableTop = new createjs.Shape();
	tableTop.graphics.beginBitmapFill(tableTopImg).drawRect(0, 0, canvasW + (tableTopImg.width*2), tableTopImg.height);
	tableTop.tileW = tableTopImg.width;
	tableTop.y = canvasH - (tableSideImg.naturalHeight+tableTopImg.naturalHeight);
	
	tableEnd = new createjs.Bitmap(loader.getResult('tableEnd'));
	tableEnd.regX = tableEnd.image.naturalWidth/2;
	tableEnd.y = tableTop.y;
	tableEnd.x = canvasW;
	
	tableTarget = new createjs.Bitmap(loader.getResult('tableTarget'));
	centerReg(tableTarget);
	tableTarget.y = tableTop.y + (tableTarget.image.naturalHeight/2);
	
	tableMask = new createjs.Shape();
	tableMask.alpha = 0;
	tableSide.mask = tableMask;
	tableTop.mask = tableMask;
	
	beerShadow = new createjs.Shape();
	
	txtDistance = new createjs.Text();
	txtDistance.font = "50px neutonregular";
	txtDistance.color = "#fff";
	txtDistance.text = '';
	txtDistance.textAlign = "center";
	txtDistance.textBaseline='alphabetic';
	txtDistance.x = canvasW/100 * 120;
	
	distanceBg = new createjs.Bitmap(loader.getResult('distanceBg'));
	centerReg(distanceBg);
	distanceBg.regX = distanceBg.image.naturalWidth;
	
	tableContainer.addChild(boards, chair, tableSide, tableTop, tableEnd, tableTarget, distanceBg, txtDistance, tableMask, beerShadow);
	
	for(n=0;n<mugs_arr.length;n++){
		$.beers[n] = new createjs.Bitmap(loader.getResult('beer'+n));
		centerReg($.beers[n]);
		$.beers[n].regY = $.beers[n].image.naturalHeight;
		tableContainer.addChild($.beers[n]);
		
		gameData.beerArray.push(n);
	}
	shuffle(gameData.beerArray);
	
	iconBeer = new createjs.Bitmap(loader.getResult('iconBeer'));
	centerReg(iconBeer);
	iconBeer.x = canvasW/100 * 7;
	iconBeer.y = canvasH/100 * 10;
	
	swipeArrow = new createjs.Bitmap(loader.getResult('swipeArrow'));
	centerReg(swipeArrow);
	swipeArrow.x = canvasW/100 * 38;
	swipeArrow.y = canvasH/100 * 46;
	
	txtChances = new createjs.Text();
	txtChances.font = "80px neutonregular";
	txtChances.color = "#536654";
	txtChances.text = '';
	txtChances.textAlign = "left";
	txtChances.textBaseline='alphabetic';
	txtChances.x = canvasW/100 * 13;
	txtChances.y = canvasH/100 * 15;
	
	txtScores = new createjs.Text();
	txtScores.font = "80px neutonregular";
	txtScores.color = "#536654";
	txtScores.text = '';
	txtScores.textAlign = "right";
	txtScores.textBaseline='alphabetic';
	txtScores.x = canvasW/100 * 94;
	txtScores.y = canvasH/100 * 15;
	
	txtInstruction = new createjs.Text();
	txtInstruction.font = "50px neutonregular";
	txtInstruction.color = "#ffffff";
	txtInstruction.text = instructionText;
	txtInstruction.textAlign = "center";
	txtInstruction.textBaseline='alphabetic';
	txtInstruction.x = canvasW/2;
	txtInstruction.y = canvasH/100 * 70;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
	
	centerReg(buttonFacebook);
	centerReg(buttonTwitter);
	centerReg(buttonGoogle);
	
	buttonFacebook.x = canvasW/100 * 32;
	buttonTwitter.x = canvasW/2;
	buttonGoogle.x = canvasW/100 * 68;
	buttonFacebook.y = buttonTwitter.y = buttonGoogle.y = canvasH/100 * 45;
	
	txtResultTitle = new createjs.Text();
	txtResultTitle.font = "90px neutonregular";
	txtResultTitle.color = "#495749";
	txtResultTitle.text = textResultTitle;
	txtResultTitle.textAlign = "center";
	txtResultTitle.textBaseline='alphabetic';
	txtResultTitle.x = canvasW/2;
	txtResultTitle.y = canvasH/100 * 18;
	
	txtResultScore = new createjs.Text();
	txtResultScore.font = "70px neutonregular";
	txtResultScore.color = "#495749";
	txtResultScore.text = '100pts';
	txtResultScore.textAlign = "center";
	txtResultScore.textBaseline='alphabetic';
	txtResultScore.x = canvasW/2;
	txtResultScore.y = canvasH/100 * 26;
	
	buttonReplay = new createjs.Text();
	buttonReplay.font = "50px neutonregular";
	buttonReplay.color = "#ffffff";
	buttonReplay.text = replayButtonText;
	buttonReplay.textAlign = "center";
	buttonReplay.textBaseline='alphabetic';
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100 * 70;
	buttonReplay.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
	
	mainContainer.addChild(logo, buttonStartTxt);
	gameContainer.addChild(iconBeer, txtChances, txtScores, swipeArrow, txtInstruction);
	resultContainer.addChild(buttonFacebook, buttonTwitter, buttonGoogle, txtResultTitle, txtResultScore, buttonReplay);
	canvasContainer.addChild(background, tableContainer, mainContainer, gameContainer, resultContainer);
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