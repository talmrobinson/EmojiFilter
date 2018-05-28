var img;
var octree;
var emojiImages = ['0'];
var imgURL;
var eSize;
var density = 64;

function preload() {
  	img = loadImage('emerald/' +(floor(random(386))+1)+ '.png');
	//img = loadImage('rocio.png');
	//loadEmojis(1);

}

function loadEmojis(a){
	if (a<2614){
		emojiImages.push(loadImage('emojis/'+ a + '.png'));
		loadEmojis(a+1);
	}
}

function setup() {
	createCanvas(min(window.innerWidth*.9,640),
				 min(window.innerHeight -document.getElementById("instructions").offsetHeight,640) ).drop(gotFile);
	eSize = (width > height?height:width)/density;
	noStroke();
	noSmooth();
	
	octree = new Octree(new Vec3(0,0,0), new Vec3(256,256,256), 0);
	for (var i =0; i < emojis.length; i++){
  		octree.add(new Vec3(emojis[i][0], emojis[i][1], emojis[i][2]), emojis[i][3]);
	}
	
	//image(img,0,0,width,height);
}

function draw() {
	fill(255);
	rect(0,0,width,height);
	
	if(img.width>img.height){
		var iw = width;
		var ih = (width/img.width)*img.height;
	}else{
		var iw =(height/img.height)*img.width;
		var ih = height;	
	}
	
	
	var x1 = width-iw -(width-iw)/2;
	var y1 = height-ih -(height-ih)/2;
	image(img,x1,y1,iw,ih);
	
	var tempColor;
	for ( var i = 0; i< iw; i+=eSize){
		for ( var j = 0; j< ih; j+=eSize){
			tempColor = get(x1+i,y1+j);
			if ( tempColor[3] !=0  ){
				var temp = octree.findNearestPoint(new Vec3(tempColor[0],tempColor[1],tempColor[2]));
				drawEmoji(x1+i,y1+j,'emojis/'+temp.data);
				//image( emojiImages[parseInt(temp.data.slice(0, -4))], i*iw, j*ih, iw, ih);
			}
		}
	}
	noLoop();
}

function drawEmoji(x,y,emoji){
	loadImage(emoji, function(a){
		image( a, x-eSize/2, y-eSize/2, eSize*2, eSize*2);
		
		//image( a, x, y, eSize/2, eSize/2);
		//image( a, x+eSize/2, y, eSize/2, eSize/2);
		//image( a, x+eSize/2, y+eSize/2, eSize/2, eSize/2);
		//image( a, x, y+eSize/2, eSize/2, eSize/2);
	});
}

function gotFile(file) {
  // If it's an image file
  console.log(file);
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img = createImg(file.data, redraw).hide();
  } else {
    console.log('Not an image file!');
  }
}

function fileUpload() {
    img = createImg(URL.createObjectURL(document.getElementById("myFile").files[0]), redraw).hide();
	
	//free up URL
	URL.revokeObjectURL(URL.createObjectURL(document.getElementById("myFile").files[0]));
	//Thanks pimvdb
	//https://stackoverflow.com/questions/6775767/how-can-i-draw-an-image-from-the-html5-file-api-on-canvas
}