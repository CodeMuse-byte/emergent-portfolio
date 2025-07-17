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
  Settings,
  Waves
} from 'lucide-react';

const ParticlePlayground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(200);
  const [connectionDistance, setConnectionDistance] = useState(100);
  const [attractionStrength, setAttractionStrength] = useState(0.5);

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.radius = Math.random() * 3 + 1;
      this.color = this.getRandomColor();
      this.alpha = Math.random() * 0.5 + 0.5;
      this.life = 1;
      this.maxLife = 1;
    }

    getRandomColor() {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F8BBD9'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update(canvas, mouse) {
      // Mouse attraction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) * 0.0001 * attractionStrength;
        this.vx += (dx / distance) * force;
        this.vy += (dy / distance) * force;
      }

      // Apply velocity
      this.x += this.vx;
      this.y += this.vy;

      // Apply friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Boundary wrapping
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Update life
      this.life = Math.max(0, this.life - 0.005);
      this.alpha = this.life;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize particles
  const initializeParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      newParticles.push(new Particle(x, y));
    }
    setParticles(newParticles);
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach((particle, index) => {
      particle.update(canvas, mousePosition);
      particle.draw(ctx);
      
      // Remove dead particles and add new ones
      if (particle.life <= 0) {
        particles[index] = new Particle(Math.random() * canvas.width, Math.random() * canvas.height);
      }
    });

    // Draw connections
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          ctx.globalAlpha = (1 - distance / connectionDistance) * 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1;

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

  // Add particle burst on click
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create burst of particles
    const burstParticles = [];
    for (let i = 0; i < 20; i++) {
      const particle = new Particle(x, y);
      particle.vx = (Math.random() - 0.5) * 10;
      particle.vy = (Math.random() - 0.5) * 10;
      particle.radius = Math.random() * 5 + 2;
      burstParticles.push(particle);
    }
    
    setParticles(prevParticles => [...prevParticles.slice(0, -20), ...burstParticles]);
  };

  // Reset playground
  const resetPlayground = () => {
    setParticles([]);
    setTimeout(initializeParticles, 100);
  };

  // Create wave effect
  const createWave = () => {
    const canvas = canvasRef.current;
    const waveParticles = [];
    
    for (let i = 0; i < 50; i++) {
      const x = (i / 50) * canvas.width;
      const y = canvas.height / 2 + Math.sin(i * 0.3) * 50;
      const particle = new Particle(x, y);
      particle.vx = 2;
      particle.vy = Math.sin(i * 0.3) * 2;
      particle.radius = 4;
      waveParticles.push(particle);
    }
    
    setParticles(prevParticles => [...prevParticles.slice(0, -50), ...waveParticles]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;
    
    // Initialize
    initializeParticles();
  }, [particleCount]);

  useEffect(() => {
    if (isPlaying && particles.length > 0) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, particles, mousePosition, connectionDistance, attractionStrength]);

  return (
    <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Particle System</h3>
          <p className="text-slate-400">Interactive particle network with connections and attractions</p>
        </div>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          <Sparkles className="w-4 h-4 mr-1" />
          Particle Effects
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
            <span>Click to burst • Move mouse to attract</span>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="text-sm">
            <div>Particles: {particles.length}</div>
            <div>Connections: {connectionDistance}px</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
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
        
        <Button onClick={createWave} variant="outline" size="sm">
          <Waves className="w-4 h-4 mr-2" />
          Wave
        </Button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-slate-400" />
          <label className="text-sm text-slate-400">Particles:</label>
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={particleCount}
            onChange={(e) => setParticleCount(parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-slate-400">{particleCount}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-slate-400" />
          <label className="text-sm text-slate-400">Connections:</label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={connectionDistance}
            onChange={(e) => setConnectionDistance(parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-slate-400">{connectionDistance}px</span>
        </div>

        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-slate-400" />
          <label className="text-sm text-slate-400">Attraction:</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={attractionStrength}
            onChange={(e) => setAttractionStrength(parseFloat(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-slate-400">{attractionStrength.toFixed(1)}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: "🌊", label: "Wave Effects", desc: "Create wave patterns" },
          { icon: "🔗", label: "Connections", desc: "Dynamic particle links" },
          { icon: "💫", label: "Particle Burst", desc: "Click to create burst" },
          { icon: "🧲", label: "Attraction", desc: "Mouse interaction" }
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

export default ParticlePlayground;