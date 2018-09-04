declare module '@eversource/pixi-texture-splitter' {
    import BaseTexture = PIXI.BaseTexture;

    export class SplitTexture {
        constructor(baseTexture: BaseTexture, width?: number, height?: number);

        subTexture(x: number, y: number, width: number, height: number);
    }
}