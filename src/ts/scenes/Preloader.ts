import Phaser from 'phaser';
import Scene = Phaser.Scene;
import File = Phaser.Loader.File;
import { /*playSound,*/ removeOnShutdown } from './utils';


const preloadAudio = (scene: Scene) =>
{
    console.info(Date.now(), 'Preload audio start');

    scene.load
        .on('loadretry', (file: File, event: ProgressEvent, retries: number) =>
        {
            const { key, url } = file;
            console.error(
                { url, event, retries } as any,
                `Audio Load Retry (${key})`
            );
        })
        .on('loaderror', (file: File, event: Event | string) =>
        {
            const { key, url } = file;
            console.error(
                { url, event } as any,
                `Audio Load Error (${key})`
            );
        })
        .once('complete', () =>
        {
            console.info(Date.now(), 'Preload audio complete');
        })
        /*.audio('music', require('../../assets/audio/music.mp3'))
        .once('filecomplete-audio-music', () =>
        {
            playSound(scene, 'music', {
                loop: true,
                volume: 0.5
            });
        })*/
        .start();
};

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images,
 * sounds and all relevant data before starting the game.
 */
export class Preloader extends Scene
{
    constructor () { super('preloader'); }

    preload (): void
    {
        console.info(Date.now(), 'Preloader enter');

        this.load
            .on('loadretry', (file: File, event: ProgressEvent, retries: number) =>
            {
                const { key, type, url } = file;
                console.error(
                    { type, url, event, retries } as any,
                    `File Load Retry (${key})`
                );
            })
            .on('loaderror', (file: File, event: Event | string) =>
            {
                const { key, type, url } = file;
                console.error(
                    { type, url, event } as any,
                    `File Load Error (${key})`
                );
            })
            .on('progress', (progress: number) =>
            {
                console.log('Preload progress', progress);
            })
            .once('complete', () =>
            {
                console.info(Date.now(), 'Preload complete');
            })
            .image('bg', require('../../assets/images/bg.jpg'))
            .image('logo', require('../../assets/images/logo.png'));

        // TODO preload assets
    }

    create (): void
    {
        console.info('Preloader leave');

        removeOnShutdown(this);

        const scene = this.scene;
        const nextSceneKey = 'game';
        const nextScene = scene.manager.getScene(nextSceneKey);

        nextScene.events.once('create', () =>
        {
            preloadAudio(nextScene);
        });

        scene.start(nextSceneKey);
    }

}
