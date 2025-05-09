"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

export function BlogPost({ post, relatedPosts }: { 
  post: any;
  relatedPosts: any[];
}) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Helper function to handle Sanity.io image references
  const getSanityImageUrl = (image: any) => {
    if (!image) return '';
    
    // Handle Sanity image reference format
    if (image._type === 'image' && image.asset && image.asset._ref) {
      return urlFor(image).url();
    }
    
    // If it's already a URL string
    return image;
  };

  // Define custom components for PortableText
  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        const imageUrl = getSanityImageUrl(value);
        return (
          <div className="my-8 relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={value.caption || ''}
              fill
              className="object-cover rounded-md"
            />
            {value.caption && (
              <p className="text-center text-sm text-foreground/70 mt-2">
                {value.caption}
              </p>
            )}
          </div>
        );
      },
    },
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch(error => {
        console.error('Erro ao partilhar:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    if (!isBookmarked) {
      toast.success('Artigo guardado nos favoritos!');
    } else {
      toast.info('Artigo removido dos favoritos!');
    }
  };

  console.log('Post:', post);
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost" 
          size="sm"
          className="mb-6"
          onClick={() => router.push('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Blog
        </Button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Post Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post?.categories?.map((category: any) => (
                <Badge key={category.title}>
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={getSanityImageUrl(post.author.picture)}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-foreground/70">{post.author.role}</p>
                </div>
              </div>
              <div className="text-sm text-foreground/70 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-3">
                  {post.publishedAt 
                    ? new Date(post.publishedAt).toLocaleDateString('pt-PT')
                    : new Date(post.date).toLocaleDateString('pt-PT')}
                </span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime ? `${post.readTime} min de leitura` : "5 min de leitura"}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full mb-8 fancy-card overflow-hidden">
            <Image
              src={getSanityImageUrl(post.coverImage || post.mainImage)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="parchment fancy-card p-6 md:p-8 mb-8">
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-playfair prose-headings:font-semibold prose-p:text-foreground/90 prose-a:text-primary">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          </div>

          {/* Post Footer */}
          <div className="flex justify-between items-center mb-12">
            <Button variant="outline" onClick={sharePost}>
              <Share2 className="mr-2 h-4 w-4" />
              Partilhar
            </Button>
            <Button 
              variant={isBookmarked ? "default" : "outline"} 
              onClick={toggleBookmark}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Guardado' : 'Guardar'}
            </Button>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-6">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    href={`/blog/${relatedPost.slug}`} 
                    key={relatedPost._id} 
                    className="fancy-card overflow-hidden block group"
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={getSanityImageUrl(relatedPost.mainImage || relatedPost.coverImage)}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-playfair font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        <Calendar className="inline h-3 w-3 mr-1" />
                        {relatedPost.publishedAt 
                          ? new Date(relatedPost.publishedAt).toLocaleDateString('pt-PT')
                          : new Date(relatedPost.date).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </motion.article>
      </div>
    </div>
  );
}