import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Wrapper = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let x = 100;
      let y = 100;
      let direction = 1;

      p.setup = () => {
        p.createCanvas(800, 600);
      };

      p.draw = () => {
        p.background(200);
        p.fill(50);
        p.noStroke();
        p.ellipse(x, y, 50, 50);

        x += 2 * direction;
        if (x > p.width - 25 || x < 25) {
          direction *= -1;
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    // Cleanup function to remove the p5 instance on component unmount
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Wrapper;