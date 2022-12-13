/**
 * Game entry point
 */

import '../css/style.css'; // loading css

import 'phaser'; // loading Phaser

import * as gameConfig from './game.config';

import Boot from './scenes/boot';
import Preloader from './scenes/preloader';
import Game from './scenes/game';

/**
 * Phaser game config
 * @type {Phaser.Types.Core.GameConfig}
 */
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'container', // parent id - '' means  no container
    width: gameConfig.size.x,
    height: gameConfig.size.y,
    scene: [
        Boot,
        Preloader,
        Game
    ]
};

/**
 * Phaser game instance
 * Choosing implementation based on 'stats' app config setting
 * @type {Phaser.Game}
 */
let game: Phaser.Game;
if (gameConfig.stats && process.env.NODE_ENV !== 'production')
{
    const PhaserStatsGame = require('./classes/PhaserStatsGame').default;
    game = new PhaserStatsGame(config);
}
else
{
    game = new Phaser.Game(config);
}

game.scene.start('boot');
