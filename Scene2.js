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

        this.distanceRun = this.add.text(config.width - 90, 50, '00000', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'right'
        });

        this.distanceRun.setOrigin(0.5);
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

        // static letter anims
        this.anims.create({
            key: 'static-d-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_D_static'),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'static-s-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_S_static'),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'static-o-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_O_static'),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'static-u-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_U_static'),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'static-n-anim',
            frames: this.anims.generateFrameNumbers('letterCollect_N_static'),
            frameRate: 10,
            repeat: -1
        })

        // soundvoid
        this.anims.create({
            key: 'soundvoid-anim',
            frames: this.anims.generateFrameNumbers('sound_void'),
            frameRate: 25,
            repeat: -1
        });
        this.soundvoid.setBounce(0);


        ///// Groups **

        platforms = this.physics.add.staticGroup();

        platforms.create(300, config.height, 'bottom_spacer');

        letters = this.physics.add.group();


        this.soundvoid.play('soundvoid-anim');

        ///// Colliders **
        this.soundvoid.setCollideWorldBounds(true);

        this.physics.add.collider(this.soundvoid, platforms, this.resetJump);

        this.physics.add.collider(this.soundvoid, letters, this.collectLetter, null, this);

        //this.physics.add.collider(letters, Phaser.World.bounds, this.collectLetter);

        ///// Input/Controls **
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        ///// Letter collects **

        this.HUDletter_s = this.add.sprite(50, 50, ('s-static'));
        this.HUDletter_s.play('static-s-anim');

        this.HUDletter_o = this.add.sprite(130, 50, ('o-static'));
        this.HUDletter_o.play('static-o-anim');

        this.HUDletter_u = this.add.sprite(210, 50, ('u-static'));
        this.HUDletter_u.play('static-u-anim');

        this.HUDletter_n = this.add.sprite(290, 50, ('n-static'));
        this.HUDletter_n.play('static-n-anim');

        this.HUDletter_d = this.add.sprite(370, 50, ('d-static'));
        this.HUDletter_d.play('static-d-anim');

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

        // update distance
        if (gameCounters.global.distanceCount < 8) {

            gameCounters.global.distanceCount++
        } else {
            gameCounters.global.distanceCount = 0;
            gameCounters.global.distanceCount++
            gameCounters.global.distance += Math.round(gameSettings.stageSpeed / 4);
            this.distanceRun.setText((gameCounters.global.distance + 'm'));

        }

        this.movePlayerManager()
        // scrolling bg
        this.background.tilePositionX += gameSettings.stageSpeed;

        /* if (this.soundvoid.x > gameSettings.playerStartX) {
            this.soundvoid.x -= gameSettings.stageSpeed;
        };*/

        // listen for jump
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.playerJump();
        };
        /* if (Phaser.Input.Keyboard.JustUp(this.spacebar)) {
             this.playerJump();
         };*/

        // listen for dash
        /* if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
             this.playerDash();
         } */

        this.checkLetterReset(this.letter1);
        this.checkLetterReset(this.letter2);

        this.checkLetterReset(this.letter3);

        this.resetSpritePosition(this.qtip);

    }


    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.soundvoid.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.soundvoid.setVelocityX(gameSettings.playerSpeed);
        } else {
            this.soundvoid.setVelocityX(0);
        }

        /*  if (this.cursorKeys.up.isDown) {
             this.player.setVelocityY(-gameSettings.playerSpeed);
         } else if (this.cursorKeys.down.isDown) {
             this.player.setVelocityY(gameSettings.playerSpeed);
         } else {
             this.player.setVelocityY(0);
         }; */
    };


    updateDistance() {}

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
            someSprite.name = randomLetter;

        }
    }

    collectLetter(player, powerUp) {
        console.log(this);
        console.log('got that letter!');
        console.log(powerUp.name);
        //powerUp.disableBody(true, true);

        powerUp.setRandomPosition(config.width, 40, 600, gameSettings.stageFloorY - 40);
        powerUp.setVelocity(0, 0);
        powerUp.setVelocityX(-200);

        switch (powerUp.name) {
            case 's':
                this.HUDletter_s.play('lettercollect-s-anim');
                break;
            case 'o':
                this.HUDletter_o.play('lettercollect-o-anim');
                break;
            case 'u':
                this.HUDletter_u.play('lettercollect-u-anim');
                break;
            case 'n':
                this.HUDletter_n.play('lettercollect-n-anim');
                break;
            case 'd':
                this.HUDletter_d.play('lettercollect-d-anim');
                break;
            default:
                console.log('powerup switch');

        }
        //powerUp.enableBody(true, true);
        // gameCounters.letters.needNewLetter = true;
        // powerUp.body.allowGravity = false;
        // powerUp.setVelocityX(-200);
        // powerUp.play('letter-collect-anim');
    };


    playerJump() {
        if (gameCounters.soundvoid.jumpCount < 3) {
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
