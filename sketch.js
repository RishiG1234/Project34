//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);
  foodObject = new Food();
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
}


function draw() {  
  background(46,139,87);
  foodObject.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+"pm",350,30)
  }
  else if(lastFed===0){
    text("Last Feed:12 AM",350,30)
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30);
  }
  drawSprites();
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites(); 
  //add styles here

}

function readStock(data) {
  foodS=data.val();
  foodObject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    food:foodObject.getFoodStock(),
    feedTime:hour()
  })
}

function addFoodS() {
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

