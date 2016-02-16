var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


function Circle (x, y, radius){
    var me = this;
    this.x = x;
    this.y = y;
    this.radius=radius;
    this.type = 'bot';
    this.fillColor = '#FF6666';
    this.update = function () {
        
    };
    
    this.setFillColor = function(newFillColor){
        me.fillColor = newFillColor;
    };
    
    this.draw = function(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#33CC66';
        ctx.lineWidth = 4;
        ctx.fillStyle = me.fillColor;

        ctx.arc(me.x,me.y,me.radius,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };
}



function Background(fileName) {
    var me = this;
    this.image = new Image();
    this.loaded = false;
    this.image.onload = function () {
        me.loaded = true;
    };
    this.image.src = fileName;
    
    this.update = function () {
        
    }

    this.draw = function (ctx) {
        if (me.loaded == true) {
            ctx.save();
            ctx.drawImage(me.image, 0, 0);
            ctx.restore();
        }
    };
}


var deathStar = new DeathStar('images/DeathStar.png', 500, 300, 0);
var background = new Background('images/background.jpg');
var circle1 = new Circle (100,100,50);
var circle2 = new Circle (250,120,50);
var circle3 = new Circle (800,450,50);
var circle4 = new Circle (350,500,50);

var drawElements = [];
var collisionDetection=[];

collisionDetection.push(circle1);
collisionDetection.push(circle2);
collisionDetection.push(circle3);
collisionDetection.push(circle4);
collisionDetection.push(deathStar)

function collisionCheck(){
    var obj1, obj2, dist;
    for (var i = 0; i<collisionDetection.length; i++){
        obj1 = collisionDetection[i];
        for (var j = 0; j<collisionDetection.length; j++){
        obj2 = collisionDetection[j]; 
         if (i != j){
             dist = Math.sqrt(Math.pow(obj1.x - obj2.x, 2)+Math.pow(obj1.y - obj2.y, 2));
            // Collision between two objects 
            if(dist<obj1.radius+obj2.radius){
                
                if (obj1.type == 'plane'&&obj2.type =='bot'){
                    //obj1.explode();
                    //obj1.needRemove = 'True';
                    obj2.setFillColor('#33CC66');
                }
                
            }
         }
        }
    }
} 


drawElements.push(background);
drawElements.push(deathStar);
drawElements.push(circle1);
drawElements.push(circle2);
drawElements.push(circle3);
drawElements.push(circle4);

setInterval(function () {
    context.clearRect(0, 0, 1000, 598);
    //collisionCheck();
    //clearGarbage();
    for (var i = 0; i < drawElements.length; i++) {
        drawElements[i].update();
        drawElements[i].draw(context);
    }
}, 30);

/*drawElement.splice(index,count);
 * 
 * var indexOfElementToRemove = drawElement.indexOf(objectToRemove);
 * drawElemnts.splice(indexOfElementToRemove,1)
 * 
 * 
 */

document.addEventListener('keydown', function (event) {
    console.log(event);

    deathStar.setKey(event.keyCode, true);

});

document.addEventListener('keyup', function (event) {
    console.log(event);

    deathStar.setKey(event.keyCode, false);

});
var events ={
    fire:[]
}

function Bullet(params){
    this.x = params.x;
}

addListener('fire',
    function(params){
        var bullet = new Bullet(params);
        drawElements.push(bullet);
    }
);

function addListner(eventName,functionCallback){
    events[eventName].push(functionCallback);
}

function fireEvent(eventName,params){
    for (var i=0; i < events[eventName].length; i++){
        events [eventName][i](params);
    }
}










