const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const {width, height} = canvas;

const particleSize = 2;
const attractionCoefficient = 0.05;

const types = ["red", "blue", "white", "yellow", "pink"];

const attractionTable = []

for (let i = 0; i < types.length; ++i) {
    attractionTable.push([])
    for (let j = 0; j < types.length; ++j) {
        const attraction = (Math.random() - 0.3) * 10;
        attractionTable[i].push(attraction);
    }
}

class Particle {
    constructor(type, x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.type = type;
    }
}

const particles = []

const genParticles = (type, count) => {
    for (let i = 0; i < count; ++i) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        particles.push(new Particle(type, x, y));
    }
}

for (let i = 0; i < types.length; ++i) {
    genParticles(i, 600);
}

const loop = () => {

    for (let i = 0; i < particles.length; ++i) {
        for (let j = 0; j < particles.length; ++j) {
            const a = particles[i], b = particles[j];
            
            const typesAttraction = attractionTable[a.type][b.type];
            
            const dx = b.x - a.x, dy = b.y - a.y;
            const distance = (dx * dx + dy * dy);

            if (distance == 0) continue;

            const attraction = (
                attractionCoefficient *
                typesAttraction /
                (distance)
            );

            particles[i].vx += attraction * (dx);
            particles[i].vy += attraction * (dy);
        }
    }

    for (let particle of particles) {
        if (particle.x + particle.vx < 0 || particle.x + particle.vx >= width - particleSize)
            particle.vx = -particle.vx;
        if (particle.y + particle.vy < 0 || particle.y + particle.vy >= height - particleSize)
            particle.vy = -particle.vy;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const mult = 0.95 + Math.random() * 0.06;
        particle.vx *= mult;
        particle.vy *= mult;
    }

    ctx.clearRect(0, 0, width, height);
    for (let particle of particles) {
        ctx.fillStyle = types[particle.type];
        ctx.fillRect(particle.x, particle.y, particleSize, particleSize);
    }
}

setInterval(loop, 20);
