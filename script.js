const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        /* this.characters = `abcdefghijklmnopqrstuvwxyz`; Latin lowercase alphabet */
        /* this.characters = `αβγδεζηθικλμνξοπρστυφχψω`; Greek lowercase alphabet */
        /* this.characters = `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ`; Katakana alphabet */
        /* this.characters = `01`; Binary alphabet */
        /* this.characters = `日ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜTHEMATRIXBCDFGHJKLMRNOPQXYWZ00000011111123456789:;.,#@"'=*+-<>{}/&$¦｜_λ? \` \\ :;.,#@"'=*+-<>{}/&$¦｜_λ? \` \\                                                                       `; Latin uppercase + Katakana + Binary alphabet */
        this.characters = `日ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜTHEMATRIX00000011111123456789:;.,#@"'=*+-<>{}/&$¦｜_λ? \` \\ :;.,#@"'=*+-<>{}/&$¦｜_λ? \` \\                                                                       `; /* The Matrix alphabet */
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = ' ';
        this.canvasHeight = canvasHeight;
    }
    
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillStyle = '#0aff0a';
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 16;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        this.resize(canvasWidth, canvasHeight);
    }
    #initialize(){
        for (let i=0; i < this.columns; i++) {
            const y = Math.floor(Math.random() * this.canvasHeight / this.fontSize) * - 1;
            this.symbols[i] = new Symbol(i, y, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0aff0a';
        ctx.shadowBlur = 16;
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = -30;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
