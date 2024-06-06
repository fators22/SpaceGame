/**
 * Lab Goal: This lab was designed to teach you
 * how to find collisions with many objects
 * 
 * Lab Description: Detect Collision
 */
// Initialize variables
var bg1={x:0, y:0, w:320, h:450, s:2, img:"bg1"};
var bg2={x:-320, y:0, w:320, h:450, s:2, img:"bg2"};
//asteroids
var a1 =  {x:0, y: -70, h: 50, w: 50, s: 4, img: "a1"};
var a2 = {x:100, y: -70, h: 50, w: 50, s: 7, img: "a2"};
var a3 = {x:250, y: -70, h: 50, w: 50, s: 9, img: "a3"};
var a4 = {x:250, y: -70, h: 50, w: 50, s: 9, img: "a4"};
var a5 = {x:250, y: -70, h: 50, w: 50, s: 9, img: "a5"};

var e1 = {x:50, y: -70, h: 50, w: 50, s:4, img: "e1"};
var e2 = {x:150, y: -70, h: 30, w: 30, s:7, img: "e2"};
var e3 = {x:270, y: -70, h: 30, w: 30, s:9, img: "e3"};
var e4 = {x:300, y: -70, h: 30, w: 30, s:9, img: "e4"};
var e5 = {x:100, y: -70, h: 30, w: 30, s: 9, img: "e5"};

var spaceObjects=[a1, a2, a3, a4, a5 ];
var meteors=[e1, e2, e3, e4, e5 ];
//rocket
var r= {x:100, y:270, w:50, h:100, s:5, img:"rocket"};
var score = 0, maxScore=30;


//Moving background
drawBackground();
drawElements();


//list ii
timedLoop(100, function() {
   scrollBg();
  moveObjects(spaceObjects, "good");
  moveObjects(meteors, "bad");

});
function moveObjects(list, isGood) {
  var points=-3;
  if(isGood=="good"){
    points=2;
    
  }
  for(var i=0; i<list.length; i++){
      var ast=list[i]; 
      ast.y = ast.y + ast.s;
    
      setPosition(ast.img, ast.x, ast.y, ast.w, ast.h);
      if(ast.y>=450){
        ast.y= -50;
        ast.x= randomNumber(0,320);
      }
      checkCollision (r, ast, points);
        
  }
 
}



function drawBackground (){
 setImageURL(bg1.img, "assets/6062b.png");
 setImageURL(bg2.img, "assets/6062a.png");
 setProperty(bg1.img, "fit", "cover");
 setProperty(bg2.img, "fit", "cover");
 setStyle(bg1.img, "z-index", "0");
 setStyle(bg2.img, "z-index", "0");
}
//Assinging asteroids to the screen
function drawElements(){
 for(var i=0; i<spaceObjects.length; i++){
    setImageURL(spaceObjects[i].img, "assets/rock.png");
    setPosition(spaceObjects[i].img, spaceObjects[i].x, spaceObjects[i].y, spaceObjects[i].w, spaceObjects[i].h);
 }
  for(var j=0; j<meteors.length; j++){
    setImageURL(meteors[j].img,  "assets/meteor.png");
        setPosition(meteors[j].img, meteors[j].x, meteors[j].y);
 }
 
   setImageURL(r.img, "assets/rocket.gif");
   setPosition(r.img, r.x, r.y, r.w, r.h);

  textLabel("score", "Score: "+score);
  
    
}
function scrollBg(){
  bg1.x=bg1.x+bg1.s;
  bg2.x=bg2.x+bg2.s;
  setPosition(bg1.img, bg1.x, bg1.y, bg1.w, bg1.h);
  setPosition(bg2.img, bg2.x, bg2.y, bg2.w, bg2.h);
  if(bg1.x>=bg1.w){
   bg1.x=-bg1.w; 
  }
  
  if(bg2.x>=bg2.w){
   bg2.x=-bg2.w; 
  }
}





//Moving the rocket
onEvent("screen1", "keydown", function(event) {
  if (event.key === "Left") {
    r.x = r.x - 10; // Move the rocket left
  }
  if (event.key === "Right") {
    r.x = r.x + 10; // Move the rocket right
    }
  if (event.key === "Down") {
    r.y = r.y + 10; // Move the rocket down
    }
  if (event.key === "Up") {
    r.y = r.y - 10; // Move the rocket up
    }
   setPosition(r.img, r.x, r.y, 50, 100);
});

//Moving asteroids



function startOver(obj1){
  obj1.x = randomNumber(10,300);
  obj1.y = randomNumber(-50,-20);
  obj1.s = randomNumber(3,8);
  setPosition(obj1.img, obj1.x, obj1.y, obj1.w, obj1.h);
  setText("score", "Score: "+score);
}
function checkCollision (obj1, obj2, point){
  //console.log (typeof(obj1)!=typeof(obj2));
  
  var xOv= Math.max(0, (Math.min(obj1.x+obj1.w-10, obj2.x+obj2.w-10)-Math.max(obj1.x+10, obj2.x+10))+1);
  var yOv= Math.max(0, (Math.min(obj1.y+obj1.h, obj2.y+obj2.h)-Math.max(obj1.y, obj2.y))+1);
  
  if (xOv>0 && yOv>0){
   //collision resolution
    score=score+point;
    setText("score", "Score: "+score);
    if(score>= maxScore){
      stopTimedLoop();
    }
    startOver(obj2);
      
  }
}
  

