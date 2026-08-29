'use client';

import React, { useEffect, useRef } from 'react';

export function EcgWaveform({ className = 'h-10 w-full', strokeColor = '#E06D53' }: { className?: string; strokeColor?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      const width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
      const height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2 * window.devicePixelRatio;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      const midY = height / 2;
      const step = 2 * window.devicePixelRatio;
      const period = 180 * window.devicePixelRatio;

      for (let x = 0; x < width; x += step) {
        const cycleX = (x + offset) % period;
        let y = midY;

        // ECG P-Q-R-S-T wave pattern
        if (cycleX > 30 && cycleX < 45) {
          // P wave
          y = midY - Math.sin(((cycleX - 30) / 15) * Math.PI) * (height * 0.12);
        } else if (cycleX >= 55 && cycleX < 60) {
          // Q dip
          y = midY + (height * 0.1);
        } else if (cycleX >= 60 && cycleX < 70) {
          // R spike
          y = midY - (height * 0.42);
        } else if (cycleX >= 70 && cycleX < 78) {
          // S dip
          y = midY + (height * 0.22);
        } else if (cycleX >= 100 && cycleX < 130) {
          // T wave
          y = midY - Math.sin(((cycleX - 100) / 30) * Math.PI) * (height * 0.18);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      offset += 1.2 * window.devicePixelRatio;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [strokeColor]);

  return <canvas ref={canvasRef} className={className} />;
}
