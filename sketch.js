var img;
var octree;
var tempColor;
var emojiImages = ['0'];
var beep;

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
	createCanvas(640, 640);
	noStroke();
	noSmooth();
	
	octree = new Octree(new Vec3(0,0,0), new Vec3(256,256,256), 127);
	for (var i =0; i < emojis.length; i++){
  		octree.add(new Vec3(emojis[i][0], emojis[i][1], emojis[i][2]), emojis[i][3]);
	}
	
	//image(img,0,0,width,height);
}

function draw() {
	
	var iw = width/img.width;
	var ih = height/img.height;
	for ( var i = 0; i< img.width; i++){
		for ( var j = 0; j< img.height; j++){
			tempColor = img.get(i,j);
			if ( tempColor[3] !=0 ){
				var temp = octree.findNearestPoint(new Vec3(tempColor[0],tempColor[1],tempColor[2]));
				drawEmoji(i,j,'emojis/'+temp.data);
				//image( emojiImages[parseInt(temp.data.slice(0, -4))], i*iw, j*ih, iw, ih);
			}
		}
	}
	noLoop();
}

function drawEmoji(x,y,emoji){
	loadImage(emoji, function(a){
		var iw = width/img.width;
		var ih = height/img.height;
		image( a, x*width/img.width, y*height/img.height, iw, ih);
		
		//image( a, x*width/img.width, y*height/img.height, iw/2, ih/2);
		//image( a, x*width/img.width+iw/2, y*height/img.height, iw/2, ih/2);
		//image( a, x*width/img.width+iw/2, y*height/img.height+ih/2, iw/2, ih/2);
		//image( a, x*width/img.width, y*height/img.height+ih/2, iw/2, ih/2);
	});
}