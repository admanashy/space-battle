var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

function DeathStar(fileName, x, y, direction) {
    var me = this;
    this.image = new Image();
    this.x = x;
    this.y = y;
    this.type = 'plane';
    this.width = 150;
    this.height = 150;
    this.radius = me.width/2;
    this.loaded = false;
    this.direction = direction;
    this.speed = 10;

    this.image.onload = function () {
        me.loaded = true;
    };
    this.image.src = fileName;

    this.controls = {
        key32: false, //fire
        key37: false, //left
        key38: false, //up
        key39: false, //right
        key40: false//down
    };

    this.setKey = function (keyCode, keyState) {
        me.controls['key' + keyCode] = keyState;
    };

    this.draw = function (ctx) {
        if (me.loaded == true) {
            ctx.save();
            ctx.translate(me.x, me.y);
            ctx.rotate(me.direction * Math.PI / 180);
            ctx.drawImage(me.image, -(me.width / 2), -(me.height / 2), me.width, me.height);
            ctx.restore();
        }
    };

    this.update = function () {

        if (me.controls.key32 == true) {
            fireEvent('fire', {
                x: me.x,
                y: me.y,
                direction: me.direction
            });
        }

        if (me.controls.key38 == true) {
            me.moveUp();
        }

        if (me.controls.key40 == true) {
            me.moveDown();
        }

        if (me.controls.key37 == true) {
            me.turnLeft();
        }
        if (me.controls.key39 == true) {
            me.turnRight();
        }

    };

    this.turnLeft = function () {
        me.direction = me.direction - 5;
        return me.direction;
    };

    this.turnRight = function () {
        me.direction = me.direction + 5;
    };

    this.moveUp = function () {
        me.x = me.x + Math.sin(me.direction * Math.PI / 180) * 10;
        me.y = me.y + Math.cos(me.direction * Math.PI / 180) * 10;

    };

    this.moveDown = function () {
        me.x = me.x - Math.sin(me.direction * Math.PI / 180) * 10;
        me.y = me.y - Math.cos(me.direction * Math.PI / 180) * 10;

    };

}

