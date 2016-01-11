
/**

Author: Kevin Loughran
Project: VPX HTML5
Class: VPX js document

**/

(function(window)
{

	//--------------------------- CONSTRUCTOR:
	
	var VPXData = function()
	{
		
	}
	
	//--------------------------- CONSTANTS:
	
	var STATE_DATA_URL = 'xml/states_data.xml';
	var TEAMS_DATA_URL = 'xml/teams_data.xml';
	
	//--------------------------- VARIABLES:
	
	var stateData = [];
	var teamsData = [];
	
	//--------------------------- PUBLIC METHODS:
	
	VPXData.init = function()
	{ 		
		Utility.GetXml( STATE_DATA_URL, onStateDataLoaded);
		Utility.GetXml( TEAMS_DATA_URL, onTeamsDataLoaded);
	}
	
	VPXData.getStateTeams = function(id)
	{
		var teams = stateData[id]['teams'];
		var teamList = [];
		
		if(teams)
		{
			teamList = teams.split(', ');
		}
		else
		{
			teamList = null;
		}
		
		return teamList;
	}
	
	VPXData.getStateData = function(id)
	{
		return stateData[ id ];
	}
	
	VPXData.getTeamData = function(id)
	{
		return teamsData[ id ];
	}
	
	//--------------------------- GETTERS / SETTERS:
	

	
	//--------------------------- PRIVATE METHODS:
	
	function onStateDataLoaded(xmlData)
	{
		$(xmlData).find('state').each(function()
		{
			var name = $(this).find('name').text();
			if(name == 'District of Columbia')
			{
				name = 'Washington, D.C.';
			}
			
			stateData[ name ] = [];
			
			var teams = $(this).find('teams').text();
			stateData[ name ]['teams'] = teams;
			
			var desc = $(this).find('text').text();
			stateData[ name ]['desc'] = desc;
			
			var link = $(this).find('link').text();
			stateData[ name ]['link'] = link;
			
			var youtube = $(this).find('youtube').text();
			stateData[ name ]['youtube'] = youtube;
			
			/// FTO
			if(teams)
			{
				var teamArr = teams.split(', ');
				//console.log( name + ' : ' + teamArr.length );
			}
			
		});
	}

	function onTeamsDataLoaded(xmlData)
	{
		$(xmlData).find('team').each(function()
		{
			var name = $(this).find('name').text();

			var teamArr = [];
			teamArr['logo'] = $(this).find('logo').text();
			teamArr['detail1'] = $(this).find('detail1').text();
			teamArr['detail2'] = $(this).find('detail2').text();
			teamArr['detail3'] = $(this).find('detail3').text();
			teamArr['detail4'] = $(this).find('detail4').text();
			teamArr['detail5'] = $(this).find('detail5').text();
			teamArr['caption'] = $(this).find('caption').text();
			teamArr['desc'] = $(this).find('text').text();
			
			teamsData[ name ] = teamArr;
						
		});

	}

	//--------------------------- UTILITIES:
	

	//----------------------------------------------

window.VPXData = VPXData;
}(window));