"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, TrendingUp, Users, Calendar, MessageSquare, Eye, ArrowUp, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const topics = [
  {
    id: 1,
    title: 'Guia do Caloiro 2024',
    category: 'Avisos',
    author: 'Dux Veteranorum',
    views: 1234,
    replies: 89,
    lastActivity: '2024-03-20T10:30:00Z'
  },
  {
    id: 2,
    title: 'Tradições da Queima das Fitas',
    category: 'Tradições',
    author: 'Magister Traditionis',
    views: 987,
    replies: 45,
    lastActivity: '2024-03-19T15:45:00Z'
  },
  // Add more topics as needed
];

const trendingTags = [
  { name: 'QueimadasFitas2024', count: 156 },
  { name: 'TradicionaisUTAD', count: 89 },
  { name: 'PraxeAcadémica', count: 67 },
  { name: 'NovosCaloiros', count: 45 },
];

const onlineUsers = 127;

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => setShowScrollTop(!inView),
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header and Search */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-playfair font-bold">Fórum Académico</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-foreground/70">
                <Users className="inline-block h-4 w-4 mr-1" />
                {onlineUsers} online
              </div>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
            <Input
              type="search"
              placeholder="Pesquisar no fórum..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Topics */}
            <Card className="fancy-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Tópicos em Destaque
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-sm bg-card/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold hover:text-primary cursor-pointer">
                            {topic.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-foreground/70">
                            <Badge variant="outline">{topic.category}</Badge>
                            <span>{topic.author}</span>
                            <span>
                              <Eye className="inline h-4 w-4 mr-1" />
                              {topic.views}
                            </span>
                            <span>
                              <MessageSquare className="inline h-4 w-4 mr-1" />
                              {topic.replies}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-foreground/70">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          {new Date(topic.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Discussions */}
            <Card className="fancy-card">
              <CardHeader>
                <CardTitle>Últimas Discussões</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Similar structure to Featured Topics */}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Tags */}
            <Card className="fancy-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hash className="h-5 w-5 mr-2" />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {trendingTags.map((tag) => (
                      <div
                        key={tag.name}
                        className="flex items-center justify-between p-2 hover:bg-primary/5 rounded-sm cursor-pointer"
                      >
                        <span className="text-primary">#{tag.name}</span>
                        <Badge variant="outline">{tag.count}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Instagram Feed */}
            <Card className="fancy-card">
              <CardHeader>
                <CardTitle>Instagram Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {/* Instagram feed placeholders */}
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-card/50 rounded-sm animate-pulse"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 rounded-full shadow-lg"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}

        {/* Observer element */}
        <div ref={ref} className="h-1 w-full" />
      </div>
    </div>
  );
}