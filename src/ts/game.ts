/**
 * Game entry point
 */

import '../css/style.css'; // loading css

import 'phaser'; // loading Phaser

import {size, stats} from './game.config';

import Boot from './scenes/Boot';
import Preloader from './scenes/Preloader';
import Game from './scenes/Game';

/**
 * Phaser game config
 * @type {Phaser.Types.Core.GameConfig}
 */
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'container', // parent id - '' means  no container
    width: size.x,
    height: size.y,
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
if (process.env.NODE_ENV !== 'production' && stats)
{
    const PhaserStatsGame = require('./classes/PhaserStatsGame').default;
    game = new PhaserStatsGame(config);
}
else
{
    game = new Phaser.Game(config);
}

game.scene.start('boot');
