import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  Settings,
  ChevronDown,
  LogOut,
  Zap,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Produits", href: "/admin/products" },
  { icon: Calendar, label: "Événements", href: "/admin/events" },
  { icon: Users, label: "Utilisateurs", href: "/admin/users" },
  { icon: Settings, label: "Paramètres", href: "/admin/settings" },
];

const stats = [
  {
    icon: DollarSign,
    label: "Revenus du mois",
    value: "12,458€",
    change: "+15.3%",
    positive: true,
  },
  {
    icon: ShoppingBag,
    label: "Commandes",
    value: "342",
    change: "+8.2%",
    positive: true,
  },
  {
    icon: UserCheck,
    label: "Nouveaux utilisateurs",
    value: "89",
    change: "+23.1%",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Taux de conversion",
    value: "3.2%",
    change: "-0.4%",
    positive: false,
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "JohnDoe",
    product: "Bugatti Centuria",
    amount: 1599,
    status: "completed",
  },
  {
    id: "ORD-002",
    customer: "PlayerOne",
    product: "Pack 10 000 Coins",
    amount: 49.99,
    status: "pending",
  },
  {
    id: "ORD-003",
    customer: "GamerX",
    product: "Luxury Mansion MLO",
    amount: 299,
    status: "completed",
  },
  {
    id: "ORD-004",
    customer: "FastDriver",
    product: "Porsche 911 GT3 RS",
    amount: 899,
    status: "processing",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-background" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-gradient">
                  ORIZON
                </span>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-background">
                    AD
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">
                      admin@orizon.fr
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
            <h1 className="font-display text-xl font-semibold">Dashboard</h1>
            <Link to="/">
              <Button variant="outline" size="sm">
                Voir le site
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.positive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-lg font-semibold">
                Commandes récentes
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                      ID
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                      Client
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                      Produit
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                      Montant
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-mono">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">{order.product}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {order.amount.toFixed(2)}€
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {order.status === "completed"
                            ? "Terminée"
                            : order.status === "pending"
                            ? "En attente"
                            : "En cours"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
