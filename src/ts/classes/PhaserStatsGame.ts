import * as Stats from 'stats.js';

/**
 * Phaser game implementation which adds performance stats to the game.
 */
export default class PhaserStatsGame extends Phaser.Game {

    private stats: Stats;

    constructor (config?: Phaser.Types.Core.GameConfig)
    {
        super(config);

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

        this.stats.dom.style.top = this.stats.dom.style.left = '';
        this.stats.dom.style.bottom = this.stats.dom.style.right = '0';
    }

    protected boot (): void
    {
        super.boot();

        this.canvas.parentNode.appendChild(this.stats.dom);
    }

    step (time: integer, delta: number): void
    {
        this.stats.begin();
        super.step(time, delta);
        this.stats.end();
    }
}
