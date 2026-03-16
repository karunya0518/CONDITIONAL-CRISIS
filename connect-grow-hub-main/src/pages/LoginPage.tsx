import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill all fields'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    login(email, password);
    const role = email.includes('shop') ? 'shopkeeper' : 'customer';
    navigate(role === 'shopkeeper' ? '/shopkeeper' : '/customer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 mesh-gradient relative">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-float-slow" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <span className="font-display text-2xl font-bold text-primary-foreground">N</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to your Nexus CRM account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </motion.div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none glow-focus transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none glow-focus transition-all"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Tip: Use an email with "shop" (e.g. shop@email.com) to login as Shopkeeper, otherwise you'll be a Customer.
            </p>
            <Button type="submit" disabled={loading} className="w-full gradient-bg btn-glow text-primary-foreground border-0 py-3 text-base gap-2">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
