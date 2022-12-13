import * as gameConfig from '../game.config';

/**
 * Boot Phaser game scene.
 *
 * This is where we handle all Phaser specific stuff
 * before we start loading assets and
 * start dealing with game specific logic.
 */
export default class Boot extends Phaser.Scene {

    constructor () { super('boot'); }

    create (): void
    {
        console.info('Boot enter');

        this.sound.mute = gameConfig.mute;

        console.info('Boot leave');

        this.scene.start('preloader');
    }
}
