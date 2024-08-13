////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/logo.png', id:'logo'},
			{src:'assets/bg_sky.png', id:'bgSky'},
			{src:'assets/bg_ground.png', id:'bgGround'},
			{src:'assets/bg_road_white.png', id:'bgRoadWhite'},
			{src:'assets/bike.png', id:'bike'},
			{src:'assets/bike_tyre.png', id:'bikeTyre'},
			{src:'assets/human.png', id:'human'},
			{src:'assets/bicycle_left_Spritesheet5x5.png', id:'bikeLeftLeg'},
			{src:'assets/bicycle_right_Spritesheet5x5.png', id:'bikeRightLeg'},
			{src:'assets/button_left.png', id:'buttonLeft'},
			{src:'assets/button_right.png', id:'buttonRight'},
			{src:'assets/button_switch.png', id:'buttonSwitch'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_google.png', id:'buttonGoogle'},
			{src:'assets/board.png', id:'board'},
			{src:'assets/overlayInstruction.png', id:'overlayInstruction'}];
	
	for(n=0;n<background_arr.length;n++){
		for(s=0;s<background_arr[n].src.length;s++){
			manifest.push({src:background_arr[n].src[s].src, id:background_arr[n].type+s});
		}
	}
		
	for(n=0;n<distraction_arr.length;n++){
		manifest.push({src:distraction_arr[n].src, id:'obj'+n});	
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/click.ogg', id:'soundClick'})
		manifest.push({src:'assets/sounds/bike_bell.ogg', id:'soundBikeBell'})
		manifest.push({src:'assets/sounds/bike_loop_slow.ogg', id:'soundBikeLoopSlow'})
		manifest.push({src:'assets/sounds/bike_loop_fast.ogg', id:'soundBikeLoopFast'})
		manifest.push({src:'assets/sounds/bike_ride.ogg', id:'soundBikeRide'})
		manifest.push({src:'assets/sounds/bike_lane.ogg', id:'soundBikeLane'})
		manifest.push({src:'assets/sounds/fail.ogg', id:'soundFail'})
		manifest.push({src:'assets/sounds/clock.ogg', id:'soundClock'})
		manifest.push({src:'assets/sounds/music.ogg', id:'music'})
		
		for(n=0;n<distraction_arr.length;n++){
			manifest.push({src:distraction_arr[n].sound, id:'soundObj'+n});	
		}
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}