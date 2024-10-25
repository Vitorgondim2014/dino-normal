// var faz que criar uma coisa
var gameState = "play";
var gameOverimg,gameover;
var reiniciarimg,reiniciar;
var dinoMortoimg;
var trex,dino;
var chao,chaokk;
var chaoive;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;

var cactoGroup;
// um gropu de coisa
var nuvemGroup,nuvemkkk;

var pontos;


// colocar a imagem no jogo
function preload() {
  dino=loadAnimation("trex1.png","trex3.png","trex4.png");
  chaokk=loadImage("ground2.png");
  nuvemkkk=loadImage("cloud.png");
  cacto1=loadImage("obstacle1.png");
  cacto2=loadImage("obstacle2.png");
  cacto3=loadImage("obstacle3.png");
  cacto4=loadImage("obstacle4.png");
  cacto5=loadImage("obstacle5.png");
  cacto6=loadImage("obstacle6.png");
  gameOverimg=loadImage("gameOver.png");
  reiniciarimg=loadImage("restart.png");
  dinoMortoimg=loadImage("trex_collided.png");
}
////////////////////////////////////////////////

// esse e fuçao setup ela faz que defini os componentes

function setup() {
  createCanvas(600, 200);


  // esse é o creteS ele faz mudar aposiçao é tamanho
  chaoive = createSprite(200,190,400,10);
  chaoive.visible = false;

gameover = createSprite(300,100);
gameover.addImage("gameove",gameOverimg);

reiniciar = createSprite(300,140);
reiniciar.addImage("rein",reiniciarimg)
reiniciar.scale = 0.5;




  //                   x    y  lar  alutu
  chao = createSprite(200,180,400,20);
  chao.addImage("terra",chaokk);
  chao.x = chao.width/2;
  chao.velocityX = -6;
  //                x    y  lar  alutu
  trex = createSprite(50,180,20,50);
  trex.addAnimation("corre",dino);
  trex.addAnimation("colisão",dinoMortoimg);

  trex.scale=0.5;
 
  nuvemGroup=new Group();
  cactoGroup=new Group();
  // ele detecta a colisão
  trex.setCollider("rectangle",0,0,87,80);
  trex.debug = false;

 pontos = 0;
}

// esse é o fuçao draw ele faz que execute um comando sem para

function draw() {
  background("white");

  textFont("Arial Black");
  text("pontuação: "+ pontos,500,50);
    // ele só fuciona quando se tiver vedadeira
  if (gameState == "play"){
    pontos = pontos+Math.round(getFrameRate()/60)
    reiniciar.visible = false;
    gameover.visible = false;
    if(keyDown("space") && trex.y >= 150) {
      trex.velocityY = -12;
 }
  // gravidade
trex.velocityY = trex.velocityY + 0.8;
if (chao.x < 0) {
  chao.x = chao.width/2;
}
trex.collide(chaoive);
gerarNuvens();
gerarCactos();

if (cactoGroup.isTouching(trex)) {
    gameState = "end";
}
}

else if (gameState == "end") {
  reiniciar.visible = true;
  gameover.visible = true;
chao.velocityX = 0;
trex.velocityY = 0;
cactoGroup.setVelocityXEach(0);
nuvemGroup.setVelocityXEach(0);
trex.changeAnimation("colisão");
cactoGroup.setLifetimeEach(-1);
nuvemGroup.setLifetimeEach(-1);
if(mousePressedOver(reiniciar)) {
reset();

}
}
  

// esse faz desenhar coisas, por exeplor desenhar um trex
  drawSprites(); 
  

}


/////////////////////////////////////////////

// esse é para definir o respawn de nuvem por segundo
function gerarNuvens(){
if(frameCount%60==0){

var nuvem = createSprite(600,120,40,10);

nuvem.addImage("nuvemvoado",nuvemkkk);

nuvem.scale = 0.5;

nuvem.velocityX = -3;

// math.round é para colocar coisas entre o inicio é o fim, por explrpo 80,120 a nuvem vai parace entre 80 e 120
nuvem.y = Math.round(random(80,120));

// mudar a fudidade
nuvem.depth = trex.depth;

// deixar trex na fentre. +1 na frete, -1 na tras
trex.depth = trex.depth+1;

// add um coisas no grupo
nuvemGroup.add(nuvem);
// tempo de vida para coisas
nuvem.lifetime=220;
}
}

function gerarCactos(){
  if(frameCount%60==0){
  var cacto =  createSprite(600,165,10,40);

cacto.velocityX = -6;

var Aleatorio = Math.round(random(1,6));

cactoGroup.add(cacto);

// switch sinica interruptor
switch (Aleatorio){
// 6 casos
  case 1: cacto.addImage(cacto1);
  break;

  case 2: cacto.addImage(cacto2);
  break;

  case 3: cacto.addImage(cacto3);
  break;

  case 4: cacto.addImage(cacto4);
  break;

  case 5: cacto.addImage(cacto5);
  break;
 
  case 6: cacto.addImage(cacto6);
  break;
// dar uma pausa
  default:break;
}
cacto.scale = 0.5;

cacto.lifetime = 220;



}
}
function reset(){
gameState = "play";
gameover.visible = false;
reiniciar.visible = false;
cactoGroup.destroyEach();
nuvemGroup.destroyEach();
trex.changeAnimation("corre")
chao.velocityX = -6
pontos = 0;
}
