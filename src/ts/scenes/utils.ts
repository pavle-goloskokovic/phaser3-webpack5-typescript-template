import Phaser from 'phaser';
import Scene = Phaser.Scene;
import BaseSoundManager = Phaser.Sound.BaseSoundManager;

export const removeOnShutdown = (scene: Scene): void =>
{
    scene.events.once('shutdown', () =>
    {
        const scenePlugin = scene.scene;

        scenePlugin.remove(scenePlugin.key);
    });
};

export const playSound = (scene: Scene,
    ...args: Parameters<BaseSoundManager['play']>
): ReturnType<BaseSoundManager['play']> =>
{
    const sound = scene.sound;

    if (sound.locked) { return; }

    try
    {
        return sound.play(...args);
    }
    catch (e)
    {
        console.error(e, `Sound Play Error (${args[0]})`);
    }
};
