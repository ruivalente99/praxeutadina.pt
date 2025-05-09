"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { client } from '@/lib/sanity';
import { indexQuery } from '@/lib/queries';
import { urlFor } from '@/lib/sanity';
import type { Post } from '@/lib/queries';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await client.fetch(indexQuery);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all';
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const featuredPostsCount = (activeCategory === 'all' && searchQuery === '') ? 2 : 0;
  const regularPosts = filteredPosts.slice(featuredPostsCount);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  
  // Get current page posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-primary/10 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-primary/10 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Blog da Praxe
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Descubra histórias, tradições e experiências da vida académica na UTAD.
          </p>
        </header>

        {/* Featured Posts */}
        {activeCategory === 'all' && searchQuery === '' && (
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-playfair font-semibold mb-8">Em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.slice(0, 2).map((post) => (
                <Link 
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="fancy-card overflow-hidden block group"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={urlFor(post.coverImage).url()}
                      alt={post.title || ''}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {post.author?.picture && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={urlFor(post.author.picture).url()}
                            alt={post.author.name || ''}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{post.author?.name}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-playfair font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-foreground/60">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date || '').toLocaleDateString('pt-PT')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {currentPosts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  className="fancy-card overflow-hidden block group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative aspect-video md:w-1/3">
                      <Image
                        src={urlFor(post.coverImage).url()}
                        alt={post.title || ''}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      {post.author?.picture && (
                        <div className="flex items-center mb-4">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                            <Image
                              src={urlFor(post.author.picture).url()}
                              alt={post.author.name || ''}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{post.author.name}</p>
                          </div>
                        </div>
                      )}
                      <h3 className="text-xl font-playfair font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-foreground/60">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date || '').toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          paginate(currentPage - 1);
                          window.scrollTo(0, 0);
                        }} 
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show only a limited number of page links to avoid clutter
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={pageNumber === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              paginate(pageNumber);
                              window.scrollTo(0, 0);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    
                    // Add ellipsis for skipped pages
                    if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={`ellipsis-${pageNumber}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    
                    return null;
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          paginate(currentPage + 1);
                          window.scrollTo(0, 0);
                        }} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}