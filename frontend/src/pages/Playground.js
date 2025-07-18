import React from 'react';
import { Badge } from '../components/ui/badge';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import PhysicsPlayground from '../components/PhysicsPlayground';
import ParticlePlayground from '../components/ParticlePlayground';
import { 
  Gamepad2,
  Zap,
  MousePointer,
  Sparkles,
  Settings,
  Play
} from 'lucide-react';

const Playground = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Interactive Demo
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Interactive Playgrounds
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience multiple physics-based interactions with real-time simulations, particle effects, and interactive controls. Click, drag, and interact with the elements!
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Physics Playground Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Physics Simulation
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Real-time physics with collision detection, gravity effects, and interactive mouse controls.
              </p>
            </div>
            
            <PhysicsPlayground />
          </div>
        </div>
      </section>

      {/* Particle Playground Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Particle Network
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Interactive particle system with dynamic connections, attraction effects, and burst patterns.
              </p>
            </div>
            
            <ParticlePlayground />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Playground;