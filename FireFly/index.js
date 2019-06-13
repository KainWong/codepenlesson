var c = document.getElementById('c');
var ctx = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var clearColor = 'rgba(0,0,0,.1)';
var fireFly = [];
var boom = [];
function random(min,max) {
    return Math.random() * (max-min) +min;
}

function FireFly() {};
FireFly.prototype = {
    init: function() {
        this.x = random(0,w);
        this.y = h;
        this.vy = random(4,5);
        this.color = 'rgb(' + 255 *random(0,1) + ',' + 255 *random(0,1) + ',' + 255 *random(0,1) + ')';
        this.top = random(0,h/2);
        this.size = 2;
    },
    draw: function(index){
        if(this.y > this.top) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size*5);
        }else {
            boom[index].init(this.x,this.y,this.color)
        }
        this.update();
    },
    update: function() {
        if(this.y > this.top) {
            this.y -= this.vy;
        } else {
            this.init();
        }
    }
}

function Boom() {};
Boom.prototype = {
    init: function(x,y,color) {
        this.particle = new Array(100);
        for(let i = 0;i <100;i++) {
            this.particle[i] = {};
            this.particle[i].x = x;
            this.particle[i].y = y;
            this.particle[i].size = 2; 
            this.particle[i].color = color;    
            this.particle[i].alpha = 1;  
            this.particle[i].speed = 4;
            this.particle[i].angle = Math.PI*2*i/100;
            this.particle[i].gravity = 0.05
        }
    },
    draw: function(index){
        this.particle.forEach(element => {
            if(element.alpha > 0) {
                ctx.fillStyle = element.color;
                ctx.fillRect(element.x, element.y, element.size, element.size);
            } else {
            }
        });
        this.update();
    },
    update: function() {
        this.particle.forEach(element => {
            if(element.alpha >0){
                element.alpha -= 0.0005;
                element.x += Math.cos(element.angle) * element.speed*0.2;
                element.y += Math.sin(element.angle) * (element.speed*0.2 + element.gravity);
            } else {
                this.init();
            }
        });
    }
}

for(let index = 0; index <15; index++ ) {
    boom[index] = new Boom();
}

for(let index = 0; index <15; index++ ) {
    fireFly[index] = new FireFly();
}

function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0,0,w,h);
    fireFly.forEach((element,index) => {
        element.draw(index);
    });
    boom.forEach(element => {
        element.draw();
    });
    requestAnimationFrame(anim);
}

anim();