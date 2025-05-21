'use client';

import Link from 'next/link';
import { Facebook, Instagram, BookText as TikTok, Calendar, Mail } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

// Simulated hunting season dates
const HUNTING_SEASON = {
  start: new Date('2024-09-15'),
  end: new Date('2024-12-15')
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHuntingSeasonOpen, setIsHuntingSeasonOpen] = useState(false);

  useEffect(() => {
    const checkHuntingSeason = () => {
      const now = new Date();
      setIsHuntingSeasonOpen(now >= HUNTING_SEASON.start && now <= HUNTING_SEASON.end);
    };

    checkHuntingSeason();
    // Check every hour
    const interval = setInterval(checkHuntingSeason, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo and Description */}
          <div className="flex items-center space-x-3">
            <Logo className="h-12 w-12" fill='currentColor'/>
            <div className="font-playfair">
              <h2 className="text-xl font-bold leading-none">Praxe</h2>
              <p className="text-sm text-foreground/70">UTADINA</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a 
              href="mailto:geral@praxeutadina.pt" 
              className="text-foreground/60 hover:text-primary transition-colors"
              title="Email"
            >
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
            <a 
              href="https://instagram.com/praxeutadina" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://facebook.com/praxeutadina" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://tiktok.com/@praxeutadina" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <TikTok size={24} />
              <span className="sr-only">TikTok</span>
            </a>
          </div>

          {/* Hunting Season Badge */}
          <div className="flex items-center space-x-2">
            <Calendar className={`h-4 w-4 ${isHuntingSeasonOpen ? 'text-primary' : 'text-destructive'}`} />
            <Badge 
              variant={isHuntingSeasonOpen ? "default" : "destructive"}
              className="font-medium"
            >
              {isHuntingSeasonOpen ? 'Época de Caça Aberta' : 'Época de Caça Fechada'}
            </Badge>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-foreground/70">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Termos e Condições
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <a 
              href="mailto:geral@praxeutadina.pt" 
              className="hover:text-primary transition-colors"
            >
              geral@praxeutadina.pt
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} Praxe UTAD. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}