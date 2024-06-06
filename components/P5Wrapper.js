import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const P5Wrapper = () => {
  const sketchRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p5 = require('p5');

      const sketch = (p) => {
        let particles = [];
        let numParticles = 100;
        let particleColor = 'rgba(200,169,169,0.5)';
        let particleSpeed = 1;

        class Particle {
          constructor(x, y) {
            this.x = x;
            this.y = y;
            this.r = p.random(5, 15);
            this.xSpeed = p.random(-2, 2) * particleSpeed;
            this.ySpeed = p.random(-1, 1.5) * particleSpeed;
          }

          createParticle() {
            p.noStroke();
            p.fill(particleColor);
            p.ellipse(this.x, this.y, this.r);
          }

          moveParticle() {
            if (this.x < 0 || this.x > p.width)
              this.xSpeed *= -1;
            if (this.y < 0 || this.y > p.height)
              this.ySpeed *= -1;
            this.x += this.xSpeed;
            this.y += this.ySpeed;
          }

          joinParticles(particles) {
            particles.forEach(element => {
              let dis = p.dist(this.x, this.y, element.x, element.y);
              if (dis < 85) {
                p.stroke('rgba(255,255,255,0.04)');
                p.line(this.x, this.y, element.x, element.y);
              }
            });
          }
        }

        p.setup = () => {
          p.createCanvas(800, 600);
          for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(p.random(p.width), p.random(p.height)));
          }
        };

        p.draw = () => {
          p.background(0);
          for (let i = 0; i < numParticles; i++) {
            particles[i].createParticle();
            particles[i].moveParticle();
            particles[i].joinParticles(particles.slice(i));
          }
        };

        p.mousePressed = () => {
          particles.push(new Particle(p.mouseX, p.mouseY));
        };

        p.keyPressed = () => {
          if (p.key === 'c') {
            // Change particle color
            particleColor = `rgba(${p.random(255)},${p.random(255)},${p.random(255)},0.5)`;
          } else if (p.key === 's') {
            // Change particle speed
            particleSpeed = p.random(0.5, 2);
            particles.forEach(particle => {
              particle.xSpeed = p.random(-2, 2) * particleSpeed;
              particle.ySpeed = p.random(-1, 1.5) * particleSpeed;
            });
          }
        };
      };

      const p5Instance = new p5(sketch, sketchRef.current);

      // Cleanup function to remove the p5 instance on component unmount
      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  return <div ref={sketchRef}></div>;
};

// Disable SSR for this component
export default dynamic(() => Promise.resolve(P5Wrapper), { ssr: false });
