//Create variables here
var dog,happyDog,dogImg;
var database;
var foodS,foodStock;

function preload(){
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  //add styles here
  textSize(20);
  stroke('black');
  fill('aqua');
  text("Press up arrow to feed him some milk!", 80,60);
  text("Remaining Milk: " + foodS, 150, 420);
}

//function to read values from DB
function readStock(data){
  foodS = data.val();
  }
  
  //function to write values from DB
  function writeStock(x){
    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        Food : x,
      })
    }

