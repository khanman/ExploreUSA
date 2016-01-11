
/**

Author: Kevin Loughran
Project: VPX
Class: VPX js document

**/

(function(window)
{

	//--------------------------- CONSTRUCTOR:
	
	var VPXMain = function()
	{
		
	}
	
	//--------------------------- GLOBAL VARIABLES:
	
	VPXMain.isPaused = false;
	
	//--------------------------- PUBLIC METHODS:
	
	VPXMain.init = function()
	{ 	
		VPXInterface.init();	
		VPXData.init();
		VPXAudio.init();
	}
	
	//--------------------------- PRIVATE METHODS:
				

	//----------------------------------------------


window.VPXMain = VPXMain;
}(window));