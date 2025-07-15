// Mock data for portfolio site
export const personalInfo = {
  name: "Alex Johnson",
  title: "Full Stack Developer",
  tagline: "Building innovative web applications with modern technologies",
  location: "San Francisco, CA",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  twitter: "https://twitter.com/alexjohnson",
  resume: "/resume.pdf"
};

export const aboutContent = {
  bio: "I'm a passionate full stack developer with over 5 years of experience in building scalable web applications. I specialize in React, Node.js, and modern web technologies. My journey in software development started with a curiosity about how things work, and it has evolved into a deep passion for creating solutions that make a difference.",
  experience: "5+ years",
  projectsCompleted: "50+",
  clientsSatisfied: "30+",
  highlights: [
    "Led development of 3 major web applications serving 10k+ users",
    "Contributed to open source projects with 500+ stars on GitHub",
    "Mentored junior developers and conducted technical workshops",
    "Optimized application performance resulting in 40% faster load times"
  ]
};

export const skills = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: 90, icon: "⚛️" },
      { name: "TypeScript", level: 85, icon: "🔷" },
      { name: "Next.js", level: 80, icon: "▲" },
      { name: "Tailwind CSS", level: 90, icon: "🎨" },
      { name: "JavaScript", level: 95, icon: "🟨" },
      { name: "HTML/CSS", level: 95, icon: "🌐" }
    ]
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Python", level: 80, icon: "🐍" },
      { name: "FastAPI", level: 75, icon: "⚡" },
      { name: "Express.js", level: 85, icon: "🚀" },
      { name: "PostgreSQL", level: 80, icon: "🐘" },
      { name: "MongoDB", level: 85, icon: "🍃" }
    ]
  },
  {
    category: "Tools & DevOps",
    technologies: [
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Git", level: 90, icon: "📚" },
      { name: "Jest", level: 80, icon: "🧪" },
      { name: "Webpack", level: 75, icon: "📦" },
      { name: "Linux", level: 85, icon: "🐧" }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, payment processing, and admin dashboard. Built with React, Node.js, and PostgreSQL.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    github: "https://github.com/alexjohnson/ecommerce-platform",
    demo: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    technologies: ["React", "Socket.io", "Express", "MongoDB", "JWT"],
    github: "https://github.com/alexjohnson/task-manager",
    demo: "https://taskmanager-demo.com",
    featured: true
  },
  {
    id: 3,
    title: "Weather Analytics Dashboard",
    description: "A responsive weather analytics dashboard with data visualization, location-based forecasts, and historical weather data analysis.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "OpenWeather API", "Chart.js"],
    github: "https://github.com/alexjohnson/weather-dashboard",
    demo: "https://weather-dashboard-demo.com",
    featured: false
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description: "A comprehensive social media analytics platform that tracks engagement, follower growth, and content performance across multiple platforms.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["Next.js", "Python", "FastAPI", "Redis", "Chart.js"],
    github: "https://github.com/alexjohnson/social-analytics",
    demo: "https://social-analytics-demo.com",
    featured: true
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website with 3D animations, dark/light theme toggle, and smooth scrolling effects.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Three.js"],
    github: "https://github.com/alexjohnson/portfolio",
    demo: "https://alexjohnson.dev",
    featured: false
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description: "A real-time chat application with multiple rooms, file sharing, typing indicators, and user presence detection.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "CloudinaryModal"],
    github: "https://github.com/alexjohnson/chat-app",
    demo: "https://chat-app-demo.com",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp Inc.",
    content: "Alex delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the project a huge success. The platform handles thousands of transactions daily without any issues.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b5c6db83?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO",
    company: "StartupXYZ",
    content: "Working with Alex was a game-changer for our startup. He built our entire backend infrastructure from scratch and delivered it on time and within budget. His code quality is outstanding and well-documented.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Design Lead",
    company: "Creative Agency",
    content: "Alex has an incredible ability to bring designs to life. He transformed our static designs into interactive, responsive web applications with beautiful animations. The collaboration was seamless and professional.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: 4,
    name: "David Park",
    role: "Founder",
    company: "InnovateNow",
    content: "Alex's technical skills are matched only by his professionalism and communication. He took our complex requirements and delivered a solution that was both elegant and robust. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Engineering Manager",
    company: "GlobalTech Solutions",
    content: "Alex joined our team as a contractor and quickly became an integral part of our development process. His expertise in React and Node.js helped us modernize our entire application stack.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
];

export const contactInfo = {
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  availability: "Available for new projects",
  responseTime: "Usually responds within 24 hours"
};