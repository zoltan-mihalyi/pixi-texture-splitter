var app = new PIXI.Application({width: 512, height: 256});

document.body.appendChild(app.view);

PIXI.loader.add('test.png').load(function (loader, resources) {
    var baseTexture = resources['test.png'].texture;

    var split = new PIXI.extras.SplitTexture(baseTexture.baseTexture, 64, 64);

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            addBoth(baseTexture, split, i * 16, j * 16);
        }
    }
});

function addBoth(baseTexture, split, x, y) {

    var sprite = new PIXI.Sprite(split.subTexture(x, y, 16, 16));
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    var sprite2 = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, 16, 16)));
    sprite2.x = x + 200;
    sprite2.y = y;
    app.stage.addChild(sprite2);

}