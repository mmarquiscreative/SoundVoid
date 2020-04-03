class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {

        // Loads

// Images
        
        this.load.image('background1', '/zAssets/Images/background1.jpg');
       
        this.load.image('bottom_spacer', '/zAssets/Images/bottom_spacer_800x160.png');
        
        // Spritesheets
        this.load.spritesheet('sound_void', '/zAssets/Spritesheets/sound_void_sprite.png', {
            frameWidth: 120,
            frameHeight: 120
        });

        this.load.spritesheet('letterCollect_D', '/zAssets/Spritesheets/D_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_S', '/zAssets/Spritesheets/S_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_O', '/zAssets/Spritesheets/O_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_U', '/zAssets/Spritesheets/U_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_N', '/zAssets/Spritesheets/N_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
         this.load.spritesheet('letterCollect_D_static', '/zAssets/Spritesheets/D_static_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_S_static', '/zAssets/Spritesheets/S_static_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_O_static', '/zAssets/Spritesheets/O_static_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_U_static', '/zAssets/Spritesheets/U_static_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        
 this.load.spritesheet('letterCollect_N_static', '/zAssets/Spritesheets/N_static_spritesheet_80x80.png', {
            frameWidth: 80,
            frameHeight: 80
        });

        this.load.spritesheet('qtip', '/zAssets/Spritesheets/cottonswab.png', {
            frameWidth: 300,
            frameHeight: 30
        });


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
