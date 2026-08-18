"use client";

import React, { useEffect, useRef } from "react";

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dashes: DashParticle[] = [];
    let dust: DustParticle[] = [];
    let mouse = { x: -1000, y: -1000, radius: 250 };
    let time = 0;

    // Dust Particle (micro starry noise in the background)
    class DustParticle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.0 + 0.3;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.speed = Math.random() * 0.08 + 0.02;
      }

      update(w: number, h: number) {
        this.y -= this.speed;
        if (this.y < 0) {
          this.y = h;
          this.x = Math.random() * w;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(244, 244, 245, ${this.opacity})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    // Magnetic Dash Particle (resembles the Antigravity dashboard wave)
    class DashParticle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      length: number;
      width: number;
      angle: number;
      targetAngle: number;
      color: string;
      glowColor: string;
      opacity: number;
      speedOffset: number;

      constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.length = Math.random() * 6 + 6; // 6px to 12px long
        this.width = Math.random() * 1.2 + 1.2; // 1.2px to 2.4px thick
        this.angle = 0;
        this.targetAngle = 0;
        this.opacity = Math.random() * 0.35 + 0.15;
        this.speedOffset = Math.random() * 0.02;

        // Calculate color gradient based on spatial coordinate
        const ratio = x / w;
        const yRatio = y / h;
        
        // Sky Blue (#38bdf8) -> Indigo (#6366f1) -> Pink (#ec4899)
        if (ratio < 0.35) {
          // Blue/Teal spectrum
          this.color = `rgba(56, 189, 248, ${this.opacity})`;
          this.glowColor = "rgba(56, 189, 248, 0.4)";
        } else if (ratio < 0.65) {
          // Indigo spectrum
          this.color = `rgba(99, 102, 241, ${this.opacity})`;
          this.glowColor = "rgba(99, 102, 241, 0.4)";
        } else {
          // Pink/Purple spectrum
          this.color = `rgba(236, 72, 153, ${this.opacity})`;
          this.glowColor = "rgba(236, 72, 153, 0.4)";
        }
      }

      update(w: number, h: number, t: number) {
        // 1. Slow fluid flow oscillation using wave functions
        const waveX = Math.sin(t * 0.5 + this.baseY * 0.003) * 15;
        const waveY = Math.cos(t * 0.4 + this.baseX * 0.003) * 15;
        this.x = this.baseX + waveX;
        this.y = this.baseY + waveY;

        // 2. Flow field base angle (curved trajectory flowing from bottom-left to top-right)
        const baseFlowAngle = Math.sin(this.x * 0.002 + this.y * 0.0015 + t * 0.2) * 0.4 + Math.PI / 4;
        this.targetAngle = baseFlowAngle;

        // 3. Mouse attraction and magnetic orientation (torque)
        const dx = mouse.x - this.x;
        const db = mouse.y - this.y;
        const dist = Math.hypot(dx, db);

        let activeOpacity = this.opacity;

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          
          // Re-orient (torque) towards the mouse coordinates
          const angleToMouse = Math.atan2(db, dx);
          this.targetAngle = angleToMouse + Math.PI / 2; // perpendicular or aligned

          // Increase brightness/opacity near the cursor
          activeOpacity = Math.min(1.0, this.opacity + force * 0.4);

          // Subtle pull/push displacement
          this.x += (dx / dist) * force * 15;
          this.y += (db / dist) * force * 15;
        }

        // Smoothly interpolate current angle towards target angle
        const angleDiff = this.targetAngle - this.angle;
        this.angle += angleDiff * 0.08;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);

        // Draw the magnetic vector line
        c.beginPath();
        c.moveTo(-this.length / 2, 0);
        c.lineTo(this.length / 2, 0);
        
        c.strokeStyle = this.color;
        c.lineWidth = this.width;
        c.lineCap = "round";

        // Add a subtle glow on hover
        const dx = mouse.x - this.x;
        const db = mouse.y - this.y;
        if (Math.hypot(dx, db) < mouse.radius * 0.6) {
          c.shadowColor = this.glowColor;
          c.shadowBlur = 4;
        }

        c.stroke();
        c.restore();
      }
    }

    // Initialize particles in a flow pattern
    const init = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      // 1. Generate background dust
      dust = [];
      const dustCount = Math.floor((w * h) / 10000);
      for (let i = 0; i < dustCount; i++) {
        dust.push(new DustParticle(w, h));
      }

      // 2. Generate vector dash points structured in a density wave
      dashes = [];
      const columns = Math.floor(w / 50);
      const rows = Math.floor(h / 50);

      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
          // Add random jitter to coordinates for a natural fluid distribution
          const jitterX = (Math.random() - 0.5) * 20;
          const jitterY = (Math.random() - 0.5) * 20;
          const x = c * 50 + 25 + jitterX;
          const y = r * 50 + 25 + jitterY;

          // Denser clustering on the left side of the screen to mimic the reference image
          const isDensityCluster = Math.random() < (1.0 - (x / w) * 0.7);

          if (isDensityCluster) {
            dashes.push(new DashParticle(x, y, w, h));
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw dust
      dust.forEach((d) => {
        d.update(canvas.width, canvas.height);
        d.draw(ctx);
      });

      // Draw magnetic dashes
      dashes.forEach((p) => {
        p.update(canvas.width, canvas.height, time);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Run
    init();
    animate();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
}
