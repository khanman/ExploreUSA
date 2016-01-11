
/**

Author: Kevin Loughran
Project: VPX HTML5
Class: VPX js document

**/

(function(window)
{

	//--------------------------- CONSTRUCTOR:
	
	var VPXAudio = function()
	{
		
	}
	
	//--------------------------- CONSTANTS:
	

	//--------------------------- VARIABLES:
	
	var audioType = '';
	var allAudio = [];
	var audioIsOn = true;
	
	//--------------------------- PUBLIC METHODS:
	
	VPXAudio.init = function()
	{ 		
		var a = document.createElement('audio');
		var canPlayMP3 = !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
		
		if( canPlayMP3 )
		{
			audioType = 'mp3';
		}
		else
		{
			audioType = 'ogg';
		}
		
		var isWinPhone = ( navigator.userAgent.match(/Windows Phone/g) ? true : false );
		if(isWinPhone)
		{
			audioType == 'mp3';
		}
		
		allAudio[ 'closeclick' ] = new Audio("audio/" + audioType + "/clickclosedialogbox_01." + audioType);
		allAudio[ 'stateclick' ] = new Audio("audio/" + audioType + "/clickonstate_01." + audioType);
		allAudio[ 'teamclick' ] = new Audio("audio/" + audioType + "/clickonteam_01." + audioType);
		allAudio[ 'zoomoutclick' ] = new Audio("audio/" + audioType + "/clickzoomout_01." + audioType);
		
		allAudio[ 'revealteam' ] = new Audio("audio/" + audioType + "/revealteaminfo_01." + audioType);
		allAudio[ 'zoomout' ] = new Audio("audio/" + audioType + "/swooshzoomout_01." + audioType);
		allAudio[ 'zoomin' ] = new Audio("audio/" + audioType + "/zoominstateinfo_01." + audioType);
		
	}
	
	VPXAudio.playAudio = function( id )
	{
		if(audioIsOn)
		{
			allAudio[id].play();
		}
	}
	
	//--------------------------- GETTERS / SETTERS:
	
	VPXAudio.setAudio = function( type )
	{
		audioIsOn = type;
	}
	
	//--------------------------- PRIVATE METHODS:
	
	function buildAudio()
	{
		
	}	
	
	//----------------------------------------------

window.VPXAudio = VPXAudio;
}(window));