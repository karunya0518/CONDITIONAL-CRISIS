import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { languages } from '@/data/mockData';
import { Search, Bell, Moon, Sun, Home, Globe, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { isAuthenticated, user, logout, isDark, toggleDark, language, setLanguage } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center btn-glow">
              <span className="font-display font-bold text-primary-foreground text-lg">N</span>
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">
              <span className="gradient-text">Nexus</span> CRM
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {!isAuthenticated && (
              <>
                <NavItem href="/" label="Home" />
                <NavItem href="/#features" label="Features" />
                <NavItem href="/login" label="Login" />
                <NavItem href="/register" label="Register" />
              </>
            )}
            {isAuthenticated && (
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2 text-muted-foreground hover:text-foreground">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 top-12 w-72 glass-card rounded-xl p-3 shadow-lg"
                >
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search anything..."
                    className="w-full bg-muted rounded-lg px-4 py-2 text-sm outline-none glow-focus text-foreground placeholder:text-muted-foreground"
                  />
                  {searchQuery && (
                    <div className="mt-2 space-y-1">
                      {['Dashboard', 'Messages', 'Orders', 'Settings'].filter(i => i.toLowerCase().includes(searchQuery.toLowerCase())).map(r => (
                        <div key={r} className="px-3 py-2 rounded-lg hover:bg-muted cursor-pointer text-sm text-foreground">{r}</div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Language */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-1">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm hidden sm:inline">{currentLang.flag}</span>
              </button>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-12 w-48 glass-card rounded-xl p-2 shadow-lg"
                >
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${language === l.code ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Dark mode */}
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors relative">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
                </button>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-12 w-72 glass-card rounded-xl p-3 shadow-lg">
                    <p className="font-display font-semibold text-sm mb-2 text-foreground">Notifications</p>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-primary/5 text-sm"><span className="font-medium text-foreground">Order Shipped</span><p className="text-muted-foreground text-xs">Your TechVault order is on the way</p></div>
                      <div className="p-2 rounded-lg hover:bg-muted text-sm"><span className="font-medium text-foreground">New Message</span><p className="text-muted-foreground text-xs">StyleHub replied to your query</p></div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* User/Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={user?.role === 'customer' ? '/customer' : '/shopkeeper'} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30" />
                  ) : (
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <span className="text-sm font-medium hidden sm:block text-foreground">{user?.name}</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
                <Button size="sm" className="gradient-bg btn-glow text-primary-foreground border-0" onClick={() => navigate('/register')}>Register</Button>
              </div>
            )}

            {/* Mobile menu */}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden border-t border-border/50 bg-background">
          <div className="p-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <MobileLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
                <MobileLink href="/login" label="Login" onClick={() => setMobileOpen(false)} />
                <MobileLink href="/register" label="Register" onClick={() => setMobileOpen(false)} />
              </>
            ) : (
              <>
                <MobileLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
                <MobileLink href={user?.role === 'customer' ? '/customer' : '/shopkeeper'} label="Dashboard" onClick={() => setMobileOpen(false)} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link to={href} className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
    {label}
  </Link>
);

const MobileLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <Link to={href} onClick={onClick} className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors">
    {label}
  </Link>
);

export default Navbar;
