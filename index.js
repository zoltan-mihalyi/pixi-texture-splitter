(function f(factory) {
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('pixi.js'));
    } else if (typeof PIXI !== 'undefined') {
        // global variable
        factory({}, PIXI);
    } else {
        throw new Error('Cannot determine module system!');
    }
})(function (exports, PIXI) {
    function SplittedTexture(texture, maxWidth, maxHeight) {
        if (!(texture instanceof PIXI.BaseTexture)) {
            throw new Error('Texture is not PIXI.BaseTexture!');
        }
        maxWidth = maxWidth || 2048;
        maxHeight = maxHeight || 2048;

        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.data = [];

        for (var x = 0; x < texture.width; x += maxWidth) {
            var column = [];
            for (var y = 0; y < texture.height; y += maxHeight) {
                var canvas = document.createElement('canvas');
                canvas.width = Math.min(maxWidth, texture.width - x);
                canvas.height = Math.min(maxHeight, texture.height - y);
                canvas.getContext('2d').drawImage(texture.source, -x, -y);
                column.push(PIXI.BaseTexture.fromCanvas(canvas))
            }
            this.data.push(column);
        }
    }

    SplittedTexture.prototype.subTexture = function (x, y, w, h) {
        var column = Math.floor(x / this.maxWidth);
        var row = Math.floor(y / this.maxHeight);

        var col = this.data[column];
        if (!col) {
            throw new Error('Out of bounds');
        }
        var cell = col[row];
        if (!cell) {
            throw new Error('Out of bounds');
        }

        return new PIXI.Texture(cell, new PIXI.Rectangle(x % this.maxWidth, y % this.maxHeight, w, h));
    };

    PIXI.extras.SplittedTexture = SplittedTexture;

    exports.SplittedTexture = SplittedTexture;
});
