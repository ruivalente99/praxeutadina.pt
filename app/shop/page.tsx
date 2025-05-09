"use client";

import { Wine } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Wine className="h-16 w-16 mx-auto mb-6 text-primary animate-bounce" />
          <h1 className="text-4xl font-playfair font-bold mb-4">
            Em breve...
          </h1>
          <p className="text-lg text-foreground/80">
            Os nossos trabalhadores estão embriagados no momento. 
            A loja voltará quando eles se recuperarem do último brinde.
          </p>
          <p className="text-sm text-foreground/60 mt-4 italic">
            "In vino veritas, in aqua sanitas"
          </p>
        </div>
      </div>
    </div>
  );
}