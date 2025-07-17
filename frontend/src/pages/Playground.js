import React from 'react';
import { Badge } from '../components/ui/badge';
import AnimatedBackground from '../components/AnimatedBackground';
import PhysicsPlayground from '../components/PhysicsPlayground';
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
              Physics Playground
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience physics-based interactions with real-time collision detection, gravity simulation, and particle effects. Click, drag, and interact with the bouncing balls!
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Interactive Playground Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Interactive Physics Simulation
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Built with HTML5 Canvas and JavaScript, featuring real-time physics calculations, collision detection, and interactive mouse controls.
              </p>
            </div>
            
            <PhysicsPlayground />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Playground Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore the various interactive elements and physics effects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MousePointer,
                  title: "Mouse Interaction",
                  description: "Move your mouse to attract or repel balls. Click anywhere to add new balls to the simulation.",
                  color: "from-purple-500 to-blue-500"
                },
                {
                  icon: Zap,
                  title: "Collision Physics",
                  description: "Realistic ball-to-ball collisions with momentum conservation and bounce effects.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Settings,
                  title: "Adjustable Gravity",
                  description: "Control the gravity strength from 0 to 2x normal gravity using the interactive slider.",
                  color: "from-cyan-500 to-green-500"
                },
                {
                  icon: Sparkles,
                  title: "Particle Trails",
                  description: "Enable beautiful particle trails that follow each ball's movement path.",
                  color: "from-green-500 to-yellow-500"
                },
                {
                  icon: Play,
                  title: "Playback Controls",
                  description: "Pause, resume, reset, or trigger explosive effects with intuitive controls.",
                  color: "from-yellow-500 to-red-500"
                },
                {
                  icon: Gamepad2,
                  title: "Real-time Physics",
                  description: "Smooth 60fps animations with real-time physics calculations and boundary collision detection.",
                  color: "from-red-500 to-purple-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group hover:scale-105 transition-all duration-300">
                  <div className="bg-card p-8 rounded-xl border border-border hover:shadow-2xl transition-shadow">
                    <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Technical Implementation
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Built with modern web technologies for optimal performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 text-white">Frontend Technologies</h3>
                <div className="space-y-3">
                  {[
                    { name: "React", description: "Component-based architecture" },
                    { name: "HTML5 Canvas", description: "High-performance rendering" },
                    { name: "JavaScript", description: "Real-time physics calculations" },
                    { name: "Tailwind CSS", description: "Modern styling and animations" }
                  ].map((tech, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-purple-400 font-medium">{tech.name}</span>
                        <span className="text-slate-300 ml-2">- {tech.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 text-white">Physics Features</h3>
                <div className="space-y-3">
                  {[
                    { name: "Gravity Simulation", description: "Adjustable gravitational force" },
                    { name: "Collision Detection", description: "Ball-to-ball and boundary collisions" },
                    { name: "Momentum Conservation", description: "Realistic physics interactions" },
                    { name: "Particle Effects", description: "Trail rendering and glow effects" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-cyan-400 font-medium">{feature.name}</span>
                        <span className="text-slate-300 ml-2">- {feature.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Playground;