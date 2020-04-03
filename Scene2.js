class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }




    create() {
        var platforms, letters;

        ///// Background **


        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background1');

        this.background.setOrigin(0, 0);

        ///// Adds for preloads **

        this.soundvoid = this.physics.add.sprite(100, config.height - 160, 'sound_void');

        this.qtip = this.physics.add.sprite(100, 100, 'qtip');

        ///// Anims **

        // Letter
        this.anims.create({
            key: 'lettercollect-s-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_S'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'lettercollect-o-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_O'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'lettercollect-u-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_U'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'lettercollect-n-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_N'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'lettercollect-d-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_D'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'qtip-anim',
            frames: this.anims.generateFrameNumbers('qtip'),
            frameRate: 10,
            repeat: -1
        });

        // soundvoid
        this.anims.create({
            key: 'soundvoid-anim',
            frames: this.anims.generateFrameNumbers('sound_void'),
            frameRate: 25,
            repeat: -1
        });



        ///// Groups **

        platforms = this.physics.add.staticGroup();

        platforms.create(300, config.height, 'bottom_spacer');

        letters = this.physics.add.group();


        this.soundvoid.play('soundvoid-anim');

        ///// Colliders **
        this.soundvoid.setCollideWorldBounds(true);

        this.physics.add.collider(this.soundvoid, platforms, this.resetJump);

        this.physics.add.collider(this.soundvoid, letters, this.collectLetter);

        //this.physics.add.collider(letters, Phaser.World.bounds, this.collectLetter);

        ///// Input/Controls **
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        ///// Letter collects **



        this.letter1 = this.physics.add.sprite(100, 100, ('letterCollect1'));
        this.letter2 = this.physics.add.sprite(100, 100, ('letterCollect2'));
        this.letter3 = this.physics.add.sprite(100, 100, ('letterCollect3'));

        letters.add(this.letter1);
        letters.add(this.letter2);
        letters.add(this.letter3);

        this.initLetters(this.letter1);
        this.initLetters(this.letter2);
        this.initLetters(this.letter3);


        // projectiles

        this.qtip.play('qtip-anim');
        this.qtip.setRandomPosition(config.width, 40, 600, gameSettings.stageFloorY - 40);

        this.qtip.body.allowGravity = false;
        this.qtip.setVelocityX(-400);
        this.qtip.setBounce(0);

        /*
        letter.setRandomPosition(config.width, 0, 100, gameSettings.stageFloorY);
        letter.body.allowGravity = false;
        letter.setVelocityX(-200);
        letter.play('letter-collect-anim');*/
    }

    //letters.create(300, config.height, 'letterCollect');
    //console.log(this.letters);





    update() {

        // scrolling bg
        this.background.tilePositionX += gameSettings.stageSpeed;

        if (this.soundvoid.x > gameSettings.playerStartX) {
            this.soundvoid.x -= gameSettings.stageSpeed;
        };

        // listen for jump
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.playerJump();
        };
        /* if (Phaser.Input.Keyboard.JustUp(this.spacebar)) {
             this.playerJump();
         };*/

        // listen for dash
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            this.playerDash();
        }

        this.checkLetterReset(this.letter1);
        this.checkLetterReset(this.letter2);

        this.checkLetterReset(this.letter3);

        this.resetSpritePosition(this.qtip);

    }


    initLetters(someSprite) {
        someSprite.setRandomPosition(config.width, 40, 600, gameSettings.stageFloorY - 40);
        someSprite.body.allowGravity = false;
        someSprite.setVelocityX(-200);
        someSprite.setBounce(0);
        var randomLetter = this.genRandomLetter(collectibles.letters.strOptions);
        console.log(randomLetter);
        someSprite.play('lettercollect-' + randomLetter + '-anim');
    }

    genRandomLetter(someArray) {
        var randomNum = 0;
        var arrayNum = someArray.length;
        randomNum = Math.random();
        randomNum = Math.floor(randomNum * arrayNum);

        return someArray[randomNum];
    }

    resetSpritePosition(someSprite, someVelocityX) {
        if (someSprite.x < -150) {
            someSprite.setRandomPosition(config.width, 40, 600, gameSettings.stageFloorY - 40);
        }
    }

    checkLetterReset(someSprite) {
        if (someSprite.x < 0) {
            console.log('resetting');
            someSprite.setRandomPosition(config.width, 40, 600, gameSettings.stageFloorY - 40);
            var randomLetter = this.genRandomLetter(collectibles.letters.strOptions);
            console.log(randomLetter);
            someSprite.play('lettercollect-' + randomLetter + '-anim');

        }
    }

    collectLetter(player, powerUp) {
        console.log('got that letter!');
        console.log(powerUp);
        //powerUp.disableBody(true, true);

        powerUp.setRandomPosition(config.width, 40, 600, gameSettings.stageFloorY - 40);
        powerUp.setVelocity(0, 0);
        powerUp.setVelocityX(-200);
        //powerUp.enableBody(true, true);
        // gameCounters.letters.needNewLetter = true;
        // powerUp.body.allowGravity = false;
        // powerUp.setVelocityX(-200);
        // powerUp.play('letter-collect-anim');
    };


    playerJump() {
        if (gameCounters.soundvoid.jumpCount < 2) {
            gameCounters.soundvoid.onGround = false;
            this.soundvoid.setVelocityY(gameSettings.playerJumpVelocity);
            this.soundvoid.setAccelerationY(gameSettings.playerAcceleration);
            this.soundvoid.setVelocityX(-(gameSettings.playerJumpVelocity / 4));
            this.soundvoid.setAccelerationX(-(gameSettings.playerAcceleration / 4));
            gameCounters.soundvoid.jumpCount++;


            /* this.time.addEvent({
                delay: 80,
                callback: () => {
                    console.log('jumptest short');
                    this.jumpLength = 'short';
                    this.time.addEvent({
                        delay: 80,
                        callback: () => {
                            console.log('jumptest med');
                            this.jumpLength = 'medium';
                            this.time.addEvent({
                                delay: 80,
                                callback: () => {
                                    console.log('jumptest long');
                                    this.jumpLength = 'long';
                                },
                                loop: false
                            })
                        },
                        loop: false
                    })
                },
                loop: false
            })*/

        }

    }

    /* playerJump() {

         if (gameCounters.soundvoid.jumpCount < 2) {
             this.soundvoid.setVelocityY(gameSettings.playerJumpVelocity);
             gameCounters.soundvoid.jumpCount++;
             this.time.addEvent({
                 delay: 100,
                 callback: () => {
                     console.log('jumptest1');
                     this.soundvoid.setVelocityY(gameSettings.playerJumpVelocity / 2);
                     this.time.addEvent({
                         delay: 180,
                         callback: () => {
                             console.log('jumptest2');
                             this.soundvoid.setVelocityY(0);
                         },
                         loop: false
                     })
                 },
                 loop: false
             })
         }

     } */

    resetPlayerVelocity() {

        console.log('jumptest');

    }

    resetJump() {
        gameCounters.soundvoid.jumpCount = 0;

    }


    playerDash() {
        console.log('dashtest');
        if (gameCounters.soundvoid.canDash) {
            console.log('canDash is: ' + gameCounters.soundvoid.canDash);
            this.soundvoid.x += gameSettings.dashLength;
            gameCounters.soundvoid.canDash = !gameCounters.soundvoid.canDash;

            // prevents mult dashes at once
            this.time.addEvent({
                delay: gameSettings.dashRechargeDelay,
                callback: () => {
                    console.log('resetDash');
                    console.log('canDash is: ' + gameCounters.soundvoid.canDash)

                    gameCounters.soundvoid.canDash = !gameCounters.soundvoid.canDash;
                },
                loop: false
            });

        } else if (gameCounters.soundvoid.canDash) {
            this.soundvoid.x += gameSettings.dashLength;
        }
    }
    /* playerDash() {
          console.log('dashtest');
          if (gameCounters.soundvoid.canDash < 1 && !gameCounters.soundvoid.onGround) {
              this.soundvoid.x += gameSettings.dashLength;
              gameCounters.soundvoid.canDash++;

          }
      } */

}
/* NOTES:

Bugs:
• letters occassionally collide when spawning and fly off at angles or faster
*/
