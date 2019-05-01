var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
    grid:{
		spacing: 20,
        length: 20,
        colour: '#ccc',
        snap: true
		},
	trashcan: true,
	zoom:{
		controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
		},
     }
	);


function run(){
		Blockly.JavaScript.addReservedWords('code');
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		try {
			eval(code);
		} catch (e) {
		alert(e);
		}
}

/*function saveWorkspace(){
		var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
		//alert(xmlText);
		localStorage.setItem("blockly.xml", xmlText);
	
}

function restoreWorkspace(){
		var xmlText = localStorage.getItem("blockly.xml");
		if(xmlText){
			Blockly.mainWorkspace.clear();
			xmlDom = Blockly.Xml.textToDom(xmlText);
			Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xmlDom);
		}
	
}*/
	
document.getElementById("run").addEventListener("click",run);
/*document.getElementById("save").addEventListener("click",saveWorkspace);
document.getElementById("restore").addEventListener("click",restoreWorkspace);
*/
/*var arr, i, result, j, position, num;

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}*/

/*
arr = [];
for (i = 1; i <= 49; i++) {
  arr[(i - 1)] = i;
}
result = [];
for (j = 1; j <= 6; j++) {
  position = mathRandomInt(1, arr.length);
  num = arr.splice((arr - 1), 1)[0];
  result[(j - 1)] = num;
}
window.alert(result);
*/
function saveWorkspace(){
	var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	console.log(xmlText);
	localStorage.setItem("blockly.xml",xmlText);
}
function restoreWorkspace(){
	var xmlText = localStorage.getItem("blockly.xml");
	if(xmlText){
		Blockly.mainWorkspace.clear();
		xmlDom = Blockly.Xml.textToDom(xmlText);
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
	}
}
document.getElementById("save").addEventListener("click",saveWorkspace);
document.getElementById("restore").addEventListener("click",restoreWorkspace);

function importXML(){
	var ajax = new XMLHttpRequest();
	ajax.open("GET","lottoSave.xml",false);
	ajax.onreadystatechange = function()
	{
		if (ajax.readyState === 4)
		{
			if(ajax.status === 200 || ajax.status == 0)
			{
				var xmlText = ajax.responseType;
				if(xmlText)
				{
					Blockly.mainWorkspace.clear();
					xmlDom = Blockly.Xml.textToDom(xmlText);
					Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
				}
			}
		}
	}
	ajax.send(null);
}

//document.getElementById("import").addEventListener("click",importXML);

var canvas = document.getElementById("rabbitCanvas");
var ctx = canvas.getContext("2d");
var img = new Image(); 

img.addEventListener('load', rabbitStandBy);
img.src = "rabbit2.png";
var frameWidth = 74;
var frameHeight = 40;
var frameNum = 22 , speed = 10;
var x=y=0, ox=oy=0;
var pointer,counter = 0;
const STANDBY = 0,UP = 1, DOWN = 3, LEFT =4, RIGHT = 2;
var direction = RIGHT;
var standby = true;
var xbound = canvas.width - frameWidth;
var ybound = canvas.height - frameHeight;
var q = [];

function rabbitDraw(){
	if(standby) rabbitStandBy();
	else{
		switch(direction){
		case UP: 	rabbit2up();
					break;
		case DOWN:  rabbit2down();
					break;
		case LEFT:  rabbit2left();
					break;
		case RIGHT: rabbit2right();
					break;
		}
	}
}
function rabbitStandBy(){
	ctx.clearRect(x,y,frameWidth, frameHeight);
	pointer = Math.floor(((++counter)%(frameNum*speed))/speed);
	ctx.drawImage(img,pointer*frameWidth,0,frameWidth,frameHeight,x,y,frameWidth,frameHeight);
	requestAnimationFrame(rabbitStandBy);
}

function rabbit2left(){
	ctx.save();
	//ctx.scale(-1,1);
	ctx.clearRect(ox,oy,frameWidth, frameHeight);
	pointer = Math.floor(((++counter)%(frameNum*speed))/speed);
	//ctx.rotate(Math.PI/4);
	ctx.drawImage(img,pointer*frameWidth,0,frameWidth,frameHeight,x,y,frameWidth,frameHeight);
	ctx.restore();	
	ox=x;
	oy=y;
	//if(x<canvas.width) x++;
	if(x>xbound) {x--;requestAnimationFrame(rabbitDraw);}
	else {standby = true;}
	//else direction =UP;
	
}
function rabbit2right(){
	
	ctx.save();
	ctx.scale(-1,1);
	ctx.clearRect(-ox-frameWidth,oy,frameWidth, frameHeight);
	pointer = Math.floor(((++counter)%(frameNum*speed))/speed);
	//ctx.rotate(Math.PI/4);
	ctx.drawImage(img,pointer*frameWidth,0,frameWidth,frameHeight,-x-frameWidth,y,frameWidth,frameHeight);
	ctx.restore();	
	ox=x;
	oy=y;
	//if(x<canvas.width) x++;
	if(x<xbound) {x++;requestAnimationFrame(rabbitDraw);}
	else{standby = true;}
	//else direction = DOWN;
	//requestAnimationFrame(rabbitDraw);
}
function rabbit2up(){
	ctx.save();
	//ctx.scale(-1,1);
	ctx.clearRect(-ox,oy,frameWidth, frameHeight);
	pointer = Math.floor(((++counter)%(frameNum*speed))/speed);
	//ctx.rotate(Math.PI/4);
	ctx.drawImage(img,pointer*frameWidth,0,frameWidth,frameHeight,x,y,frameWidth,frameHeight);
	ctx.restore();	
	ox=x;
	oy=y;
	//if(x<canvas.width) x++;
	if(y>ybound) {
		y--;
		requestAnimationFrame(rabbitDraw);
	}
	else {
		standby = true;
	}
	//else direction = RIGHT;
	
}
function rabbit2down(){
	ctx.save();
	//ctx.scale(-1,1);
	ctx.clearRect(ox,oy,frameWidth, frameHeight);
	pointer = Math.floor(((++counter)%(frameNum*speed))/speed);
	//ctx.rotate(Math.PI/4);
	ctx.drawImage(img,pointer*frameWidth,0,frameWidth,frameHeight,x,y,frameWidth,frameHeight);
	ctx.restore();	
	ox=x;
	oy=y;
	//if(x<canvas.width) x++;
	if(y<ybound) {y++;requestAnimationFrame(rabbitDraw);}
	else {if (q.pop()) standby = true;}
	//else direction = LEFT
	//requestAnimationFrame(rabbitDraw);
}
