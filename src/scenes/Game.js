import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene {
    // @type {Phaser.Physics.Arcade.Sprite} //
    player
    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    platforms
    constructor() {
        super('game')
    }

    preload = () => {
        this.load.image('background', 'assets/bg_layer1.png');
        this.load.image('platform', 'assets/ground_grass.png');

        this.load.image('bunny-stand', 'assets/bunny1_stand.png');

    }

    create = () => {
        this.add.image(240, 320, 'background');
        this.platforms = this.physics.add.staticGroup()

        // then create 5 platforms from the group
        for (let i = 0; i < 5; ++i) {
            const x = Phaser.Math.Between(80, 400);
            const y = 150 * i;

            const platform = this.platforms.create(x, y, 'platform');
            platform.scale = 0.5;

            const body = platform.body;
            body.updateFromGameObject();
        }

        this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5);
        this.physics.add.collider(platforms, this.player);

        //Phaser.Physics.body class has a checkCollision property 
        //where we can set which directionswe want collision for.

        this.player.body.checkCollision.up = false
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false

        this.cameras.main.startFollow(this.player)
    }
    
    update() {
        // find out from Arcade Physics if the player's physics body
        // is toucing something below it.

        const touchingDown = this.player.body.touching.down;
        
        if (touchingDown) {
            this.player.setVelocity(-300);
        }
    }
}