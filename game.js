var gameSettings = {
    playerStartX: 100,
    playerSpeed: 450,
    stageSpeed: 2,
    playerJumpVelocity: -1000,
    playerAcceleration: 1000,
    dashLength: 200,
    dashRechargeDelay: 400,
    stageFloorY: 440
}

var collectibles = {
    letters: {
        strOptions: ['s', 'o', 'u', 'n', 'd']

    }
}

var gameCounters = {
    soundvoid: {
        jumpCount: 0,
        jumpStartY: 0,
        canDash: true,
        onGround: true
    },
    letters: {
        needNewLetter: false
    },
    global: {
        distanceCount: 0,
        distance: 0,
        score: 0
    }
}

var stateBools = {
    soundvoid: {
        isMadDash: false
    }
}

var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    }
}

var game = new Phaser.Game(config);
