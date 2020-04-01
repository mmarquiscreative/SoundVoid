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

        ///// Anims **

        // Letter
        this.anims.create({
            key: 'letter-collect-anim',
            frames: this.anims.generateFrameNumbers('letterCollect'),
            frameRate: 12,
            repeat: -1
        });

        // soundvoid
        this.anims.create({
            key: 'soundvoid-anim',
            frames: this.anims.generateFrameNumbers('sound_void'),
            frameRate: 10,
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

        this.physics.add.collider(letters, Phaser.World.bounds, this.collectLetter);

        ///// Input/Controls **
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        ///// Letter collects **

        var maxObjects = 2;
        for (var i = 0; i <= maxObjects; i++) {
            var letter = this.physics.add.sprite(100, 100, ('letterCollect' + i));
            letters.add(letter);
            letter.setRandomPosition(config.width, 0, 100, gameSettings.stageFloorY);
            letter.body.allowGravity = false;
            letter.setVelocityX(-200);
            letter.play('letter-collect-anim');
        }

        letters.create(300, config.height, 'letterCollect');
        console.log(this.letters);

    }



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




    }




    collectLetter(player, powerUp) {
        console.log('got that letter!');
        console.log(powerUp);
        //powerUp.disableBody(true, true);
        powerUp.setRandomPosition(config.width, 0, 100, gameSettings.stageFloorY);
        //powerUp.enableBody(true, true);
        gameCounters.letters.needNewLetter = true;
        powerUp.body.allowGravity = false;
        powerUp.setVelocityX(-200);
        powerUp.play('letter-collect-anim');
    };

    addLetter() {
        if (gameCounters.letters.needNewLetter) {
            console.log(Phaser.GameObjects.GameObject);
            var letter = this.physics.add.sprite(100, 100, 'letterCollect');
            this.letters.add(letter);
            letter.setRandomPosition(config.width, 0, 100, gameSettings.stageFloorY);
            letter.body.allowGravity = false;
            letter.setVelocityX(-200);
            letter.play('letter-collect-anim');
            gameCounters.letters.needNewLetter = false;
        }
    }
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
