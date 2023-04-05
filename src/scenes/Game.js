import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload = () => {
        this.load.image('background', 'assets/bg_layer1.png')
        const grass = this.load.image('platform', 'assets/ground_grass.png');
    }

    create = () => {
        this.add.image(240, 320, 'background');
        const platforms = this.physics.add.staticGroup()
        console.log(platforms);

        for (let i = 0; i < 5; ++i) {
            const x = Phaser.Math.Between(80, 400)
            const y = 150 * i;

            const platform = platforms.create(x, y, 'platform')
        }
    }
}