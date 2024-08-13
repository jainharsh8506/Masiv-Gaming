////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////
var enableMobileSound = true;
var soundOn;

function playSound(target, loop){
	if(soundOn){
		var isLoop;
		if(loop){
			isLoop = -1;
			createjs.Sound.stop();
			musicLoop = createjs.Sound.play(target, createjs.Sound.INTERRUPT_NONE, 0, 0, isLoop, 1);
			if (musicLoop == null || musicLoop.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}else{
				musicLoop.removeAllEventListeners();
				musicLoop.addEventListener ("complete", function(musicLoop) {
					
				});
			}
		}else{
			isLoop = 0;
			createjs.Sound.play(target);
		}
	}
}

function stopSound(){
	createjs.Sound.stop();
}

/*!
 * 
 * PLAY AUDIO - This is the function that runs to play description and answer audio
 * 
 */
 /*!
 * 
 * PLAY MUSIC - This is the function that runs to play and stop music
 * 
 */
$.sound = {};
function playSoundLoop(sound){
	if(soundOn){
		if($.sound[sound]==null){
			$.sound[sound] = createjs.Sound.play(sound);
			$.sound[sound].removeAllEventListeners();
			$.sound[sound].addEventListener ("complete", function() {
				$.sound[sound].play();
			});
		}
	}
}

function stopSoundLoop(sound){
	if(soundOn){
		if($.sound[sound]!=null){
			$.sound[sound].stop();
			$.sound[sound]=null;
		}
	}
}