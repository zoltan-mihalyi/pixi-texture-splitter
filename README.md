# pixi-texture-splitter

Splits big textures to chunks and allows creating sub-textures using coordinates of the original texture.


```javascript

var splitted = new PIXI.extras.SplittedTexture(baseTexture, 256, 256); // creates 256*256 px chunks

var myTexture = splitted.subTexture(256, 384, 128, 128); // same as new PIXI.Texture(baseTexture, new PIXI.Rectangle(256, 384, 128, 128)) but uses the appropriate chunk

```