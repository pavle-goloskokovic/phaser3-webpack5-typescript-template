/**
 * Game entry point
 */

import '../css/style.css'; // loading css

import Phaser from 'phaser';
import PhaserGame = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;

import { size, stats } from './game.config';

import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { Game } from './scenes/Game';

const config: GameConfig = {
    parent: 'container', // parent id - '' means  no container
    width: size.w,
    height: size.h,
    scene: [
        Boot,
        Preloader,
        Game
    ],
    loader: {
        maxRetries: 10
    }
};

// Choosing implementation based on 'stats' app config setting
if (process.env.NODE_ENV !== 'production' && stats)
{
    const { PhaserStatsGame } = require('./classes/PhaserStatsGame');
    new PhaserStatsGame(config);
}
else
{
    new PhaserGame(config);
}
