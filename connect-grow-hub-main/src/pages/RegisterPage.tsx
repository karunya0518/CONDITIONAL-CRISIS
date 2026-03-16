import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User2, Store, User } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Please fill all fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    register(name, email, password, role);
    navigate(role === 'shopkeeper' ? '/shopkeeper' : '/customer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 mesh-gradient relative">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <span className="font-display text-2xl font-bold text-primary-foreground">N</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-sm mt-1">Join Nexus CRM today</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {([
              { value: 'customer' as UserRole, icon: User, label: 'Customer', desc: 'Browse & order' },
              { value: 'shopkeeper' as UserRole, icon: Store, label: 'Shopkeeper', desc: 'Manage & sell' },
            ]).map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${role === r.value ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/30'}`}
              >
                <r.icon className={`w-6 h-6 mb-2 ${role === r.value ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className={`font-display font-semibold text-sm ${role === r.value ? 'text-primary' : 'text-foreground'}`}>{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </motion.div>
            )}
            <div className="relative">
              <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min 6 chars)"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-bg btn-glow text-primary-foreground border-0 py-3 text-base gap-2">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
