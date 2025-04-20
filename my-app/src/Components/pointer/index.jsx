// import React, { useEffect, useRef, useState } from "react";
// import paper from "paper";
// // import SimplexNoise from "simplex-noise";
// import "./index.css";

// const Cursor = () => {
//   const canvasRef = useRef(null);
//   const [clientX, setClientX] = useState(-100);
//   const [clientY, setClientY] = useState(-100);
//   const [isStuck, setIsStuck] = useState(false);
//   const [stuckX, setStuckX] = useState(0);
//   const [stuckY, setStuckY] = useState(0);
//   let lastX = 0, lastY = 0, group;

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setClientX(e.clientX);
//       setClientY(e.clientY);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     return () => document.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const innerCursor = document.querySelector(".cursor--small");
//     const render = () => {
//       if (innerCursor) {
//         innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
//       }
//       requestAnimationFrame(render);
//     };
//     requestAnimationFrame(render);
//   }, [clientX, clientY]);

//   useEffect(() => {
//     if (canvasRef.current) {
//       paper.setup(canvasRef.current);
//       const shapeBounds = { width: 75, height: 75 };
//       const polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), 8, 15);
//       polygon.strokeColor = "rgba(255, 0, 0, 0.5)";
//       polygon.strokeWidth = 1;
//       polygon.smooth();
//       group = new paper.Group([polygon]);
//       group.applyMatrix = false;
//     }
//     paper.view.onFrame = () => {
//       lastX = lerp(lastX, clientX, 0.2);
//       lastY = lerp(lastY, clientY, 0.2);
//       if (group) {
//         group.position = new paper.Point(lastX, lastY);
//       }
//     };
//   }, [clientX, clientY]);

//   useEffect(() => {
//     const handleMouseEnter = (e) => {
//       const rect = e.currentTarget.getBoundingClientRect();
//       setStuckX(rect.left + rect.width / 2);
//       setStuckY(rect.top + rect.height / 2);
//       setIsStuck(true);
//     };

//     const handleMouseLeave = () => {
//       setIsStuck(false);
//     };

//     const linkItems = document.querySelectorAll(".link");
//     linkItems.forEach(item => {
//       item.addEventListener("mouseenter", handleMouseEnter);
//       item.addEventListener("mouseleave", handleMouseLeave);
//     });

//     return () => {
//       linkItems.forEach(item => {
//         item.removeEventListener("mouseenter", handleMouseEnter);
//         item.removeEventListener("mouseleave", handleMouseLeave);
//       });
//     };
//   }, []);

//   return (
//     <>
//       <div className="cursor cursor--small"></div>
//       <canvas ref={canvasRef} className="cursor cursor--canvas" />
//     </>
//   );
// };

// const lerp = (a, b, n) => (1 - n) * a + n * b;

// export default Cursor;

import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
// Correctly import named functions from simplex-noise
import { createNoise2D } from 'simplex-noise'; // Import only named functions
import "./index.css";

const Cursor = () => {
  const canvasRef = useRef(null);
  const [clientX, setClientX] = useState(-100);
  const [clientY, setClientY] = useState(-100);
  let lastX = -100, lastY = -100, group;

  const noise = createNoise2D(); // Use createNoise2D instead of SimplexNoise

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e) => {
      setClientX(e.clientX);
      setClientY(e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const innerCursor = document.querySelector(".cursor--small");

    const render = () => {
      if (innerCursor) {
        innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, [clientX, clientY]);

  useEffect(() => {
    if (!canvasRef.current) return;

    paper.setup(canvasRef.current);

    const shapeBounds = { width: 75, height: 75 };
    const strokeColor = "rgba(255, 255, 0, 0.5)";
    const strokeWidth = 1;
    const segments = 8;
    const radius = 15;

    // Create the red noisy circle
    const polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), segments, radius);
    polygon.strokeColor = strokeColor;
    polygon.strokeWidth = strokeWidth;
    polygon.smooth();
    group = new paper.Group([polygon]);
    group.applyMatrix = false;

    // Initialize bigCoordinates with random positions for each segment
    let bigCoordinates = polygon.segments.map(() => [Math.random() * 100, Math.random() * 100]);

    // Linear interpolation for smooth motion
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    // Paper.js Animation Loop
    paper.view.onFrame = () => {
      lastX = lerp(lastX, clientX, 0.2);
      lastY = lerp(lastY, clientY, 0.2);
      group.position = new paper.Point(lastX, lastY);

      // Add noise for smooth animation
      polygon.segments.forEach((segment, i) => {
        const noiseX = noise(lastX * 0.01, lastY * 0.01);
        const noiseY = noise(lastY * 0.01, lastX * 0.01);
        const distortionX = map(noiseX, -1, 1, -10, 10);
        const distortionY = map(noiseY, -1, 1, -10, 10);

        // Ensure bigCoordinates[i] exists before accessing
        if (bigCoordinates[i]) {
          segment.point.set(bigCoordinates[i][0] + distortionX, bigCoordinates[i][1] + distortionY);
        }
      });

      polygon.smooth();
    };
  }, [clientX, clientY]);

  // Function to map values
  const map = (value, in_min, in_max, out_min, out_max) => {
    return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  return (
    <>
      <div className="cursor cursor--small"></div>
      <canvas ref={canvasRef} className="cursor cursor--canvas" />
    </>
  );
};

export default Cursor;
