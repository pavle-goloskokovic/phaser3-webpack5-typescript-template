export const
    /**
     * Game title used for page title tag and metadata.
     * @type {string}
     */
    title =
        'Phaser 3.87, Webpack 5, and TypeScript template', // TODO update
    /**
     * Game description used for html page metadata.
     * @type {string}
     */
    description = 'TODO add description', // TODO update
    /**
     * Setting which enables us to quickly mute game sounds.
     * @type {boolean}
     */
    mute = false,
    /**
     * Setting which determines if stats should be enabled in game.
     * @type {boolean}
     */
    stats = true,
    /**
     * Game dimensions
     * @type {{w: number; h: number}}
     */
    size: {
        readonly w: number;
        readonly h: number;
    } = {
        w: 1070,
        h: 600
    },
    /**
     * Google Analytics 4 tag ID
     * @type {string}
     */
    tagId: string = null; // 'TAG_ID'; // TODO update
