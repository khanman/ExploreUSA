var Utility={};
Utility.timestampUsed;
Utility.timestampRemaining;

Utility.GetXml = function(sFilePath,callback){
	//alert("Utility.GetXml: sFilePath: "+sFilePath);
    var oData;
    $.ajax({
        async: false,
        type: "GET",
        url: sFilePath,
        dataType: (jQuery.browser.msie) ? 'text' : 'xml',
        success: function(data){
            oData=Utility.GetSupportableFormat(data);
			//alert("Utility.GetXml: callback: "+callback);
            return callback(oData);
        },
        error: function(){
			//alert("Utility.GetXml: error");
            oData=null;
        }
      });
      
      return oData;
};

Utility.GetHtml = function(sFilePath,callback){
    var oData;
    $.ajax({
        async: false,
        type: "GET",
        url: sFilePath,
        dataType: 'html',
        success: function(data){
            oData=data;
            return callback(oData);
        },
        error: function(){
            oData=null;
        }
      });
      
      return oData;
};

Utility.GetSupportableFormat = function(data){
    var xml; 
    if ( typeof data == 'string') { 
        xml = new ActiveXObject( 'Microsoft.XMLDOM'); 
        xml.async = false; 
        xml.loadXML( data); 
    } else { 
        xml = data; 
    } 
    return xml;
};

Utility.GetCDATA = function(ContentNode){
    var data;
    if($.browser.msie) data=ContentNode[0].text;
    else data=ContentNode[0].textContent;
    return data;
}

Utility.GetQueryString = function() {
	//USE: // var myParam = getQueryString()["myParam"];				
	var result = {}, queryString = location.search.substring(1),
		re = /([^&=]+)=([^&]*)/g, m;
	
	while (m = re.exec(queryString)) {
		result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	
	return result;
}

Utility.Shuffle = function( arrayToShuffle ){
	var a;
	var b;
	for(var i = 0; i < arrayToShuffle.length; i++){
		a = arrayToShuffle[i];
		b = parseInt(Math.random()* arrayToShuffle.length);
		//alert(b);
		arrayToShuffle[i] = arrayToShuffle[b];
		arrayToShuffle[b] = a;
	}
	
	return arrayToShuffle;
}

Utility.UpdateGameTime = function(){
	
	var now = new Date();
	var timeUsed;
	var timeLeft;
	
	//alert("endTime: "+endTime);
	if (endTime){
		timeLeft = endTime - now.getTime();
		//alert(".timeLeft: "+timeLeft);
	}else{
		if (numSecondsPerRound){
			timeLeft = numSecondsPerRound*1000;
			//alert("..numSecondsPerRound: "+numSecondsPerRound);
			//alert("..timeLeft: "+timeLeft);
		}
	}	
	
	if (startTime){
		timeUsed = now.getTime() - startTime;
	}			

	//Converting the remaining time into seconds, minutes, hours, and days
	var secondsRemaining = Math.floor(timeLeft / 1000);
	var minutesRemaining = Math.floor(secondsRemaining / 60);

	//Converting the time used into seconds, minutes, hours, and days
	//var secondsUsed:Number = Math.floor(timeUsed / 1000); // Made this a global var so running Time calc can use it
	secondsUsed = secondsUsed_raw = Math.floor(timeUsed / 1000);
	minutesUsed = Math.floor(secondsUsed / 60);

	//Storing the remainder of this division problem
	secondsUsed %= 60;
	secondsUsed += 1;
	minutesUsed %= 60;	
	
	//Storing the remainder of this division problem
	secondsRemaining %= 60;
	minutesRemaining %= 60;
	
	//Converting numerical values into strings so that
	//we string all of these numbers together for the display
	var sec_r = secondsRemaining.toString();
	var min_r = minutesRemaining.toString();
	
	
	//Setting up a few restrictions for when the current time reaches a single digit
	if (sec_r.length < 2) {
		sec_r = "0" + sec_r;
	}
	
	var timestampRemaining = Utility.timestampRemaining = min_r+":"+sec_r;

	if (minutesUsed > 99){
		clearInterval(gameTimer);// or roundTimer ?
	}

	//Converting numerical values into strings so that
	//we string all of these numbers together for the display	
	var useSecUsed = secondsUsed;
	var useMinUsed = minutesUsed;
	if (useSecUsed == 60){
		useSecUsed = 0;
		useMinUsed += 1;
	}
	var sec_u = useSecUsed.toString();
	var min_u = useMinUsed.toString();		

	if (min_u.length < 2) {
		min_u = "0" + min_u;
	}
	if (sec_u.length < 2) {
		sec_u = "0" + sec_u;
	}
	var timestampUsed = Utility.timestampUsed = min_u+":"+sec_u;
	
	if (countDir == "up"){
		document.getElementById("Timer_time").innerHTML = timestampUsed;
	}else{
		document.getElementById("Timer_time").innerHTML = timestampRemaining;
		if ((minutesRemaining == 0) && (secondsRemaining == 0)){
			onTimeUp();	
		}
		
	}	
	

}

Utility.FadeOut = function(element){	
	$(element).animate({
		opacity:0,}, 500, function() {//anim complete
	});
}
Utility.FadeIn = function(element){
	$(element).animate({
		opacity:1,}, 500, function() {//anim complete
	});
}

Utility.Rotate = function(element, rotAmt){
	$(element).css({
  '-webkit-transform' : 'rotate('+rotAmt+'deg)',
     '-moz-transform' : 'rotate('+rotAmt+'deg)',  
      '-ms-transform' : 'rotate('+rotAmt+'deg)',  
       '-o-transform' : 'rotate('+rotAmt+'deg)',  
          'transform' : 'rotate('+rotAmt+'deg)',  
               'zoom' : 1

    });
}

var isIE = document.all ? true : false;
Utility.GetMousePosition = function(evt) {
	var _x;
	var _y;
	if (!isIE) {
		_x = evt.pageX;
		_y = evt.pageY;
	}
	if (isIE) {
		_x = evt.clientX + document.body.scrollLeft;
		_y = evt.clientY + document.body.scrollTop;
	}
	posX = _x;
	posY = _y;
        var  pos=Array(posX,posY);
	return pos;
}

Utility.True = function(val){
	if ( (val == true) || (val == "true") ) return true;
	return false;
}

Utility.IsNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


Utility.SetDevice = function(){
	//alert("navigator.platform: "+navigator.platform);
    if ((navigator.platform == 'iPhone') || (navigator.platform == 'iPod') || (navigator.platform == 'iPad')) {
        iTouch=true;
    }else{
        iTouch=false;
    }
}

Utility.Fix_iPadLabels = function () {
	
	function fix() {
		var labels = document.getElementsByTagName('label'),
		target_id,
		el;
		//alert("labels.length: "+labels.length);
		for (var i = 0; labels[i]; i++) {
			//alert("labels[i].getAttribute('for'): "+labels[i].getAttribute('for'));
			if (labels[i].getAttribute('for')) {
				labels[i].onclick = labelClick;
			}
		}
	};
	
	function labelClick() {
		el = document.getElementById(this.getAttribute('for'));
			if (['radio', 'checkbox'].indexOf(el.getAttribute('type')) != -1) {
				el.setAttribute('selected', !el.getAttribute('selected'));
			} else {
				el.focus();
			}
		};
	
	fix();

}

Utility.IsImage = function(srcStr){
	if (srcStr.toLowerCase().indexOf(".png") > -1) return true;
	if (srcStr.toLowerCase().indexOf(".jpg") > -1) return true;
	if (srcStr.toLowerCase().indexOf(".jpeg") > -1) return true;
	if (srcStr.toLowerCase().indexOf(".gif") > -1) return true;
	if (srcStr.toLowerCase().indexOf(".bmp") > -1) return true;
	return false;
}

Utility.Hexc = function(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

Number.prototype.toHHMMSS = function() {
	d = this;
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s); 
}

Utility.RandInRange = function(upperRange, lowerRange){
	return Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange;
}

Utility.CoinToss = function(){
	return Math.floor( Math.random() * 2 ) == 1;
}

// Activity Common Code ......................

Utility.SetupWWUSACompletionHack = function(){
	var hacks = document.createElement("div");
	$(hacks).attr("id", "WWUSA_Hacks");
	hacks.innerHTML = '<div id="WWUSA_Hacks">TEMPORARY: FOR DEBUG & DEV REVIEW: <br><a href="javascript:Utility.RestoreWWUSA(false, 0);">Return to Map</a> with NO score awarded<br><a href="javascript:Utility.RestoreWWUSA(true, 0);">Return to Map</a> WITH score awarded</div>';
	document.body.appendChild(hacks);
	//alert((onCompleteURL));
	if (onCompleteURL){
		$(hacks).show();
	}else{
		$(hacks).hide();
	}

}

Utility.RestoreWWUSA = function(awardScore, delay){ 
	var useDelay = ((delay != undefined) && (delay != null)) ? delay:2000;
	genDelay = setInterval(function() { clearInterval(genDelay); self.location.href = onCompleteURL + "&awardScore="+awardScore; },useDelay);
}