p5.disableFriendlyErrors = true;

var img;
var octree;
var emojiImages = ['0'];
var imgURL;
var eSize;
var density = 64;
var loaded = 0;

function preload() {
  	img = loadImage('emojis/' +(floor(random(2613))+1)+ '.png');
	//img = loadImage('rocio.png');
	//loadEmojis(1);

}

function loadEmojis(a){
	if (a<2614){
		emojiImages.push(loadImage('emojis/'+ a + '.png', function(){
			loaded++;
			if (loaded%26==0)
				document.getElementById("p5_loading").innerHTML = "Loading... " + Math.floor(loaded*100/2613)+"%";
			}));
		loadEmojis(a+1);
	}
}

function setup() {
	createCanvas(floor(min(window.innerWidth*.9,640)),
				 floor(min(window.innerHeight -document.getElementById("instructions").offsetHeight,640)) ).drop(gotFile);
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
	var d = pixelDensity();
	fill(255);
	rect(0,0,width,height);
	
	var scale = min( width/img.width, height/img.height)
	var iw = img.width*scale;
	var ih = img.height*scale;

	var x1 = width-iw -(width-iw)/2;
	var y1 = height-ih -(height-ih)/2;
	image(img,x1,y1,iw,ih);
	
	loadPixels();
	for ( var i = y1; i< ih+y1; i+=eSize){
		for ( var j = x1; j< iw+x1; j+=eSize){
			var idx = 4 * ((Math.floor(i)*d) * width*d + (Math.floor(j)*d));
			var temp = octree.findNearestPoint(new Vec3(pixels[idx],pixels[idx+1],pixels[idx+2]));
			drawEmoji(j,i,'emojis/'+temp.data);
			//image( emojiImages[parseInt(temp.data.slice(0, -4))], j-eSize/2, i-eSize/2, eSize*2, eSize*2);
		}
	}
	noLoop();
}

function drawEmoji(x,y,emoji){
	loadImage(emoji, function(a){
		image( a, x-eSize/2, y-eSize/2, eSize*2, eSize*2);
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