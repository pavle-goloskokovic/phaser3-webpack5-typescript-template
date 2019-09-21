import * as logger from 'js-logger'

/**
 * Game title used for page title tag.
 * @type {string}
 */
export const title = 'Phaser TypeScript Boilerplate';
/**
 * Game description used for html page metadata.
 * @type {string}
 */
export const description = 'TODO add description';
/**
 * Setting which enables us to quickly mute game sounds.
 * @type {boolean}
 */
export const mute = false;
/**
 * Setting which determines if stats should be enabled in game.
 * Based on this setting we choose which Phaser.Game implementation we want to use.
 * @type {boolean}
 */
export const stats = true;
/**
 * Setting defining the global logging filter level.
 * @type {ILogLevel}
 */
export const logLevel = process.env.NODE_ENV !== 'production' ? logger.DEBUG : logger.ERROR;
/**
 * Game dimensions
 * @type {{x: number; y: number}}
 */
export const size: {
    readonly x:number
    readonly y:number
} = {
    x: 1070,
    y: 600
};
/**
 * Game orientation
 * @type {{forceLandscape: boolean; forcePortrait: boolean}}
 */
export const orientation: {
    readonly forceLandscape:boolean
    readonly forcePortrait:boolean
} = {
    forceLandscape: false,
    forcePortrait: false
};
/**
 * Google analytics ID
 * @type {string}
 */
export const analyticsId = 'UA-000000-2';
