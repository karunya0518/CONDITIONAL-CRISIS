// Mock data for the CRM demo

export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  products: number;
  description: string;
  image: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface OrderStatus {
  id: string;
  item: string;
  shop: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  progress: number;
  date: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastActive: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export const mockShops: Shop[] = [
  { id: '1', name: 'TechVault', category: 'Electronics', rating: 4.8, products: 156, description: 'Premium gadgets and tech accessories', image: '' },
  { id: '2', name: 'StyleHub', category: 'Fashion', rating: 4.6, products: 324, description: 'Trendy clothing and accessories', image: '' },
  { id: '3', name: 'GreenGrocer', category: 'Groceries', rating: 4.9, products: 89, description: 'Fresh organic produce delivered', image: '' },
  { id: '4', name: 'BookNest', category: 'Books', rating: 4.7, products: 512, description: 'Curated collection of books', image: '' },
  { id: '5', name: 'HomeAura', category: 'Home Decor', rating: 4.5, products: 203, description: 'Modern home furnishing solutions', image: '' },
  { id: '6', name: 'FitZone', category: 'Fitness', rating: 4.8, products: 78, description: 'Sports equipment and supplements', image: '' },
];

export const mockMessages: Message[] = [
  { id: '1', senderId: 'shop1', senderName: 'TechVault Support', content: 'Hello! How can I help you today?', timestamp: new Date(Date.now() - 3600000), isOwn: false },
  { id: '2', senderId: 'user1', senderName: 'You', content: 'I wanted to check the status of my order #1234', timestamp: new Date(Date.now() - 3500000), isOwn: true },
  { id: '3', senderId: 'shop1', senderName: 'TechVault Support', content: 'Your order is being processed and will be shipped by tomorrow!', timestamp: new Date(Date.now() - 3400000), isOwn: false },
  { id: '4', senderId: 'user1', senderName: 'You', content: 'Great, thanks for the update!', timestamp: new Date(Date.now() - 3300000), isOwn: true },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Order Shipped', message: 'Your order from TechVault has been shipped', time: '2m ago', read: false, type: 'success' },
  { id: '2', title: 'New Message', message: 'StyleHub sent you a message', time: '15m ago', read: false, type: 'info' },
  { id: '3', title: 'Price Drop', message: 'Items in your wishlist are on sale', time: '1h ago', read: true, type: 'warning' },
  { id: '4', title: 'Review Request', message: 'How was your experience with BookNest?', time: '3h ago', read: true, type: 'info' },
];

export const mockOrders: OrderStatus[] = [
  { id: '1', item: 'Wireless Earbuds Pro', shop: 'TechVault', status: 'shipped', progress: 75, date: '2026-03-12' },
  { id: '2', item: 'Summer Collection Jacket', shop: 'StyleHub', status: 'processing', progress: 40, date: '2026-03-13' },
  { id: '3', item: 'Organic Fruit Box', shop: 'GreenGrocer', status: 'delivered', progress: 100, date: '2026-03-10' },
  { id: '4', item: 'JavaScript Mastery Book', shop: 'BookNest', status: 'pending', progress: 10, date: '2026-03-14' },
];

export const mockCustomers: CustomerRecord[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', totalOrders: 24, totalSpent: 1850, lastActive: '2 hours ago' },
  { id: '2', name: 'Maria Garcia', email: 'maria@email.com', totalOrders: 18, totalSpent: 2340, lastActive: '5 hours ago' },
  { id: '3', name: 'James Wilson', email: 'james@email.com', totalOrders: 31, totalSpent: 4200, lastActive: '1 day ago' },
  { id: '4', name: 'Sarah Chen', email: 'sarah@email.com', totalOrders: 12, totalSpent: 980, lastActive: '3 days ago' },
  { id: '5', name: 'David Kim', email: 'david@email.com', totalOrders: 45, totalSpent: 6100, lastActive: '1 hour ago' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, stock: 45, category: 'Audio', image: '' },
  { id: '2', name: 'Smart Watch Ultra', price: 299.99, stock: 12, category: 'Wearables', image: '' },
  { id: '3', name: 'USB-C Hub 7-in-1', price: 49.99, stock: 88, category: 'Accessories', image: '' },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99, stock: 34, category: 'Peripherals', image: '' },
  { id: '5', name: 'Portable Charger 20K', price: 39.99, stock: 120, category: 'Power', image: '' },
];

export const analyticsData = {
  revenue: [
    { month: 'Jan', value: 4200 },
    { month: 'Feb', value: 5100 },
    { month: 'Mar', value: 4800 },
    { month: 'Apr', value: 6200 },
    { month: 'May', value: 7100 },
    { month: 'Jun', value: 6800 },
  ],
  customers: [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 145 },
    { month: 'Mar', value: 168 },
    { month: 'Apr', value: 190 },
    { month: 'May', value: 225 },
    { month: 'Jun', value: 258 },
  ],
  engagement: { views: 12400, clicks: 3200, conversions: 420, bounceRate: 32 },
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];
