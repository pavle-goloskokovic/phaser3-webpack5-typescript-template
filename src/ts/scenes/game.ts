import * as logger from 'js-logger'

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

    create () {
        logger.info('Game enter');

        let logo = this.add.sprite(
            <number>this.sys.game.config.width/2,
            <number>this.sys.game.config.height/2,
            'logo'
        );
        logo.setOrigin(0.5, 0.5);
    }
}
