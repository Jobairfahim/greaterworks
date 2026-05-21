/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// The pixelated grid pattern for "404"
// Exactly 17 columns x 7 rows for mathematically perfect alignment
const INVADER_GRID = [
  [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
];

// Classic pixel art shape for the shields/barriers
const SHIELD_SHAPE = [
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
];

interface Invader {
  gridX: number;
  gridY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

interface ShieldBlock {
  x: number;
  y: number;
  active: boolean;
}

interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  vy: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface TextPopup {
  x: number;
  y: number;
  text: string;
  alpha: number;
  vy: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}

const NotFound = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // React State for HUD Elements
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<"playing" | "gameover">("playing");

  // Input states & game reset tracking triggers
  const keysRef = useRef({
    left: false,
    right: false,
    shoot: false,
  });

  const lastShotTimeRef = useRef(0);
  const restartTriggerRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Initialize Game Objects
  const initInvaders = (lvl: number, startYOffset = 85) => {
    const list: Invader[] = [];
    const blockSize = 18;
    const gap = 2;
    const gridWidth = 17 * (blockSize + gap);
    const startX = (800 - gridWidth) / 2; // Centered inside 800px canvas

    for (let r = 0; r < INVADER_GRID.length; r++) {
      for (let c = 0; c < INVADER_GRID[r].length; c++) {
        if (INVADER_GRID[r][c] === 1) {
          list.push({
            gridX: c,
            gridY: r,
            x: startX + c * (blockSize + gap),
            y: startYOffset + r * (blockSize + gap),
            width: blockSize,
            height: blockSize,
            active: true,
          });
        }
      }
    }
    return list;
  };

  const initShields = () => {
    const blocks: ShieldBlock[] = [];
    const startYs = 360;
    const size = 6;
    const spacing = 160; // Spacing between centers
    const firstCenter = 160;

    for (let s = 0; s < 4; s++) {
      const center = firstCenter + s * spacing;
      const startX = center - 24; // (8 cols * 6px width) / 2 = 24px

      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          if (SHIELD_SHAPE[r][c] === 1) {
            blocks.push({
              x: startX + c * size,
              y: startYs + r * size,
              active: true,
            });
          }
        }
      }
    }
    return blocks;
  };

  const initStars = () => {
    const list: Star[] = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        speed: Math.random() * 0.9 + 0.25,
        size: Math.random() * 2 + 1,
      });
    }
    return list;
  };

  // Game restart trigger
  const restartGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameState("playing");
    restartTriggerRef.current += 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Stable local mutable variables closed over in useEffect to bypass React dependency resets
    let localScore = 0;
    let localLives = 3;
    let localLevel = 1;
    let localGameState = "playing";
    let lastRestartTrigger = restartTriggerRef.current;

    let invaders = initInvaders(localLevel);
    let shields = initShields();
    let stars = initStars();
    let playerBullets: Bullet[] = [];
    let enemyBullets: Bullet[] = [];
    let particles: Particle[] = [];
    let textPopups: TextPopup[] = [];

    // Player position & invulnerable states
    const player = {
      x: 375, // Centered
      y: 440,
      width: 50,
      height: 12,
      speed: 6.5,
    };
    let playerInvulnerableTime = 0;

    // Invader motion state
    let invaderDir = 1;
    let invaderSpeed = 0.55 + localLevel * 0.15;
    let lastEnemyShotTime = 0;

    // Screen shake state
    let shakeDuration = 0;
    let shakeIntensity = 0;

    const triggerShake = (duration = 10, intensity = 4) => {
      shakeDuration = duration;
      shakeIntensity = intensity;
    };

    // Synchronize scoreboard to React DOM
    const syncReactState = () => {
      setScore(localScore);
      setLives(localLives);
      setLevel(localLevel);
      setGameState(localGameState as any);
    };

    // Event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["Space", " ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keysRef.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keysRef.current.right = true;
      }
      if (e.key === " " || e.key === "Spacebar") {
        keysRef.current.shoot = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keysRef.current.left = false;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keysRef.current.right = false;
      }
      if (e.key === " " || e.key === "Spacebar") {
        keysRef.current.shoot = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // MAIN HIGH PERFORMANCE 60FPS GAME LOOP
    const gameLoop = (timestamp: number) => {
      // Check if Restart button clicked
      if (restartTriggerRef.current > lastRestartTrigger) {
        lastRestartTrigger = restartTriggerRef.current;
        localScore = 0;
        localLives = 3;
        localLevel = 1;
        localGameState = "playing";
        invaders = initInvaders(1);
        shields = initShields();
        stars = initStars();
        playerBullets = [];
        enemyBullets = [];
        particles = [];
        textPopups = [];
        player.x = 375;
        invaderDir = 1;
        invaderSpeed = 0.7;
        playerInvulnerableTime = 0;
        syncReactState();
      }

      if (localGameState === "gameover") {
        animationFrameIdRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // 1. Move Starfield
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > 500) {
          star.y = 0;
          star.x = Math.random() * 800;
        }
      }

      // 2. Move Player
      if (keysRef.current.left) {
        player.x = Math.max(10, player.x - player.speed);
      }
      if (keysRef.current.right) {
        player.x = Math.min(800 - player.width - 10, player.x + player.speed);
      }

      // 3. Player Shooting
      if (keysRef.current.shoot || (keysRef.current as any).touchShoot) {
        const now = performance.now();
        if (now - lastShotTimeRef.current > 280) {
          playerBullets.push({
            x: player.x + player.width / 2 - 1.5,
            y: player.y - 8,
            width: 3,
            height: 12,
            vy: -8,
            color: "#334155", // Charcoal bullet
          });
          lastShotTimeRef.current = now;
        }
      }

      // 4. Move Player Bullets
      for (let i = playerBullets.length - 1; i >= 0; i--) {
        const b = playerBullets[i];
        b.y += b.vy;
        if (b.y < 0) {
          playerBullets.splice(i, 1);
        }
      }

      // 5. Move Invaders (404 grid group)
      let hitWall = false;
      const activeInvaders = invaders.filter((inv) => inv.active);

      // Check level complete
      if (activeInvaders.length === 0) {
        localLevel += 1;
        invaders = initInvaders(localLevel, 85 + Math.min(85, localLevel * 10));
        shields = initShields();
        playerBullets = [];
        enemyBullets = [];
        invaderSpeed = 0.55 + localLevel * 0.15;
        invaderDir = 1;
        triggerShake(15, 6);
        textPopups.push({
          x: 400,
          y: 220,
          text: `LEVEL ${localLevel}!`,
          alpha: 1,
          vy: -0.5,
          color: "#b45309",
        });
        syncReactState();
      }

      // Safe bounds checking - only triggers a wall collision if moving TOWARDS that wall
      for (const inv of activeInvaders) {
        if (invaderDir === 1 && inv.x + inv.width >= 800 - 15) {
          hitWall = true;
          break;
        }
        if (invaderDir === -1 && inv.x <= 15) {
          hitWall = true;
          break;
        }
      }

      if (hitWall) {
        invaderDir = -invaderDir;
        for (const inv of invaders) {
          inv.y += 15;
          // Shift slightly away to completely prevent consecutive wall lockups
          inv.x += invaderDir * 4;
          
          if (inv.active && inv.y + inv.height >= player.y) {
            localGameState = "gameover";
            triggerShake(25, 8);
            syncReactState();
          }
        }
      } else {
        for (const inv of invaders) {
          inv.x += invaderDir * invaderSpeed;
        }
      }

      // 6. Enemy Shooting
      const enemyShotInterval = Math.max(300, 1600 - localLevel * 180);
      if (timestamp - lastEnemyShotTime > enemyShotInterval && activeInvaders.length > 0) {
        const shooter = activeInvaders[Math.floor(Math.random() * activeInvaders.length)];
        enemyBullets.push({
          x: shooter.x + shooter.width / 2 - 1.5,
          y: shooter.y + shooter.height,
          width: 3,
          height: 10,
          vy: 3.5 + Math.min(3, localLevel * 0.35),
          color: "#f43f5e", // Neon Coral bullet
        });
        lastEnemyShotTime = timestamp;
      }

      // 7. Move Enemy Bullets
      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const b = enemyBullets[i];
        b.y += b.vy;
        if (b.y > 500) {
          enemyBullets.splice(i, 1);
        }
      }

      // 8. Collision Detection: Player Bullets vs Invaders
      for (let b = playerBullets.length - 1; b >= 0; b--) {
        const bullet = playerBullets[b];
        for (let i = invaders.length - 1; i >= 0; i--) {
          const inv = invaders[i];
          if (!inv.active) continue;

          if (
            bullet.x < inv.x + inv.width &&
            bullet.x + bullet.width > inv.x &&
            bullet.y < inv.y + inv.height &&
            bullet.y + bullet.height > inv.y
          ) {
            inv.active = false;
            playerBullets.splice(b, 1);
            localScore += 10;
            setScore(localScore);

            // Spawn Particles
            const particleColors = ["#1e293b", "#475569", "#0d9488", "#7c3aed"];
            for (let p = 0; p < 8; p++) {
              particles.push({
                x: inv.x + inv.width / 2,
                y: inv.y + inv.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: Math.random() * 3 + 2,
                alpha: 1,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
              });
            }

            // Floating text popup
            textPopups.push({
              x: inv.x + inv.width / 2,
              y: inv.y,
              text: "+10",
              alpha: 1,
              vy: -0.8,
              color: "#6d28d9",
            });

            triggerShake(5, 2.5);
            break;
          }
        }
      }

      // 9. Collision Detection: Bullets vs Destructible Shields
      for (let s = shields.length - 1; s >= 0; s--) {
        const block = shields[s];
        if (!block.active) continue;

        // Player Bullets
        for (let b = playerBullets.length - 1; b >= 0; b--) {
          const bullet = playerBullets[b];
          if (
            bullet.x < block.x + 6 &&
            bullet.x + bullet.width > block.x &&
            bullet.y < block.y + 6 &&
            bullet.y + bullet.height > block.y
          ) {
            block.active = false;
            playerBullets.splice(b, 1);
            for (let p = 0; p < 3; p++) {
              particles.push({
                x: block.x + 3,
                y: block.y + 3,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                size: Math.random() * 2 + 1,
                alpha: 0.9,
                color: "#0f766e",
              });
            }
            break;
          }
        }

        // Enemy Bullets
        for (let eb = enemyBullets.length - 1; eb >= 0; eb--) {
          const bullet = enemyBullets[eb];
          if (
            bullet.x < block.x + 6 &&
            bullet.x + bullet.width > block.x &&
            bullet.y < block.y + 6 &&
            bullet.y + bullet.height > block.y
          ) {
            block.active = false;
            enemyBullets.splice(eb, 1);
            for (let p = 0; p < 3; p++) {
              particles.push({
                x: block.x + 3,
                y: block.y + 3,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                size: Math.random() * 2 + 1,
                alpha: 0.9,
                color: "#e11d48",
              });
            }
            break;
          }
        }
      }

      // 10. Collision Detection: Enemy Bullets vs Player (With 1.5s invulnerability window)
      const isInvulnerable = timestamp < playerInvulnerableTime;
      for (let eb = enemyBullets.length - 1; eb >= 0; eb--) {
        const bullet = enemyBullets[eb];
        if (
          bullet.x < player.x + player.width &&
          bullet.x + bullet.width > player.x &&
          bullet.y < player.y + player.height &&
          bullet.y + bullet.height > player.y
        ) {
          enemyBullets.splice(eb, 1);

          if (!isInvulnerable) {
            localLives -= 1;
            setLives(localLives);
            playerInvulnerableTime = timestamp + 1500; // 1.5 second hit protection
            triggerShake(16, 6);

            // Blast sparks
            for (let p = 0; p < 15; p++) {
              particles.push({
                x: player.x + player.width / 2,
                y: player.y + player.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                size: Math.random() * 3 + 2,
                alpha: 1,
                color: Math.random() > 0.5 ? "#f43f5e" : "#1f2937",
              });
            }

            if (localLives <= 0) {
              localGameState = "gameover";
              setGameState("gameover");
            }
          }
          break;
        }
      }

      // 11. Update Particles & Text Popups
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.024;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      for (let i = textPopups.length - 1; i >= 0; i--) {
        const t = textPopups[i];
        t.y += t.vy;
        t.alpha -= 0.016;
        if (t.alpha <= 0) {
          textPopups.splice(i, 1);
        }
      }

      // 12. DRAW SCENE
      ctx.clearRect(0, 0, 800, 500);

      // Apply screen shake offset
      ctx.save();
      if (shakeDuration > 0) {
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(dx, dy);
        shakeDuration--;
      }

      // Background Cyber Dust
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      for (const star of stars) {
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      // Subtle high-tech virtual grid lines
      ctx.strokeStyle = "rgba(0, 0, 0, 0.015)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 800; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.stroke();
      }
      for (let y = 0; y < 500; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(800, y);
        ctx.stroke();
      }

      // Ground Line
      ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 460);
      ctx.lineTo(790, 460);
      ctx.stroke();

      // Draw Invaders (404 blocks with inner retro detail)
      ctx.fillStyle = "#1e293b";
      for (const inv of invaders) {
        if (!inv.active) continue;
        ctx.fillRect(inv.x, inv.y, inv.width, inv.height);
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fillRect(inv.x + 3, inv.y + 3, 4, 4);
        ctx.fillStyle = "#1e293b"; // Restore
      }

      // Draw Shields (Clean high-fidelity Teal blocks)
      ctx.fillStyle = "#0d9488";
      for (const block of shields) {
        if (!block.active) continue;
        ctx.fillRect(block.x, block.y, 5, 5);
      }

      // Draw Player Ship (Charcoal Cannon, flashes transparent if invulnerable)
      const drawPlayer = !isInvulnerable || Math.floor(timestamp / 100) % 2 === 0;
      if (drawPlayer) {
        ctx.fillStyle = "#111111";
        // Ship Base
        ctx.fillRect(player.x, player.y + 6, player.width, 6);
        // Ship turret
        ctx.fillRect(player.x + player.width / 2 - 4, player.y, 8, 6);
      }

      // Draw Player Bullets
      for (const b of playerBullets) {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
      }

      // Draw Enemy Bullets
      for (const eb of enemyBullets) {
        ctx.fillStyle = eb.color;
        ctx.fillRect(eb.x, eb.y, eb.width, eb.height);
      }

      // Draw Particles
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1; // Reset opacity

      // Draw Floating Scores/Text Popups
      ctx.textAlign = "center";
      for (const t of textPopups) {
        ctx.font = "bold 13px Satoshi, Inter, sans-serif";
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.alpha;
        ctx.fillText(t.text, t.x, t.y);
      }
      ctx.globalAlpha = 1;

      ctx.restore(); // Restore context state (undo screen shake transform)

      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); // Run effect ONCE on mount to ensure completely uninterrupted game loop stability

  return (
    <div className="min-h-screen bg-gray-100 text-[#1f2937] flex flex-col items-center justify-between py-8 sm:py-12 md:py-16 px-3 sm:px-4 select-none relative selection:bg-black selection:text-white">
      {/* Background ambient aesthetic blurs */}
      <div className="absolute top-[5%] left-[10%] w-[45%] aspect-square rounded-full bg-gray-200/40 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[10%] w-[45%] aspect-square rounded-full bg-gray-200/35 blur-[120px] pointer-events-none"></div>

      {/* Header Info */}
      <div className="w-full max-w-4xl text-center flex flex-col items-center mt-2 sm:mt-4 md:mt-6 z-10">
        <h1 className="text-2xl sm:text-3xl md:text-[30px] font-black tracking-wider mb-2 sm:mb-3 font-satoshi text-gray-900">
          PAGE NOT FOUND
        </h1>
        <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 max-w-sm sm:max-w-md mb-4 sm:mb-6 md:mb-8 font-semibold font-satoshi leading-relaxed px-2 sm:px-4">
          Whoops! This page may be missing, but your mission isn&apos;t. You&apos;re our only hope.
        </p>

        {/* HUD Glassmorphism stats cockpit bar */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-10 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-gray-500 mb-4 sm:mb-5 md:mb-6 bg-white/70 border border-gray-200/80 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full shadow-sm backdrop-blur-md w-full sm:w-auto max-w-full">
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></span>
            SCORE: <span className="font-extrabold text-gray-900 text-sm sm:text-base font-mono ml-0.5 sm:ml-1">{score}</span>
          </div>
          <div className="hidden sm:block w-px h-3 sm:h-4 bg-gray-200 my-auto"></div>
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            LIVES: <span className="font-extrabold text-rose-600 text-sm sm:text-base font-mono ml-0.5 sm:ml-1">{lives}</span>
          </div>
          <div className="hidden sm:block w-px h-3 sm:h-4 bg-gray-200 my-auto"></div>
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            LEVEL: <span className="font-extrabold text-amber-600 text-sm sm:text-base font-mono ml-0.5 sm:ml-1">{level}</span>
          </div>
        </div>
      </div>

      {/* Interactive Arcade Canvas Wrapper */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-xl aspect-[800/500] mb-4 sm:mb-5 md:mb-6 z-10 group">
        {/* Sleek drop shadow filter */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-250/20 via-gray-200/10 to-gray-250/20 rounded-xl blur-lg opacity-40 pointer-events-none" />
        
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="relative w-full h-auto bg-[#F9FAFB] rounded-xl border border-gray-200/80 shadow-xl block"
          style={{ imageRendering: "pixelated" }}
        />

        {/* GameOver Overlay Screen (Clean light theme popup) */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-white/95 rounded-xl flex flex-col items-center justify-center text-black backdrop-blur-sm transition-all duration-300 z-20 shadow-inner">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-2 font-satoshi bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              MISSION FAILED
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mb-8 font-satoshi font-bold tracking-widest uppercase">
              Final Score: <span className="font-extrabold text-black text-base font-mono ml-1">{score}</span> | Level: <span className="font-extrabold text-black text-base font-mono ml-1">{level}</span>
            </p>
            <button
              onClick={restartGame}
              className="bg-black hover:bg-neutral-800 text-white px-10 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-200 shadow-md transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-[9px] sm:text-[10px] md:text-xs tracking-widest font-extrabold text-gray-400 mb-4 sm:mb-5 md:mb-8 font-satoshi uppercase px-2">
        Use Left/Right arrow keys or A/D to move. Spacebar to shoot.
      </div>

      {/* Mobile touch controls panel */}
      <div className="flex md:hidden gap-x-2 sm:gap-x-3 mb-4 sm:mb-6 md:mb-8 z-10 w-full justify-center flex-wrap">
        <button
          onTouchStart={() => {
            keysRef.current.left = true;
          }}
          onTouchEnd={() => {
            keysRef.current.left = false;
          }}
          className="bg-white/80 border border-gray-200 active:bg-gray-100 text-gray-700 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl select-none shadow-sm active:scale-95 transition-transform"
        >
          ←
        </button>
        <button
          onTouchStart={() => {
            (keysRef.current as any).touchShoot = true;
          }}
          onTouchEnd={() => {
            (keysRef.current as any).touchShoot = false;
          }}
          className="bg-black text-white px-8 sm:px-12 h-12 sm:h-16 rounded-full flex items-center justify-center font-bold tracking-widest text-xs sm:text-sm select-none shadow-md active:scale-95 transition-transform"
        >
          FIRE
        </button>
        <button
          onTouchStart={() => {
            keysRef.current.right = true;
          }}
          onTouchEnd={() => {
            keysRef.current.right = false;
          }}
          className="bg-white/80 border border-gray-200 active:bg-gray-100 text-gray-700 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl select-none shadow-sm active:scale-95 transition-transform"
        >
          →
        </button>
      </div>

      {/* CTA Button returning to homepage */}
      <Link href="/" className="mb-4 sm:mb-5 md:mb-6 z-10 w-full sm:w-auto px-2 sm:px-0 flex justify-center">
        <button className="bg-black hover:bg-neutral-800 text-white font-bold text-[11px] sm:text-xs md:text-sm tracking-widest uppercase px-8 sm:px-12 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md flex items-center gap-x-2 sm:gap-x-3 cursor-pointer w-full sm:w-auto justify-center">
          BACK TO HOMEPAGE
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;