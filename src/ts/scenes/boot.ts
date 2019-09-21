import * as logger from 'js-logger';
import * as gameConfig from '../game.config';

/**
 * Boot Phaser game scene.
 *
 * This is where we handle all Phaser specific stuff before we start loading assets
 * and start dealing with game specific logic.
 */
export default class Boot extends Phaser.Scene {

    create (): void
    {
        logger.info('Boot enter');

        this.sound.mute = gameConfig.mute;

        // TODO update when scale manager gets available
        // // set scale mode
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //
        // // align
        // this.scale.pageAlignVertically = true;
        // this.scale.pageAlignHorizontally = true;

        this.handleOrientation();

        this.handleFullScreen();

        logger.info('Boot leave');
        this.scene.start('preloader');
    }

    handleOrientation (): void
    {
        if (!this.sys.game.device.os.desktop
            && (gameConfig.orientation.forceLandscape || gameConfig.orientation.forcePortrait))
        {

            // TODO update when scale manager gets available
            // this.scale.forceOrientation(
            //     gameConfig.orientation.forceLandscape,
            //     gameConfig.orientation.forcePortrait
            // );
            // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    }

    enterIncorrectOrientation (): void
    {
        // TODO handle incorrect orientation
    }

    leaveIncorrectOrientation (): void
    {
        // TODO handle correct orientation
    }

    handleFullScreen (): void
    {
        if (!this.sys.game.device.os.desktop)
        {
            // TODO update when scale manager gets available
            // && this.scale.compatibility.supportsFullScreen) {
            //
            // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
            // this.game.scale.fullScreenTarget  = document.getElementById('container');

            //TODO handle full screen
        }
    }
}
