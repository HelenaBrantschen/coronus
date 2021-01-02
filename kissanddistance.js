
var score = 0;
var gscore = 0;
var countblink = 10;
var mouthMovement = 5;
var ghost = false;
var ghost2 = false;

var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    dirx: 1,
    diry: 0,
    psize: 32,
    speed: 2
};

var enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false,

};

var enemy2 = {
    x: 150,
    y: 250,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false,

};

var powerdot = {
    x: 10,
    y: 10,
    powerup: false,
    pcountdown: 0,
    num1: 256,
    num2: 0,
};



//setup canvas

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 400;

//img import
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkStatus;
mainImage.src = "pics/bild1.png";


// keys event listeners
var keyclick = {};
document.addEventListener("keydown", function (event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
}, false);

document.addEventListener("keyup", function (event) {
    delete keyclick[event.keyCode];
}, false);

// key functions
function move(keyclick) {
    if (37 in keyclick) {
        player.pacdir = 64;
        player.dirx = -1;
        player.diry = 0;
    }
    if (38 in keyclick) {
        player.pacdir = 96;
        player.diry = -1;
        player.dirx = 0;
    }
    if (
        39 in keyclick) {
        player.pacdir = 0;
        player.dirx = 1;
        player.diry = 0;
    }
    if (40 in keyclick) {
        player.pacdir = 32;
        player.diry = 1;
        player.dirx = 0;
    }
}
// once ready
function checkStatus() {
    this.ready = true;
    playgame();
}
// game play loop
function playgame() {
    render();
    // loop through like the score
    requestAnimationFrame(playgame);
}

//random nr function for placement
function myNum(n) {
    return Math.floor(Math.random() * n);
}
// draw on canvas
function render() {
    context.fillStyle = "#DDF4ED";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // check if powerdot is on screen

    if (!powerdot.powerup && powerdot.pcountdown < 5) {
        powerdot.x = myNum(420) + 30;
        powerdot.y = myNum(250) + 30;
        powerdot.num1 = myNum(2) * 32 + 224;

        powerdot.powerup = true;

    }

    if (!ghost) {
        enemy.ghostNum = myNum(2) * 64; // 
        enemy.x = myNum(800);
        enemy.y = myNum(800) + 30;
        // for just 1 ghost to check
        ghost = true;
    }

    if (!ghost2) {
        enemy2.ghostNum2 = myNum(2) * 64; // 
        enemy2.x = myNum(800);
        enemy2.y = myNum(800) + 30;
        // for just 1 ghost to check
        ghost2 = true;
    }

    // are you moving ?
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + myNum(1); // myNum(1) odd or even
        enemy.speed = myNum(3);// +1 if it should never stand still
        enemy.dirx = 0;
        enemy.diry = 0;

        // speed *-1 switches from following ghost to running ghost
        if (powerdot.ghosteat) {
            enemy.speed = enemy.speed * -1;
        }


        // in which direction? 50% chance up down to left right 
        if (enemy.moving % 2) {
            if (player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed;
            }
        } else {// where is the player relative to the ghost
            if (player.y < enemy.y) {
                enemy.diry = - enemy.speed
            } else { enemy.diry = enemy.speed; }
        }

    }
    // are you moving 2?
    if (enemy2.moving < 0) {
        enemy2.moving = (myNum(20) * 3) + myNum(1); // myNum(1) odd or even
        enemy2.speed = myNum(2) + 1;// +1 if it should never stand still
        enemy2.dirx = 0;
        enemy2.diry = 0;

        // speed *-1 switches from following ghost to running ghost
        if (powerdot.ghosteat) {
            enemy2.speed = enemy2.speed * -1;
        }



        // in which direction? 50% chance up down to left right 
        if (enemy2.moving % 2) {
            if (player.x < enemy2.x) {
                enemy2.dirx = -enemy2.speed;
            } else {
                enemy2.dirx = enemy2.speed;
            }
        } else {// where is the player relative to the ghost
            if (player.y < enemy2.y) {
                enemy2.diry = - enemy2.speed
            } else { enemy2.diry = enemy2.speed; }
        }

    }

    //ghost follow the player
    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry

    //ghost2 follow the player
    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2.diry



    // moving to the other side by passing the border also for the enemy

    if (enemy.x >= (canvas.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = (canvas.width - 32);
    }
    if (enemy.y < 0) {
        enemy.y = (canvas.height - 32);
    }


    // moving to the other side by passing the border also for the enemy2

    if (enemy2.x >= (canvas.width - 32)) {
        enemy2.x = 0;
    }
    if (enemy2.y >= (canvas.height - 32)) {
        enemy2.y = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = (canvas.width - 32);
    }
    if (enemy2.y < 0) {
        enemy2.y = (canvas.height - 32);
    }

    //move player
    player.x += player.dirx * player.speed;
    player.y += player.diry * player.speed;

    //move player to the other side
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = (canvas.width - 32);
    }
    if (player.y < 0) {
        player.y = (canvas.height - 32);
    }

    //moving the player mouth
    if (mouthMovement > 0) {
        mouthMovement--;
    } else {
        mouthMovement = 5;
        if (player.pacmouth == 320) {
            player.pacmouth = 352
            powerdot.num2 = 32;

        } else {
            player.pacmouth = 320
            powerdot.num2 = 64;

        }
    }


    //Collision detection ghost and scoreup

    if (player.x <= (enemy.x + 26)
        && enemy.x <= (player.x + 26)
        && player.y <= (enemy.y + 26)
        && enemy.y <= (player.y + 32)) {
        console.log("ghost")
        if (powerdot.ghosteat) {
            score++;
        }
        else {
            gscore++
        }
        // reset values after catch
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;
        powerdot.pcountdown = 0;
    }


    if (
        player.x <= (enemy2.x + 26) && enemy2.x <= (player.x + 26) && player.y <= (enemy2.y + 26) && enemy2.y <= (player.y + 32)) {
        console.log('ghost');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }

        player.x = 10;
        player.y = 100;
        enemy2.x = 300;
        enemy2.y = 200;
        powerdot.pcountdown = 0;
    }

    // collision detection powerup
    if (player.x <= powerdot.x
        && powerdot.x <= (player.x + 48)
        && player.y <= powerdot.y
        && powerdot.y <= (player.y + 48)) {

        console.log("hit");

        powerdot.powerup = false;
        powerdot.pcountdown = 800;
        powerdot.ghostNum = enemy.ghostNum;
        powerdot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
        enemy2.ghostNum2 = 384;
        powerdot.x = 0;
        powerdot.y = 0;
        powerdot.ghosteat = true;
        player.speed = 4;

    }// powerup countdown
    if (powerdot.ghosteat) {
        powerdot.pcountdown--;

        // color backswitch after countdown went off
        if (powerdot.pcountdown <= 0) {
            powerdot.ghosteat = false;
            enemy.ghostNum = powerdot.ghostNum;
            enemy2.ghostNum2 = powerdot.ghostNum2;
            player.speed = 2;

        }
    }


    /*  // if powerup exists
    if (powerdot.powerup) {
        // if image
   powerdot.x = myNum(800)+30;
         powerdot.y = myNum(800)+30;
          powerdot.powerup = true;
          
        // draw inside
        context.fillStyle = "#fff"
        context.beginPath();
        context.arc(powerdot.x, powerdot.y, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }*/


    //flashing from one color to another blinking after powerup
    if (countblink > 0) {
        countblink--;
    } else {
        countblink = 20;
        if (enemy.flash == 0) {
            enemy.flash = 32;
            enemy2.flash = 32;
        } else {
            enemy.flash = 0;
            enemy2.flash = 0;

        }
    }


    //score display
    document.getElementById("scoredisplay").innerHTML = "Youman: " + score + " vs Coronus: " + gscore, 2, 18;


    //score max
    if (score >= 5 || gscore >= 5) {
        localStorage.setItem("gscore2", gscore);
        localStorage.setItem("score2", score);
        if (score > gscore) {
            yourAWinner();
        }
        else {
            yourALoser();
        }
    }

    //player
    context.drawImage(mainImage, player.pacmouth, player.pacdir, player.psize, player.psize, player.x, player.y, player.psize, player.psize);

    // enemy
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);

    // enemy2
    context.drawImage(mainImage, enemy2.ghostNum2, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32, 32);


    //powerdot

    context.drawImage(mainImage, powerdot.num1, powerdot.num2, 32, 32, powerdot.x, powerdot.y, 32, 32);

}


function yourAWinner() {
    window.location.href = "congrats2.html";

}
function yourALoser() {
    window.location.href = "loser2.html";
}

