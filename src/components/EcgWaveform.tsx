'use client';

import React, { useEffect, useRef } from 'react';

export function EcgWaveform({ className = 'h-10 w-full', strokeColor = '#E06D53' }: { className?: string; strokeColor?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateDimensions = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * dpr;
      height = canvas.height = rect.height * dpr;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    let lastTime = 0;
    const fpsInterval = 1000 / 45; // Smooth 45fps cap for ultra-low CPU

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || width === 0 || height === 0) return;

      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.8 * dpr;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      const midY = height / 2;
      const step = 3 * dpr;
      const period = 160 * dpr;

      for (let x = 0; x < width; x += step) {
        const cycleX = (x + offset) % period;
        let y = midY;

        // ECG P-Q-R-S-T wave pattern
        if (cycleX > 25 && cycleX < 40) {
          y = midY - Math.sin(((cycleX - 25) / 15) * Math.PI) * (height * 0.12);
        } else if (cycleX >= 50 && cycleX < 55) {
          y = midY + (height * 0.1);
        } else if (cycleX >= 55 && cycleX < 65) {
          y = midY - (height * 0.42);
        } else if (cycleX >= 65 && cycleX < 72) {
          y = midY + (height * 0.2);
        } else if (cycleX >= 90 && cycleX < 120) {
          y = midY - Math.sin(((cycleX - 90) / 30) * Math.PI) * (height * 0.16);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      offset += 1.8 * dpr;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [strokeColor]);

  return <canvas ref={canvasRef} className={`${className} will-change-transform transform-gpu`} />;
}
