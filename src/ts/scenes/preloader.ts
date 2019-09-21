import * as logger from 'js-logger';

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.Scene {

    preload (): void
    {
        logger.info('Preloader enter');

        // TODO preload assets

        this.load.image('bg', require('../../assets/images/bg.jpg'));
        this.load.image('logo', require('../../assets/images/logo.png'));
    }

    create (): void
    {
        logger.info('Preloader leave');

        this.scene.start('game');
    }

}
