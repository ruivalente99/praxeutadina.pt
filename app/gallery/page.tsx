"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { albums, categories } from '@/data/gallery';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAlbums = selectedCategory === 'all'
    ? albums
    : albums.filter(album => album.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Álbuns da Praxe
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore os momentos mais marcantes da Praxe Utadina através das nossas coleções fotográficas.
          </p>
        </header>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mx-auto flex justify-center">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function AlbumCard({ album }: { album: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fancy-card group overflow-hidden"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-playfair font-semibold">{album.title}</h3>
          <Badge variant="outline">{album.photoCount} fotos</Badge>
        </div>
        <p className="text-sm text-foreground/70 mb-3">{album.description}</p>
        <div className="flex items-center text-xs text-foreground/60 mb-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(album.date).toLocaleDateString('pt-PT')}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {album.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        <Button asChild variant="outline" className="w-full justify-between">
          <Link href={album.url} target="_blank" rel="noopener noreferrer">
            Ver álbum
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}