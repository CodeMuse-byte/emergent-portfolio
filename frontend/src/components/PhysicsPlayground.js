import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  MousePointer,
  Settings
} from 'lucide-react';

const PhysicsPlayground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [balls, setBalls] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTrails, setShowTrails] = useState(false);
  const [gravityStrength, setGravityStrength] = useState(0.5);

  // Physics constants
  const GRAVITY = 0.5;
  const BOUNCE_DAMPING = 0.8;
  const FRICTION = 0.99;
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

  // Ball class with physics
  class Ball {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
      this.radius = radius;
      this.color = color;
      this.mass = radius * 0.1;
      this.trail = [];
      this.maxTrailLength = 15;
    }

    update(canvas, gravity, mouse) {
      // Apply gravity
      this.vy += gravity * gravityStrength;
      
      // Mouse interaction (attraction/repulsion)
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) * 0.001;
        this.vx += (dx / distance) * force;
        this.vy += (dy / distance) * force;
      }
      
      // Apply friction
      this.vx *= FRICTION;
      this.vy *= FRICTION;
      
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      
      // Trail effect
      if (showTrails) {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }
      } else {
        this.trail = [];
      }
      
      // Boundary collision
      if (this.x + this.radius > canvas.width) {
        this.x = canvas.width - this.radius;
        this.vx *= -BOUNCE_DAMPING;
      }
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= -BOUNCE_DAMPING;
      }
      if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius;
        this.vy *= -BOUNCE_DAMPING;
      }
      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= -BOUNCE_DAMPING;
      }
    }

    draw(ctx) {
      // Draw trail
      if (showTrails && this.trail.length > 1) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      
      // Draw ball with glow effect
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 20;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner shine effect
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize balls
  const initializeBalls = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newBalls = [];
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 20 + 10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      newBalls.push(new Ball(x, y, radius, color));
    }
    setBalls(newBalls);
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw balls
    balls.forEach(ball => {
      ball.update(canvas, GRAVITY, mousePosition);
      ball.draw(ctx);
    });
    
    // Ball-to-ball collision
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const dx = balls[j].x - balls[i].x;
        const dy = balls[j].y - balls[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < balls[i].radius + balls[j].radius) {
          // Simple collision response
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);
          
          // Collision response
          const vx1 = balls[i].vx * cos + balls[i].vy * sin;
          const vy1 = balls[i].vy * cos - balls[i].vx * sin;
          const vx2 = balls[j].vx * cos + balls[j].vy * sin;
          const vy2 = balls[j].vy * cos - balls[j].vx * sin;
          
          // Conservation of momentum
          const finalVx1 = ((balls[i].mass - balls[j].mass) * vx1 + 2 * balls[j].mass * vx2) / (balls[i].mass + balls[j].mass);
          const finalVx2 = ((balls[j].mass - balls[i].mass) * vx2 + 2 * balls[i].mass * vx1) / (balls[i].mass + balls[j].mass);
          
          balls[i].vx = finalVx1 * cos - vy1 * sin;
          balls[i].vy = vy1 * cos + finalVx1 * sin;
          balls[j].vx = finalVx2 * cos - vy2 * sin;
          balls[j].vy = vy2 * cos + finalVx2 * sin;
          
          // Separate balls
          const overlap = balls[i].radius + balls[j].radius - distance;
          balls[i].x -= (overlap / 2) * cos;
          balls[i].y -= (overlap / 2) * sin;
          balls[j].x += (overlap / 2) * cos;
          balls[j].y += (overlap / 2) * sin;
        }
      }
    }
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Mouse tracking
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Add new ball on click
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const radius = Math.random() * 15 + 10;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newBall = new Ball(x, y, radius, color);
    setBalls(prevBalls => [...prevBalls, newBall]);
  };

  // Reset playground
  const resetPlayground = () => {
    setBalls([]);
    setTimeout(initializeBalls, 100);
  };

  // Add explosion effect
  const addExplosion = () => {
    const canvas = canvasRef.current;
    const explosionBalls = [];
    
    for (let i = 0; i < 10; i++) {
      const radius = Math.random() * 8 + 5;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const ball = new Ball(x, y, radius, color);
      ball.vx = (Math.random() - 0.5) * 20;
      ball.vy = (Math.random() - 0.5) * 20;
      explosionBalls.push(ball);
    }
    
    setBalls(prevBalls => [...prevBalls, ...explosionBalls]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;
    
    // Initialize
    initializeBalls();
  }, []);

  useEffect(() => {
    if (isPlaying && balls.length > 0) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, balls, mousePosition, showTrails, gravityStrength]);

  return (
    <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Physics Playground</h3>
          <p className="text-slate-400">Interactive physics simulation with bouncing balls</p>
        </div>
        <Badge variant="outline" className="text-purple-400 border-purple-400">
          <Sparkles className="w-4 h-4 mr-1" />
          Interactive
        </Badge>
      </div>

      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] bg-slate-800 rounded-lg border border-slate-600 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        
        {/* Interaction hint */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="flex items-center space-x-2 text-sm">
            <MousePointer className="w-4 h-4" />
            <span>Click to add balls • Move mouse to interact</span>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="text-sm">
            <div>Balls: {balls.length}</div>
            <div>Gravity: {gravityStrength.toFixed(1)}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant={isPlaying ? "destructive" : "default"}
          size="sm"
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        
        <Button onClick={resetPlayground} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button onClick={addExplosion} variant="outline" size="sm">
          <Zap className="w-4 h-4 mr-2" />
          Explosion
        </Button>
        
        <Button
          onClick={() => setShowTrails(!showTrails)}
          variant={showTrails ? "default" : "outline"}
          size="sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Trails
        </Button>

        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-slate-400" />
          <label className="text-sm text-slate-400">Gravity:</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={gravityStrength}
            onChange={(e) => setGravityStrength(parseFloat(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: "🎯", label: "Click to Add", desc: "Add new balls" },
          { icon: "🧲", label: "Mouse Gravity", desc: "Attract/repel balls" },
          { icon: "💥", label: "Collisions", desc: "Realistic physics" },
          { icon: "✨", label: "Particle Trails", desc: "Visual effects" }
        ].map((feature, index) => (
          <div key={index} className="bg-slate-800 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">{feature.icon}</div>
            <div className="text-sm font-medium text-white">{feature.label}</div>
            <div className="text-xs text-slate-400">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysicsPlayground;