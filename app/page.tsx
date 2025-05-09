"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Book, 
  ImageIcon, 
  History,
  ChevronRight,
  GraduationCap,
  Wine,
  Link as LinkIcon,
  Share2,
  HelpCircle,
  FileText,
  Beer,
  Coffee,
  Scroll,
  Mail,
  Instagram,
  Facebook,
  BookText as TikTok,
  Calendar
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Logo from '@/components/ui/logo';
import { faqs } from '@/data/faqs';
import { menuItems, pageLinks } from '@/data/links';
import { resources } from '@/data/resources';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-wood-texture">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
        <div className="absolute inset-0 bg-deepBlack/40 backdrop-blur-sm" />
        
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Logo className="h-20 w-20 mx-auto mb-6 text-parchment" fill='currentColor'/>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-parchment mb-4">
              Praxe UTADINA
            </h1>
            <p className="text-lg md:text-xl text-parchment/90 font-garamond">
              Tradição, Honra e Sangria
            </p>
          </motion.div>

          {/* Quick Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <a 
              href="mailto:praxeutadina@proton.me"
              className="text-parchment/80 hover:text-primary transition-colors"
              title="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a 
              href="https://instagram.com/praxeutadina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment/80 hover:text-primary transition-colors"
              title="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://facebook.com/praxeutadina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment/80 hover:text-primary transition-colors"
              title="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://tiktok.com/@praxeutadina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment/80 hover:text-primary transition-colors"
              title="TikTok"
            >
              <TikTok className="h-6 w-6" />
            </a>
          </motion.div>

          {/* Links */}
          <div className="space-y-4 mb-12">
            {pageLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <div className={`fancy-card group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${link.color} bg-opacity-10 hover:bg-opacity-20`}>
                    <div className="p-4 flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${link.color} bg-opacity-20 group-hover:bg-opacity-30 transition-colors`}>
                        <link.icon className="h-6 w-6 text-parchment" />
                      </div>
                      <div>
                        <h2 className="text-xl font-playfair font-semibold text-parchment">{link.title}</h2>
                        <p className="text-sm text-parchment/70">{link.description}</p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-parchment/50 group-hover:text-parchment transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-8 w-8 text-parchment mr-2" />
              <h2 className="text-2xl font-playfair font-bold text-parchment">Perguntas Frequentes</h2>
            </div>
            <div className="fancy-card bg-opacity-95">
              <Suspense fallback={
                <div className="animate-pulse p-4">
                  <div className="h-12 bg-primary/10 rounded-lg mb-2"></div>
                  <div className="h-12 bg-primary/10 rounded-lg mb-2"></div>
                  <div className="h-12 bg-primary/10 rounded-lg"></div>
                </div>
              }>
                <Accordion type="single" collapsible className="p-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-parchment hover:text-parchment/80">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-parchment/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Suspense>
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-parchment mr-2" />
              <h2 className="text-2xl font-playfair font-bold text-parchment">Recursos Essenciais</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  className="fancy-card p-4 hover:bg-opacity-20 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                     { React.createElement(resource.icon, { className: "h-6 w-6 text-parchment" }) }
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair font-semibold text-parchment group-hover:text-primary transition-colors">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-parchment/70">{resource.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <Beer className="h-8 w-8 mx-auto mb-4 text-parchment/80" />
            <p className="text-lg font-garamond italic text-parchment/80">
              &quot;Quem não bebe, não é gente. Quem não canta, não é nada!&quot;
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}