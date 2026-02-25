import Phaser from 'phaser';
import Game = Phaser.Game;
import Scene = Phaser.Scene;
import { removeOnShutdown } from './utils';
import { mute } from '../game.config';

const handleSoundManagerEvents = (game: Game, sound: any): void =>
{
    // Sound manager blur/focus/visibility events update
    const events = game.events

        .off('blur', sound.onGameBlur, sound)
        .off('focus', sound.onGameFocus, sound)

        .on('hidden', sound.onGameBlur, sound)
        .on('visible', sound.onGameFocus, sound)

        .once('destroy', () =>
        {
            events.off('hidden', sound.onGameBlur, sound)
                .off('visible', sound.onGameFocus, sound);
        });

    if (sound.onGameVisible) // do it only for WebAudio
    {
        events.off('visible', sound.onGameVisible, sound);
    }
};

/**
 * Boot Phaser game scene.
 *
 * This is where we handle all Phaser specific stuff
 * before we start loading assets and
 * start dealing with game specific logic.
 */
export class Boot extends Scene
{
    constructor () { super('boot'); }

    create (): void
    {
        console.info('Boot enter');

        const sound = this.sound;

        handleSoundManagerEvents(this.game, sound);

        sound.mute = mute;

        removeOnShutdown(this);

        console.info('Boot leave');

        this.scene.start('preloader');
    }
}
