var tower,towerimage
var door,doorimage,doorG;
var ghost,ghostimage;
var climber,climberimage,climberG
var invisibleblock,invisibleG;
var gamestate="play";
var spookysound;

function preload(){
towerimage=loadImage("tower.png"); 
doorimage=loadImage("door.png");
//ghostimage=loadImage("ghost-jumping.png");
ghostimage=loadImage("ghost-standing.png");
climberimage=loadImage("climber.png");
  spookysound=loadSound("spooky.wav")
}


function setup() {
  createCanvas(600, 600);
  spookysound.loop();
  tower=createSprite(300,300,20,20);
  tower.addImage(towerimage);
  tower.velocityY=1;
  ghost=createSprite(300,300,10,10);
  ghost.addImage(ghostimage);
  ghost.scale=0.4;
  doorG=new Group();
  climberG=new Group();
  invisibleG=new Group();
}

function draw() {
  background(0);
  if(gamestate==="play"){
   tower.velocityY=1;
  if(tower.y>600){
  tower.y=300;
  }
 if(keyDown("space")){
  ghost.velocityY=-10;
   }
  ghost.velocityY=ghost.velocityY+1;
  if(keyDown("left")){
  ghost.x=ghost.x-10;
   }
  if(keyDown("right")){
  ghost.x=ghost.x+10;
   }
  
  spawndoor();
  if(climberG.isTouching(ghost)){
   ghost.velocityY=0;
  }
    if(invisibleG.isTouching(ghost)||ghost.y>600){
      gamestate="end"
    }
  }
  if(gamestate==="end"){
    
    ghost.destroy();
    climberG.destroyEach();
    invisibleG.destroyEach();
    doorG.destroyEach();
    tower.destroy();
    stroke("yellow");
    fill("yellow"); 
    textSize(30); 
    text("GameOver", 230,250)
    
  }
  drawSprites(); 
}
function spawndoor(){
if(frameCount%240===0){
 door=createSprite(200,-50,10,10) 
 door.addImage(doorimage);
climber=createSprite(200,10,10,10) 
 climber.addImage(climberimage);
invisibleblock=createSprite(200,15);
door.x=random(120,400);
climber.x=door.x;
invisibleblock.x=door.x;
door.velocityY=1;
climber.velocityY=1;
invisibleblock.velocityY=1;
  door.lifetime=600;
  invisibleblock.lifetime=600;
  climber.lifetime=600;
  doorG.add(door);
  climberG.add(climber);
  invisibleG.add(invisibleblock);
  //invisibleblock.visible=false;
  invisibleblock.debug=true;
  invisibleblock.width=climber.width;
  invisibleblock.height=2;
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
}  
  
}

