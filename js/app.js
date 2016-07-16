// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // this is the initial location of the enemies
        //the x coordinate is set to 1 for testing
        //the y coordinate is passed with the instance of the enemy
    this.x = -151;
    this.y = y;

    // this is the testing testing speed of the enemies that are passed
    // at the time of instance creation
    this.speed = speed;

    this.width = 70;
};

Enemy.prototype.collisionsCheck = function(){
    if(player.y <= 238 && player.y >= 74){
        console.log("player is now live");
        if(player.y < this.y + 15 && player.y > this.y - 15 &&
           player.x < this.x + this.width && player.x + player.width > this.x){
            console.log("there has been a collision");
            player.reset();
            currentScore = 0;
        }
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log(this.speed);
    this.x = this.x + (this.speed * dt);
    if(this.x >= 555){
        this.x = -151
    }

    this.collisionsCheck();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(){
    // the sprite/image that will load the player
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 402;

    this.width = 50;

}

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 402;
}

Player.prototype.update = function(){

    if (this.y <= 72){
        this.y = 402;
        currentScore ++;
        if(currentScore > highestScore){
            highestScore = currentScore;
        }
        console.log("current score : " + currentScore);
        console.log("highest score : " + highestScore);
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys){
    if(allowedKeys === "left" && this.x >= leftBoundry){
        this.x -= 101;
    }
    if(allowedKeys === "right" && this.x <= rightBoundry){
        this.x += 101;
    }
    if(allowedKeys === "up" && this.y > topBoundry){
        this.y -= 82;
    }
    if(allowedKeys === "down" && this.y < bottomBoundry){
        this.y += 82;
    }
}

var initiatePlayer = function(){
    this.x = 202;
    this.y = 402;
}

var speedGenerator = function(){
    // this is a list of all the different speed option that is designated
    // to the enemy instances
    var speeds = [50, 100, 200, 300, 400, 500];
    var speedRandomizer = speeds[Math.floor(Math.random() * speeds.length)];

    return speedRandomizer;
}

// this is all of the enemies being defined based on the enemy object
// then the enemies are stored in an array for the engine.js file to run
var Growlith = new Enemy(60, speedGenerator());
var Pidgeyot = new Enemy(145, speedGenerator());
var Blazikin = new Enemy(230, speedGenerator());
var allEnemies = [Growlith, Pidgeyot, Blazikin];

// this is the single instance of the player that you will be using in the game
var player = new Player();

// these variables will signify the player boundries (left, right, top, bottom)
var leftBoundry = 1;
var rightBoundry = 303;
var bottomBoundry = 402;
var topBoundry = -12;

var currentScore = 0;
var highestScore = 0;

// the following height and width are for the enemy and player objects in the game
var Width = 171;
var Height = 101;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
