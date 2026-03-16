import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { mockCustomers, mockProducts, mockMessages, analyticsData, Message, Product } from '@/data/mockData';
import {
  LayoutDashboard, Users, Package, MessageSquare, User, ChevronLeft, ChevronRight,
  Send, Search, Plus, Trash2, TrendingUp, DollarSign, Eye, ShoppingCart, Camera, Edit3, BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

type Tab = 'dashboard' | 'customers' | 'products' | 'messages' | 'profile';

const ShopkeeperDashboard = () => {
  const { user, updateProfile } = useAuth();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [msgInput, setMsgInput] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editName, setEditName] = useState(user?.name || '');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });
  const fileRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    setMessages(prev => [...prev, { id: String(Date.now()), senderId: 'shop1', senderName: 'You', content: msgInput, timestamp: new Date(), isOwn: true }]);
    setMsgInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: String(Date.now()), senderId: 'user1', senderName: 'Alex Johnson', content: 'Got it, thanks!', timestamp: new Date(), isOwn: false }]);
    }, 1500);
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateProfile({ avatar: URL.createObjectURL(file) });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts(prev => [...prev, { id: String(Date.now()), name: newProduct.name, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) || 0, category: newProduct.category, image: '' }]);
    setNewProduct({ name: '', price: '', stock: '', category: '' });
    setShowAddProduct(false);
  };

  const sideItems: { id: Tab; icon: typeof LayoutDashboard; label: string }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex min-h-screen pt-16 bg-background">
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="fixed left-0 top-16 bottom-0 z-40 glass-card border-r border-border/50 flex flex-col"
      >
        <div className="flex-1 py-4">
          {sideItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${tab === item.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="font-medium text-sm whitespace-nowrap overflow-hidden">{item.label}</motion.span>}
              </AnimatePresence>
            </button>
          ))}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="p-4 border-t border-border/50 text-muted-foreground hover:text-foreground">
          {collapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : <ChevronLeft className="w-5 h-5 mx-auto" />}
        </button>
      </motion.aside>

      <motion.main animate={{ marginLeft: collapsed ? 72 : 260 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} className="flex-1 p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {tab === 'dashboard' && (
            <motion.div key="dash" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-6">
              <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground">Analytics Dashboard</motion.h1>
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: '$34,100', icon: DollarSign, change: '+12%', color: 'from-primary to-secondary' },
                  { label: 'Customers', value: '258', icon: Users, change: '+8%', color: 'from-secondary to-accent' },
                  { label: 'Page Views', value: '12.4K', icon: Eye, change: '+24%', color: 'from-accent to-primary' },
                  { label: 'Orders', value: '1,247', icon: ShoppingCart, change: '+16%', color: 'from-primary to-cyan-500' },
                ].map((s, i) => (
                  <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5 hover-lift cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                        <s.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-medium text-accent flex items-center gap-1"><TrendingUp className="w-3 h-3" />{s.change}</span>
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
                  <h2 className="font-display text-lg font-semibold mb-4 text-foreground flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Revenue Trend</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={analyticsData.revenue}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(217,91%,60%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(217,91%,60%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, color: 'hsl(var(--foreground))' }} />
                      <Area type="monotone" dataKey="value" stroke="hsl(217,91%,60%)" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
                <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
                  <h2 className="font-display text-lg font-semibold mb-4 text-foreground flex items-center gap-2"><Users className="w-5 h-5 text-secondary" /> Customer Growth</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.customers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, color: 'hsl(var(--foreground))' }} />
                      <Bar dataKey="value" fill="hsl(270,75%,56%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
              {/* Engagement */}
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold mb-4 text-foreground">Engagement Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Views', value: analyticsData.engagement.views.toLocaleString(), pct: 78 },
                    { label: 'Clicks', value: analyticsData.engagement.clicks.toLocaleString(), pct: 55 },
                    { label: 'Conversions', value: analyticsData.engagement.conversions.toLocaleString(), pct: 42 },
                    { label: 'Bounce Rate', value: `${analyticsData.engagement.bounceRate}%`, pct: analyticsData.engagement.bounceRate },
                  ].map((m, i) => (
                    <div key={i} className="text-center">
                      <p className="font-display text-xl font-bold text-foreground">{m.value}</p>
                      <p className="text-xs text-muted-foreground mb-2">{m.label}</p>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ duration: 1, delay: i * 0.15 }} className="h-full rounded-full gradient-bg" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === 'customers' && (
            <motion.div key="cust" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">Customers</h1>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search customers..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                </div>
              </motion.div>
              <motion.div variants={stagger} className="space-y-3">
                {mockCustomers.filter(c => c.name.toLowerCase().includes(searchQ.toLowerCase())).map(c => (
                  <motion.div key={c.id} variants={fadeUp} className="glass-card rounded-2xl p-5 hover-lift flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                        <span className="text-primary-foreground font-display font-bold">{c.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground">{c.name}</p>
                        <p className="text-sm text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center hidden sm:block">
                        <p className="font-display font-bold text-foreground">{c.totalOrders}</p>
                        <p className="text-xs text-muted-foreground">Orders</p>
                      </div>
                      <div className="text-center hidden sm:block">
                        <p className="font-display font-bold text-foreground">${c.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Spent</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{c.lastActive}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {tab === 'products' && (
            <motion.div key="prod" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">Products</h1>
                <Button onClick={() => setShowAddProduct(!showAddProduct)} className="gradient-bg btn-glow text-primary-foreground border-0 gap-2">
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </motion.div>
              <AnimatePresence>
                {showAddProduct && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card rounded-2xl p-6">
                    <h3 className="font-display font-semibold mb-4 text-foreground">New Product</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} placeholder="Product name"
                        className="px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                      <input value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} placeholder="Price" type="number"
                        className="px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                      <input value={newProduct.stock} onChange={e => setNewProduct(p => ({ ...p, stock: e.target.value }))} placeholder="Stock" type="number"
                        className="px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                      <input value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} placeholder="Category"
                        className="px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                    </div>
                    <Button onClick={addProduct} className="mt-4 gradient-bg text-primary-foreground border-0">Save Product</Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map(p => (
                  <motion.div key={p.id} variants={fadeUp} className="glass-card rounded-2xl p-5 hover-lift">
                    <div className="h-24 rounded-xl gradient-accent-bg mb-4 flex items-center justify-center">
                      <Package className="w-8 h-8 text-primary-foreground/60" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display font-bold text-primary">${p.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">{p.stock} in stock</span>
                    </div>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-lg bg-muted text-xs text-muted-foreground">{p.category}</span>
                    <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))} className="mt-3 flex items-center gap-1 text-xs text-destructive hover:underline">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
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
                    <div className="w-10 h-10 rounded-full gradient-accent-bg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground">Alex Johnson</p>
                      <p className="text-xs text-accent">Online</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                    {messages.map((m, i) => (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className={`flex ${m.isOwn ? 'justify-end' : 'justify-start'}`}>
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
                      <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none glow-focus" />
                      <Button onClick={sendMessage} className="gradient-bg btn-glow text-primary-foreground border-0 px-4"><Send className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div key="profile" initial="hidden" animate="visible" exit="hidden" variants={stagger} className="max-w-lg space-y-6">
              <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground">Shop Profile</motion.h1>
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8 text-center">
                <div className="relative inline-block mb-4">
                  <div className={`w-24 h-24 rounded-full overflow-hidden mx-auto ring-4 ring-primary/20 ${user?.avatar ? '' : 'gradient-bg flex items-center justify-center'}`}>
                    {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-primary-foreground" />}
                  </div>
                  <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-lg btn-glow">
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
                </div>
                <p className="font-display text-xl font-bold text-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize bg-secondary/10 text-secondary">{user?.role}</span>
              </motion.div>
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2"><Edit3 className="w-4 h-4" /> Edit Profile</h2>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Shop Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground outline-none glow-focus" />
                </div>
                <Button onClick={() => updateProfile({ name: editName })} className="gradient-bg btn-glow text-primary-foreground border-0">Save Changes</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default ShopkeeperDashboard;
