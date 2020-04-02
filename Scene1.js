class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {

        // Loads


        this.load.image('background1', '/zAssets/Images/background1.jpg');

        this.load.spritesheet('sound_void', '/zAssets/Spritesheets/sound_void_sprite.png', {
            frameWidth: 120,
            frameHeight: 120
        });

        this.load.spritesheet('letterCollect', '/zAssets/Spritesheets/S_spritesheet_100x100.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.image('bottom_spacer', '/zAssets/Images/bottom_spacer_800x160.png');

        /*
         this.load.spritesheet('beam', 'zAssets/spritesheets/beam.png', {
             frameWidth: 16,
             frameHeight: 16
         });

         this.load.bitmapFont('pixelFont', '/zAssets/font/font.png', '/zAssets/font/font.xml');


         this.load.audio('music', ['/zAssets/sounds/sci-fi_platformer12.ogg', '/zAssets/sounds/sci-fi_platformer12.mp3']);*/
    }
    create() {
        this.add.text(20, 20, "Loading game...");

        this.scene.start("playGame");
        //  this.add.audio('music', true)
        /* this.anims.create({
            key: 'ship1_anim',
            frames: this.anims.generateFrameNumbers('ship'),
            frameRate: 20,
            repeat: -1
        }); */


        /*  this.ship1.play('ship1_anim');
        this.ship2.play('ship2_anim');
        this.ship3.play('ship3_anim');

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);
*/




    }

}
