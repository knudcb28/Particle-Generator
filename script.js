//Playing around with Canvas - Basics

//Access the canvas element in HTML
const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

/*Event listener to ensure when user resizes browser window 
that it doesnt alter our image */
// window.addEventListener('resize', function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.fillStyle = 'white';
//     ctx.fillRect(10, 20, 150, 50);
// })

//Particles 

const mouse = {
    x: undefined, 
    y: undefined, 
}
canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }   // drawCircle();
})


canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    } 
    // drawCircle();
})

// function drawCircle() {
//     ctx.fillStyle = 'blue';
//     // ctx.strokeStyle = 'white';
//     // ctx.lineWidth = 12;
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
//     ctx.stroke();
//     ctx.fill();
// }

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 1; 
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5; 
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.strokeStyle = 'white';
        // ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }
}

// function init(){
//     for (let i = 0; i < 100; i++){
//         particlesArray.push(new Particle())
//     }
// }

// init();

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i+1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].x - particlesArray[j].x;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color; 
                // ctx.lineWidth = 0.5;
                ctx.lineWidth = particlesArray[i].size/10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            console.log(particlesArray.length);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 2;
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
