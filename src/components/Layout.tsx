import { Outlet, Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(2); // Mock cart count
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-hover flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-foreground">EliteStore</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center p-0">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-card">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 bg-input border-border"
                  />
                </div>
                
                {/* Mobile Links */}
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                        isActive(link.path)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/login"
                    className="text-sm font-medium py-2 px-3 rounded-md text-foreground hover:text-primary hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-gradient-to-r from-primary to-primary-hover flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">E</span>
                </div>
                <span className="font-bold text-foreground">EliteStore</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your premium destination for the latest electronics and gadgets.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/products" className="block hover:text-primary transition-colors">All Products</Link>
                <Link to="/products?category=phones" className="block hover:text-primary transition-colors">Phones</Link>
                <Link to="/products?category=laptops" className="block hover:text-primary transition-colors">Laptops</Link>
                <Link to="/products?category=accessories" className="block hover:text-primary transition-colors">Accessories</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/about" className="block hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="block hover:text-primary transition-colors">Contact</Link>
                <Link to="#" className="block hover:text-primary transition-colors">Careers</Link>
                <Link to="#" className="block hover:text-primary transition-colors">Press</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="#" className="block hover:text-primary transition-colors">Help Center</Link>
                <Link to="#" className="block hover:text-primary transition-colors">Shipping Info</Link>
                <Link to="#" className="block hover:text-primary transition-colors">Returns</Link>
                <Link to="#" className="block hover:text-primary transition-colors">Track Order</Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EliteStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;