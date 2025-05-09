"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Book, Menu, X, ShoppingBag, ImageIcon, History, FileQuestion, Link as LinkIcon, FileText, Calendar } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = dynamic(() => import('@/components/ui/logo'), { ssr: false });

const menuItems = [
  { name: 'Início', href: '/', icon: <Book className="mr-2 h-5 w-5" /> },
  { name: 'Sobre Nós', href: '/about-us', icon: <History className="mr-2 h-5 w-5" /> },
  { name: 'Galeria', href: '/gallery', icon: <ImageIcon className="mr-2 h-5 w-5" /> },
  { name: 'Blog', href: '/blog', icon: <Book className="mr-2 h-5 w-5" /> },
  { name: 'Links', href: '/links', icon: <LinkIcon className="mr-2 h-5 w-5" /> },
  { name: 'Arquivo', href: '/archive', icon: <FileText className="mr-2 h-5 w-5" /> },
  { name: 'Calendário', href: '/calendar', icon: <Calendar className="mr-2 h-5 w-5" /> },
  { name: 'Loja', href: '/shop', icon: <ShoppingBag className="mr-2 h-5 w-5" /> },
  { name: 'Contacto', href: '/contact', icon: <FileQuestion className="mr-2 h-5 w-5" /> },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = cn(
    'fixed top-0 left-0 w-full z-50 transition-all duration-300',
    isScrolled && isMounted
      ? 'bg-background/95 backdrop-blur-sm shadow-md py-2'
      : 'bg-transparent py-4'
  );

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Don't render menu during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="h-12 w-12" fill='currentColor'/>
            <div className="font-playfair">
              <h1 className="text-xl font-bold leading-none">Praxe</h1>
              <p className="text-sm text-foreground/70">UTADINA</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-sm font-garamond text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors duration-200",
                  pathname === item.href && "text-primary font-semibold bg-primary/10"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-2">
              <ModeToggle />
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ModeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-sm border-t border-border shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center p-3 rounded-sm font-garamond",
                      pathname === item.href
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    )}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}