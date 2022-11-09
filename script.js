//Playing around with Canvas - Basics

//Access the canvas element in HTML
const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

/*Event listener to ensure when user resizes browser window 
that it doesnt alter our image */
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 20, 150, 50);
})

//Particles 

const mouse = {
    x: undefined, 
    y: undefined, 
}
canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
})


canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
})

function drawCircle() {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
}

class Particle {
    constructor(){
        //this.x = mouse.x;
        //this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1; 
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5; 
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 100; i++){
        particlesArray.push(new Particle())
    }
}

init();

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

//End of Particle Animation

// //Circle styling 
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 12;
// ctx.beginPath();
// ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
// ctx.stroke();
// ctx.fill();
