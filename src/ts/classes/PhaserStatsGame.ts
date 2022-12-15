import Stats from 'stats.js';

/**
 * Phaser game implementation which adds performance stats to the game.
 */
export default class PhaserStatsGame extends Phaser.Game {

    private stats: Stats;

    protected boot (): void
    {
        super.boot();

        const stats = this.stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

        const dom = stats.dom;
        const style = dom.style;
        style.top = style.left = '';
        style.bottom = style.right = '0';

        this.canvas.parentNode.appendChild(dom);
    }

    step (time: integer, delta: number): void
    {
        const stats = this.stats;
        stats.begin();
        super.step(time, delta);
        stats.end();
    }
}
