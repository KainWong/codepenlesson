var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var clearColor = 'rgba(0,0,0,.1)';
var raindrop = [];
var rippling = [];
function random(min,max) {
    return Math.random() * (max-min) +min;
}

function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

function RainDrop() {};
RainDrop.prototype =  {
    init: function() {
        this.x = random(0,w);
        this.y = 0;
        this.color = 'hsl(180,100%,50%)';
        this.vy = random(4,5);
        this.hit = random(h*.8,h*.9);
        this.size = 2;
    },
    draw: function(index) {
        if(this.y <this.hit) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size*5);
        }else {
            rippling[index].init(this.x,this.y);
        }
        this.update();
    },
    update: function() {
        if(this.y < this.hit) {
            this.y +=this.vy;
        }else {
            this.init();
        }
    }
}

function Rippling() {};
Rippling.prototype = {
    init: function(x,y) {
        this.x = x;
        this.y = y;
        this.w = Math.random(2,4);
        this.h = Math.random(1,2);;
        this.vw = 3;
        this.vh = 1;
        this.a = 1;
        this.va = .96;
    },
    draw: function() {
        ctx.beginPath();
        ctx.moveTo(this.x,this.y - this.h /2);
        ctx.bezierCurveTo(
            this.x + this.w / 2, this.y - this.h /2,
            this.x + this.w / 2, this.y + this.h / 2,
            this.x, this.y + this.h / 2
        );
        ctx.bezierCurveTo(
            this.x - this.w / 2, this.y + this.h / 2,
            this.x - this.w / 2, this.y - this.h / 2,
            this.x, this.y - this.h / 2
        );
        ctx.strokeStyle = 'hsla(180, 100%, 50%, ' + this.a + ')';
        ctx.stroke();
        ctx.closePath();
        this.update();
    },
    update: function() {
        if(this.a > .03) {
            this.w += this.vw;
            this.h += this.vh;
            if(this.w >100) {
                this.a *= this.va;
                this.vw *= .98;
                this.vh *= .98;
            }
        } else {
            this.init();
        }
    }
};


for(let index = 0; index <30; index++ ) {
    rippling[index] = new Rippling();
}

for (let index = 0; index < 30; index++) {
     raindrop[index] = new RainDrop();
     setTimeout(function(){
        raindrop[index].init();
     },Math.random(1,100)*1000)
}

// var rippling = new Rippling();


function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0,0,w,h);
    raindrop.forEach((element,index) => {
        element.draw(index);
    });
    rippling.forEach(element => {
        element.draw();
    });
    
    // rippling.draw();
    requestAnimationFrame(anim);
}

window.addEventListener("resize", resize);

anim();