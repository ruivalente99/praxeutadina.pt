"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, links } from '@/data/links';

export default function LinksPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredLinks = activeCategory === 'all' 
    ? links 
    : links.filter(link => link.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Links Importantes
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Uma coleção de links essenciais para a comunidade académica da UTAD e todos interessados nas tradições universitárias de Vila Real.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-sm"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link, index) => (
            <motion.div
              key={link.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="fancy-card p-6 flex flex-col transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  {React.createElement(link.icon, { className: "h-6 w-6" })}
                </div>
                <h3 className="text-xl font-playfair font-semibold">{link.title}</h3>
              </div>
              <p className="text-foreground/80 mb-4 flex-grow">
                {link.description}
              </p>
              <Button asChild variant="outline" className="w-full justify-between rounded-sm">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  Visitar 
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Element */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <div className="relative">
          <div className="absolute left-0 right-0 h-px bg-border/50 top-1/2 -translate-y-1/2"></div>
          <Image 
            src="/images/ornament.png" 
            width={120} 
            height={40} 
            alt="Decorative ornament"
            className="relative inline-block mx-auto bg-background px-4"
          />
        </div>
      </div>
    </div>
  );
}