var fish = [];
var badfish = [];
var bubbles = [];

var k = 0; //k is the variable that defines the keyPressed function

function preload() {
  bluu = loadFont('assets/BluuNext-Bolditalic.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //setup bubbles
  for (t = 0; t < 100; t++) {
    bubbles[t] = new Bubble();
  }

  //setup orange fish
  for (i = 0; i < 30; i++) {
    fish[i] = new Fish();
  }

  //setup green fish
  for (j = 0; j < 40; j++) {
    badfish[j] = new Badfish();
  }
}

//define the change when keys are clicked
function keyPressed(){
  if(k==1 && keyCode === UP_ARROW){
    k=0;
  }else if(k==0 && keyCode === ENTER){
    k=1;
  }
  console.log(k);
}

function draw() {
  //define what happens if the UP arrow is clicked or the initial condition
  if (k==0){
    background("#66d9ff");

    //define the behaviour of the object Fish
    for (var i = 0; i < fish.length; i++) {
      fish[i].move();
      fish[i].display();}

    push();
    stroke(0);
    strokeWeight(1.5);
    line(mouseX, 0, mouseX, mouseY);
    fill(0)
    triangle(mouseX + 15, mouseY, mouseX + 25, mouseY, mouseX + 20, mouseY - 10);
    noFill();
    arc(mouseX + 10, mouseY, 20, 20, 0, PI);
    pop();

    //press ENTER to go in bad waters txt
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    fill("#001a1a");
    textSize(25);
    textFont(bluu);
    text('Click on the fish to catch them', windowWidth / 2, windowHeight - 60);
    text('or press ENTER to go in bad waters', windowWidth / 2, windowHeight - 30);
    pop();

  } //define what happens if the ENTER key is pressed
    else if (k==1) {
      background("#003333");

    //define the behaviour of the object Badfish
      for (var j = 0; j < fish.length; j++) {
        badfish[j].move();
        badfish[j].display();}

      push();
      stroke(255);
      strokeWeight(1.5);
      line(mouseX, 0, mouseX, mouseY);
      fill(255)
      triangle(mouseX + 15, mouseY, mouseX + 25, mouseY, mouseX + 20, mouseY - 10);
      noFill();
      arc(mouseX + 10, mouseY, 20, 20, 0, PI);
      pop();

    //press UP arrow to go back txt
      push();
      textAlign(CENTER, CENTER);
      noStroke();
      fill("#e6ffff");
      textSize(25);
      textFont(bluu);
      text('Hurry up!! Click on the fish to kill them', windowWidth / 2, windowHeight - 60);
      text('or press the UP arrow to run away', windowWidth / 2, windowHeight - 30);
      pop();

    }

    //draw bubbles

    for (var t = 0; t < bubbles.length; t++) {
      bubbles[t].move();
      bubbles[t].display();
    }

}

function mousePressed() {
  for (var i = 0; i < fish.length; i++) {
    fish[i].clicked();}
  for (var i = 0; i < badfish.length; i++) {
    badfish[i].clicked();}
}

//orange Fish
function Fish() {
  var a = 50;
  var b = 30;
  var c = 50;
  var d = 30;
  this.colorbody = color("#ff6600");
  this.coloreye = color(255);
  this.coloriris = color(0);

  //define parameters of the object Fish
  this.x = random(-a, windowWidth);
  this.y = random(a, windowHeight - a);
  this.diameter1 = a;
  this.diameter2 = b;
  this.speed = 2;

  var xIncrease = 1;
  var yIncrease = 0;

  //define how Fish moves
  this.move = function() {
    this.x += xIncrease * this.speed + random(-1, 1);
    this.y += yIncrease * this.speed + random(-1, 1);

    //orizontal bouncing
    if (this.x > windowWidth || this.x < 0) {
      xIncrease = -xIncrease;
      c = -c;
    } else {
      c = c;
    }
  }

  //define the appearence of Fish
  this.display = function() {
    noStroke();
    fill(this.colorbody);
    ellipse(this.x, this.y, this.diameter1, this.diameter2); //body
    triangle(this.x - c / 2, this.y, this.x - 2 * c / 3, this.y - d / 3, this.x - 2 * c / 3, this.y + d / 3); //tail
    fill(this.coloreye);
    ellipse(this.x + c / 4, this.y - d / 10, c / 4); //eyeball white
    fill(this.coloriris);
    ellipse(this.x + c / 4, this.y - d / 10, c / 7); //eyeball black
  }

  //define what happens when you click on a single object
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < b/2) {
      this.colorbody = color(0, 0);
      this.coloreye = color(255,0);
      this.coloriris = color(0,0);
    }
  }

}

//green fish
function Badfish() {
  var e = 50;
  var f = 40;
  var g = 50;
  var h = 30;

  //define parameters of bad fish
  this.x = random(- e, windowWidth);
  this.y = random(e, windowHeight - e);
  this.diameter1 = e;
  this.diameter2 = f;
  this.speed = 3;
  this.colorbody = color("#177f70");
  this.coloreye = color(255);
  this.coloriris = color(0);

  var xIncrease = 2;
  var yIncrease = 0;

  //define how bad fish moves
  this.move = function() {
    this.x += xIncrease * this.speed + random(-1, 1);
    this.y += yIncrease * this.speed + random(-1, 1);

    //orizontal bouncing
    if (this.x > windowWidth || this.x < 0) {
      xIncrease = -xIncrease;
      g = - g;
    } else {
      g = g;
    }
  }

  //define bad fish appearence
  this.display = function() {
    push();
    noStroke();
    fill(this.colorbody);
    ellipse(this.x, this.y, this.diameter1, this.diameter2); //body
    triangle(this.x - g / 2, this.y, this.x - 2 * g / 3, this.y - h / 3, this.x - 2 * g / 3, this.y + h / 3); //tail
    fill(this.coloreye);
    ellipse(this.x + g / 4, this.y - h / 10, g / 4); //eyeball white
    fill(this.coloriris);
    ellipse(this.x + g / 4, this.y - h / 10, e / 7); //eyeball black
    pop();
    strokeWeight(3);
    stroke(this.coloriris);
    line(this.x + g/4, this.y - h + 21, this.x + g/4 + 5, this.y - h + 23); //eyebrow1
    line(this.x + g/4 - 5, this.y - h + 23, this.x + g/4, this.y - h + 21); //eyebrow2
  }

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < e/2) {
      this.colorbody = color(0, 0);
      this.coloreye = color(255,0);
      this.coloriris = color(0,0);
    }
  }

}

//define object Bubble
function Bubble() {
  this.x = random(0, windowWidth);
  this.y = random(0, windowHeight);
  this.size = 20 * random();
  this.speed = 2;

  var xIncrease = 0.2;
  var yIncrease = -2;

//define bubbles movement
  this.move = function() {
    this.x += xIncrease * random(-4, 4);
    this.y += yIncrease * this.speed + random(-1, 1);

    if (this.y < 0) {
      this.y = windowHeight;
    }
  }

//define bubbles appearence
  this.display = function() {
    noFill();
    stroke(255);
    strokeWeight(0.5)
    ellipse(this.x, this.y, this.size)
  }
}
