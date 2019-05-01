Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Move  Forward");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['left'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Turn Left");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['right'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Turn Right");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


goog.provide('Blockly.JavaScript.forward');
goog.provide('Blockly.JavaScript.left');
goog.provide('Blockly.JavaScript.right');

Blockly.JavaScript['forward'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  //var code = 'direction = RIGHT; rabbitDraw()';
  var code = 'moveForward();';
  return code;
};

Blockly.JavaScript['left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
 // var code = 'direction = RIGHT; rabbitDraw()';
  return code;
};

Blockly.JavaScript['right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  //var code = 'direction = RIGHT; rabbitDraw()';
  return code;
};

function moveForward(){	
	q.push(direction);
	if (standby){
		
		standby = false;
		console.log(direction);
		switch(direction){
			case UP: 	ybound = Math.max(0,y-60); 
						rabbit2up();
						break;
			case DOWN: 	ybound = Math.min(canvas.height-frameHeight,y+60); 
						rabbit2down();
						break;
			case LEFT: 	xbound = Math.max(0,x-60); 
						rabbit2left();
						break;
			case RIGHT: xbound = Math.min(canvas.width-frameWidth,x+60); 
						rabbit2right();
						break;
			}
	}
}
function speak(src) {
	var i, node;
	var arr = src.split(",");
	var aDiv = document.getElementsByClassName("lotto");
	for(i=0;i<6;i++){
		node = document.createTextNode(arr[i]);
		aDiv[i].appendChild(node);
	}
	document.getElementById("speak").autoplay = true;
	document.getElementById("speak").src = "http://translate.google.com/translate_tts?ie=utf-8&tl=zh-tw&client=tw-ob&q=" + src;
}