import Phaser from 'phaser';
import Scene = Phaser.Scene;
import { mute } from '../game.config';

/**
 * Boot Phaser game scene.
 *
 * This is where we handle all Phaser specific stuff
 * before we start loading assets and
 * start dealing with game specific logic.
 */
export class Boot extends Scene {

    constructor () { super('boot'); }

    create (): void
    {
        console.info('Boot enter');

        this.sound.mute = mute;

        console.info('Boot leave');

        this.scene.start('preloader');
    }
}
