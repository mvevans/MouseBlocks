//this is a js file
/*
multi line comment
*/
//alert("ALERT");
numBlocks = 170;
mouse = {x: 0, y: 0};
mDown = 0;

function newColor(rgbString) {
    var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
    try{
		delete(parts[0]);
		//var j = Math.floor(Math.random() * 3) + 1;
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parseInt(parts[i]);
			if (parts[i] < 55) {
				parts[i]+=5;
			} else if (parts[i] > 200) {
				parts[i]-=5;
			} else {
				if(Math.random() < 0.5){
					parts[i]-=5;
				}else{
					parts[i]+=5;
				}
			}
		}
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parts[i].toString(16);
			if (parts[i].length == 1) parts[i] = '0' + parts[i];
		}
		return '#' + parts.join('').toUpperCase(); // "#0070FF
		
	}catch (err){
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}
}

function newBGColor(rgbString) {
    var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
    try{
		delete(parts[0]);
		//var j = Math.floor(Math.random() * 3) + 1;
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parseInt(parts[i]);
			if (parts[i] < 55) {
				parts[i]+=5;
			} else if (parts[i] > 200) {
				parts[i]-=5;
			} else {
				if(Math.random() < 0.5){
					parts[i]-=5;
				}else{
					parts[i]+=5;
				}
			}
		}
		return 'rgb(' + parts.join('')+');'; // "#0070FF
		
	}catch (err){
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}
}


function updateFunction() {
	//document.getElementById('xy').innerHTML = '('+mouse.x+','+mouse.y+')';
    for (var i = 0; i < numBlocks; i++) { //change color
        //document.getElementById('block_'+i).style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        document.getElementById('block_' + i).style.backgroundColor = newColor(document.getElementById('block_' + i).style.backgroundColor);
		var position = document.getElementById('block_' + i).getBoundingClientRect();
		var tempX = position.left+15;
		var tempY = position.top+15;
		if(mDown==0){
			var dist = Math.sqrt(Math.abs(Math.pow(tempY-mouse.y,2)+Math.pow(tempX-mouse.x,2)));
			if(dist < 15){
				document.getElementById('block_' + i).style.top = Math.floor(Math.random() * screen.height);
				document.getElementById('block_' + i).style.left = Math.floor(Math.random() * screen.width);
			}else{
				var ang = Math.atan2(mouse.y-tempY,mouse.x-tempX);
				//ang = Math.floor((Math.random()*(3.14/10))+ang-(3.14/10));
				var rand = (Math.floor(Math.random()*5)+7);
				//var dX = Math.floor(rand * ((mouse.x-tempX)/(Math.abs(mouse.x-tempX)+0.1)));
				//var dY = Math.floor(rand * ((mouse.y-tempY)/(Math.abs(mouse.y-tempY)+0.1)));
				var dX = Math.floor(rand * Math.cos(ang));
				var dY = Math.floor(rand * Math.sin(ang));
				document.getElementById('block_' + i).style.top = (tempY-15)+dY;
				document.getElementById('block_' + i).style.left = (tempX-15)+dX;
			}
		}else{
			if(tempX < 0 || tempX > screen.width || tempY < 0 || tempY > screen.height){
				document.getElementById('block_' + i).style.top = (Math.floor(Math.random()*60)+(mouse.y-60))+15;
				document.getElementById('block_' + i).style.left = (Math.floor(Math.random()*60)+(mouse.x-60))+15;
			}else{
				var ang = Math.atan2(tempY-mouse.y,tempX-mouse.x);
				//ang = Math.floor((Math.random()*(3.14/10))+ang-(3.14/10));
				var rand = (Math.floor(Math.random()*5)+7);
				//var dX = Math.floor(rand * ((mouse.x-tempX)/(Math.abs(mouse.x-tempX)+0.1)));
				//var dY = Math.floor(rand * ((mouse.y-tempY)/(Math.abs(mouse.y-tempY)+0.1)));
				var dX = Math.floor(rand * Math.cos(ang));
				var dY = Math.floor(rand * Math.sin(ang));
				document.getElementById('block_' + i).style.top = (tempY-15)+dY;
				document.getElementById('block_' + i).style.left = (tempX-15)+dX;
			}
		}
    }
    //document.getElementsByTagName('body')[0].bgColor = newBGColor(document.getElementsByTagName('body')[0].bgColor);
}
function load(){
	for (var i = 0; i < numBlocks; i++) {
		var iDiv = document.createElement("div");
		iDiv.setAttribute("id", 'block_' + i);
		iDiv.setAttribute("class", "block");
		iDiv.innerHTML = " ";
		iDiv.style.top = Math.floor(Math.random() * screen.height);
		iDiv.style.left = Math.floor(Math.random() * screen.width);
		iDiv.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		document.getElementsByTagName('body')[0].appendChild(iDiv);
	}
	document.addEventListener('mousemove', function(e){mouse.x = e.clientX || e.pageX; mouse.y = e.clientY || e.pageY}, false);
	document.addEventListener('mousedown',function(e){mDown=1});
	document.addEventListener('mouseup',function(e){mDown=0});
	//document.getElementById('block_1').innerHTML = document.getElementById('block_1').style.backgroundColor;
	//alert(document.getElementsByTagName('body')[0].bgColor);
	window.setInterval(updateFunction, 50);
	
}





window.addEventListener('load', load);