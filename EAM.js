// This file ran through all the iOS 11 emojis taking the average color of each one
// the result was used in the emojis array located in emojivalues.js

var img;
var emojiValues = [];
var myRed= 0;
var myGreen= 0;
var myBlue= 0;
var counter= 0;

function preload() {
	//for (var i = 1; i< 2614; i++)
  		//img[i] = loadImage('emojis/'+i+'.png');
}

function setup() {
	noLoop();
	createCanvas(72, 72);
	
	//generateValues(1,100);
}

function draw() {
	//image(img, 0, 0);
}


function generateValues(a,b){
		loadImage('emojis/'+a+'.png', function(img){
			myRed= 0;
			myGreen= 0;
			myBlue= 0;
			counter= 0;
			
			for (var i =0; i<72;i++ ){
				for (var j =0; j<72;j++){
					var temp = img.get(i,j);
					if(temp[3] == 255){
						myRed += temp[0];
						myGreen += temp[1];
						myBlue += temp[2];
						counter++;
					}
				}
			}
			
			myRed /= counter;
			myGreen /= counter;
			myBlue /= counter;
			//emojiValues.push([myRed,myGreen,myBlue]);
			console.log( '[',myRed.toFixed(0),',',myGreen.toFixed(0),',',myBlue.toFixed(0),',', a+'.png',']',',',);
			if (a <b-1)
				generateValues(a+1,b);
	});
}