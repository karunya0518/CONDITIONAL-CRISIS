import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImg from '@/assets/hero-illustration.png';
import {
  Users, Store, MessageSquare, BarChart3, Shield, Zap,
  ArrowRight, CheckCircle2, Star, Globe2, Layers, TrendingUp,
} from 'lucide-react';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const features = [
  { icon: Users, title: 'Customer Management', desc: 'Track and nurture every customer relationship with smart profiles and interaction history.', color: 'from-primary to-secondary' },
  { icon: Store, title: 'Shop Directory', desc: 'Browse, discover, and connect with businesses in a beautifully organized card grid.', color: 'from-secondary to-accent' },
  { icon: MessageSquare, title: 'Real-time Messaging', desc: 'Seamless chat between customers and shopkeepers with typing indicators and instant delivery.', color: 'from-accent to-primary' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Animated charts and insights showing revenue trends, engagement metrics, and growth.', color: 'from-primary to-cyan-500' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Role-based access control keeps data safe. Customers and shopkeepers see only what matters.', color: 'from-secondary to-primary' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance with smooth animations and instant page transitions.', color: 'from-cyan-500 to-secondary' },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '5K+', label: 'Businesses' },
  { value: '1M+', label: 'Messages Sent' },
  { value: '99.9%', label: 'Uptime' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Shop Owner', text: 'Nexus CRM transformed how I manage customer relationships. The messaging system is incredibly smooth.', rating: 5 },
  { name: 'Alex Rivera', role: 'Customer', text: 'Finding and communicating with local businesses has never been easier. Love the interface!', rating: 5 },
  { name: 'Priya Patel', role: 'Shop Owner', text: 'The analytics dashboard gives me actionable insights I never had before. Revenue is up 40%.', rating: 5 },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Mesh gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/8 blur-3xl animate-float" />
      </div>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" /> Next-Gen CRM Platform
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Connect <span className="gradient-text">Customers</span> & <span className="gradient-text">Businesses</span> Seamlessly
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-lg">
                Nexus CRM empowers shopkeepers to manage customer relationships and helps customers discover, communicate, and track orders — all in one beautiful platform.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-bg btn-glow text-primary-foreground border-0 gap-2 px-8 text-base">
                    Get Started Free <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="gap-2 px-8 text-base hover-lift">
                    Sign In
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-6 mt-8">
                {[
                  'Free to start',
                  'No credit card',
                  'Setup in 2 min',
                ].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> {t}
                  </span>
                ))}
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="relative flex justify-center">
              <div className="relative">
                <img src={heroImg} alt="CRM Platform Illustration" className="w-full max-w-lg animate-float-slow" />
                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 top-1/4 glass-card rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-display font-bold text-foreground">+42%</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-4 bottom-1/4 glass-card rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-accent-bg flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Customers</p>
                      <p className="font-display font-bold text-foreground">2,847</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map(s => (
              <motion.div key={s.label} variants={fadeUp} className="glass-card rounded-2xl p-6 text-center hover-lift">
                <p className="font-display text-3xl font-bold gradient-text">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Layers className="w-4 h-4" /> Powerful Features
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Grow</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From customer management to real-time messaging, Nexus CRM provides all the tools for businesses and customers to thrive together.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-6 hover-lift group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 mesh-gradient">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-display text-4xl font-bold mb-4">How It <span className="gradient-text">Works</span></motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg">Get started in three simple steps</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up as a Customer or Shopkeeper. Set up your profile with a photo and preferences.' },
              { step: '02', title: 'Connect & Discover', desc: 'Customers browse shops, shopkeepers manage their storefront and product listings.' },
              { step: '03', title: 'Communicate & Grow', desc: 'Real-time messaging, order tracking, and analytics help both sides succeed.' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <span className="font-display text-2xl font-bold text-primary-foreground">{s.step}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-4xl font-bold mb-4">Loved by <span className="gradient-text">Thousands</span></motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-bg rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(270_75%_56%_/_0.3),transparent_60%)]" />
            <div className="relative z-10">
              <Globe2 className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Join thousands of businesses and customers already using Nexus CRM to build stronger relationships.
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="btn-glow gap-2 px-8 text-base bg-background text-foreground hover:bg-background/90">
                  Start for Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground">N</span>
            </div>
            <span className="font-display font-semibold gradient-text">Nexus CRM</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Nexus CRM. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
