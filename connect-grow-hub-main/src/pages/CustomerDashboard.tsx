import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { mockShops, mockMessages, mockOrders, mockNotifications, Message } from '@/data/mockData';
import {
  LayoutDashboard, Store, MessageSquare, Package, User, Settings, ChevronLeft, ChevronRight,
  Send, Search, Bell, Star, Clock, CheckCircle2, Truck, MapPin, Camera, Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

type Tab = 'dashboard' | 'shops' | 'messages' | 'orders' | 'profile';

const CustomerDashboard = () => {
  const { user, updateProfile } = useAuth();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [msgInput, setMsgInput] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [editName, setEditName] = useState(user?.name || '');
  const fileRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    setMessages(prev => [...prev, {
      id: String(Date.now()), senderId: 'user1', senderName: 'You',
      content: msgInput, timestamp: new Date(), isOwn: true,
    }]);
    setMsgInput('');
    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: String(Date.now()), senderId: 'shop1', senderName: 'TechVault Support',
        content: 'Thanks for your message! We\'ll get back to you shortly.',
        timestamp: new Date(), isOwn: false,
      }]);
    }, 1500);
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateProfile({ avatar: url });
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-muted-foreground" />;
      case 'processing': return <Package className="w-4 h-4 text-primary" />;
      case 'shipped': return <Truck className="w-4 h-4 text-secondary" />;
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-accent" />;
      default: return null;
    }
  };

  const sideItems: { id: Tab; icon: typeof LayoutDashboard; label: string }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'shops', icon: Store, label: 'Browse Shops' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex min-h-screen pt-16 bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="fixed left-0 top-16 bottom-0 z-40 glass-card border-r border-border/50 flex flex-col"
      >
        <div className="flex-1 py-4">
          {sideItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                tab === item.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="font-medium text-sm whitespace-nowrap overflow-hidden">
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="p-4 border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors">
          {collapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : <ChevronLeft className="w-5 h-5 mx-auto" />}
        </button>
      </motion.aside>

      {/* Main */}
      <motion.main animate={{ marginLeft: collapsed ? 72 : 260 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} className="flex-1 p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {tab === 'dashboard' && (
            <motion.div key="dash" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-6">
              <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground">Welcome back, {user?.name} 👋</motion.h1>
              {/* Quick stats */}
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Active Orders', value: '4', icon: Package, color: 'from-primary to-secondary' },
                  { label: 'Messages', value: '12', icon: MessageSquare, color: 'from-secondary to-accent' },
                  { label: 'Shops Visited', value: '8', icon: Store, color: 'from-accent to-primary' },
                  { label: 'Notifications', value: '3', icon: Bell, color: 'from-primary to-cyan-500' },
                ].map((s, i) => (
                  <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5 hover-lift cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                        <s.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-display text-2xl font-bold text-foreground">{s.value}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
              {/* Recent notifications */}
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold mb-4 text-foreground">Recent Activity</h2>
                <div className="space-y-3">
                  {mockNotifications.map(n => (
                    <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${n.read ? 'hover:bg-muted' : 'bg-primary/5'}`}>
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.read ? 'bg-muted-foreground' : 'bg-primary animate-pulse'}`} />
                      <div>
                        <p className="font-medium text-sm text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === 'shops' && (
            <motion.div key="shops" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">Browse Shops</h1>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search shops..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                </div>
              </motion.div>
              <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {mockShops.filter(s => s.name.toLowerCase().includes(searchQ.toLowerCase())).map(shop => (
                  <motion.div key={shop.id} variants={fadeUp} className="glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer group">
                    <div className="h-32 gradient-bg relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="px-2 py-1 rounded-lg bg-background/80 text-xs font-medium text-foreground">{shop.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground">{shop.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{shop.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-primary text-primary" /> {shop.rating}</span>
                        <span className="text-xs text-muted-foreground">{shop.products} products</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {tab === 'messages' && (
            <motion.div key="msg" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-4">
              <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground">Messages</motion.h1>
              <motion.div variants={fadeUp} className="glass-card rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-border/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                      <Store className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground">TechVault Support</p>
                      <p className="text-xs text-accent">Online</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                    {messages.map((m, i) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex ${m.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.isOwn ? 'gradient-bg text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'}`}>
                          {m.content}
                          <p className={`text-xs mt-1 ${m.isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                            {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border/50">
                    <div className="flex gap-2">
                      <input
                        value={msgInput} onChange={e => setMsgInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus"
                      />
                      <Button onClick={sendMessage} className="gradient-bg btn-glow text-primary-foreground border-0 px-4">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === 'orders' && (
            <motion.div key="orders" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-6">
              <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground">My Orders</motion.h1>
              <motion.div variants={stagger} className="space-y-4">
                {mockOrders.map(order => (
                  <motion.div key={order.id} variants={fadeUp} className="glass-card rounded-2xl p-5 hover-lift">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {statusIcon(order.status)}
                        <div>
                          <p className="font-display font-semibold text-foreground">{order.item}</p>
                          <p className="text-xs text-muted-foreground">from {order.shop} · {order.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === 'delivered' ? 'bg-accent/10 text-accent' :
                        order.status === 'shipped' ? 'bg-secondary/10 text-secondary' :
                        order.status === 'processing' ? 'bg-primary/10 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${order.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full gradient-bg"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div key="profile" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="max-w-lg space-y-6">
              <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground">My Profile</motion.h1>
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8 text-center">
                <div className="relative inline-block mb-4">
                  <div className={`w-24 h-24 rounded-full overflow-hidden mx-auto ring-4 ring-primary/20 ${user?.avatar ? '' : 'gradient-bg flex items-center justify-center'}`}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-primary-foreground" />
                    )}
                  </div>
                  <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-lg btn-glow">
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
                </div>
                <p className="font-display text-xl font-bold text-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize bg-primary/10 text-primary">{user?.role}</span>
              </motion.div>
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2"><Edit3 className="w-4 h-4" /> Edit Profile</h2>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground outline-none glow-focus" />
                </div>
                <Button onClick={() => updateProfile({ name: editName })} className="gradient-bg btn-glow text-primary-foreground border-0">
                  Save Changes
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default CustomerDashboard;
