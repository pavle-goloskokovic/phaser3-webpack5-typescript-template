/**
 * App/game entry point
 */

import '../style' // loading stylus css

import 'phaser' // loading Phaser with dependencies

import * as _ from 'lodash'
import * as logger from 'js-logger'

import * as appConfig from './app.config'

import PhaserStatsGame from "./game/PhaserStatsGame";

import Boot from './scenes/boot'
import Preloader from './scenes/preloader'
import Game from "./scenes/game";

/**
 * Setup logger
 */
logger.useDefaults();
logger.setLevel(appConfig.logLevel);

/**
 * Phaser game config
 * @type {GameConfig}
 */
let config: GameConfig = {
    type:     Phaser.AUTO,
    parent:   'container',     // parent id - '' means  no container
    width:    appConfig.size.x,
    height:   appConfig.size.y
};

/**
 * Phaser game instance
 * Choosing implementation based on 'stats' app config setting
 * @type {Phaser.Game}
 */
let game: Phaser.Game;
if(appConfig.stats && process.env.NODE_ENV !== 'production'){
    game = new PhaserStatsGame(config);
} else {
    game = new Phaser.Game(config);
}

/**
 * Registering game scenes
 */
_.each({
    boot: Boot,
    preloader: Preloader,
    game: Game
}, function(scene, key) {
    game.scene.add(key, scene);
});

game.scene.start('boot');
