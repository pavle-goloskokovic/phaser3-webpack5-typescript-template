import * as logger from 'js-logger'
import * as appConfig from '../app.config'

/**
 * Boot Phaser game scene.
 *
 * This is where we handle all Phaser specific stuff before we start loading assets
 * and start dealing with game specific logic.
 */
export default class Boot extends Phaser.Scene {

    create() {
        logger.info('Boot enter');

        this.sound.mute = appConfig.mute;

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

    handleOrientation () {
        if (!this.sys.game.device.os.desktop
            && (appConfig.orientation.forceLandscape || appConfig.orientation.forcePortrait)) {

            // TODO update when scale manager gets available
            // this.scale.forceOrientation(
            //     appConfig.orientation.forceLandscape,
            //     appConfig.orientation.forcePortrait
            // );
            // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    }

    enterIncorrectOrientation () {
        // TODO handle incorrect orientation
    }

    leaveIncorrectOrientation () {
        // TODO handle correct orientation
    }

    handleFullScreen () {
        if (!this.sys.game.device.os.desktop){
            // TODO update when scale manager gets available
            // && this.scale.compatibility.supportsFullScreen) {
            //
            // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
            // this.game.scale.fullScreenTarget  = document.getElementById('container');

            //TODO handle full screen
        }
    }
};
