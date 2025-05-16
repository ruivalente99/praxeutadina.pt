"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileDown, 
  FileText, 
  Calendar, 
  Download, 
  Archive, 
  Search, 
  Clock,
  FilterX,
  Filter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { resources } from '@/data/resources';

type FilterType = 'all' | 'current' | 'archived';

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  // Filter resources based on filter and search term
  const filteredResources = resources.filter(
    (resource) => {
      const matchesFilterType = 
        activeFilter === 'all' || 
        (activeFilter === 'current' && !resource.isArchive) ||
        (activeFilter === 'archived' && resource.isArchive);
      
      const matchesSearchTerm = searchTerm === '' || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilterType && matchesSearchTerm;
    }
  );

  const totalResources = resources.length;
  const currentResources = resources.filter(r => !r.isArchive).length;
  const archivedResources = resources.filter(r => r.isArchive).length;

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  // Format the document counts
  const getCountLabel = (count: number) => {
    return count === 1 ? '1 documento' : `${count} documentos`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <FileText className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Arquivo de Documentos
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Aceda aos documentos históricos e materiais importantes da Praxe UTAD
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Filtering section - Mobile optimized */}
          <div className="fancy-card p-4 sm:p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <h2 className="text-xl font-playfair font-semibold flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </h2>
              
              {(searchTerm || activeFilter !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground text-sm flex items-center"
                >
                  <FilterX className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Limpar filtros</span>
                  <span className="sm:hidden">Limpar</span>
                </Button>
              )}
            </div>
            
            {/* Search input */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/50" />
              </div>
              <Input
                type="text"
                placeholder="Pesquisar documentos..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>              {/* Tabs for document type filtering - Mobile optimized */}
            <Tabs 
              defaultValue="all" 
              value={activeFilter}
              onValueChange={(value) => setActiveFilter(value as FilterType)}
              className="w-full"
            >
              <TabsList className="w-full mb-2 bg-muted/50 grid grid-cols-3 p-1">
                <TabsTrigger value="all" className="flex items-center justify-center text-xs sm:text-sm px-1 sm:px-3 h-auto py-2">
                  <span className="mr-1">Todos</span>
                  <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0">
                    {totalResources}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="current" className="flex items-center justify-center text-xs sm:text-sm px-1 sm:px-3 h-auto py-2">
                  <span className="mr-1">Atuais</span>
                  <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0">
                    {currentResources}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="archived" className="flex items-center justify-center text-xs sm:text-sm px-1 sm:px-3 h-auto py-2">
                  <span className="mr-1">Arquivo</span>
                  <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0">
                    {archivedResources}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Results section - Mobile optimized */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">
              Resultados <span className="text-foreground/70">({filteredResources.length})</span>
            </h3>
          </div>

          <div className="space-y-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((file, index) => (
                <motion.div
                  key={file.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="fancy-card p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-lg sm:text-xl font-playfair font-semibold">
                          {file.name}
                        </h2>
                        {file.isArchive && (
                          <Badge variant="outline" className="bg-muted/50 text-foreground/70">
                            <Clock className="h-3 w-3 mr-1" /> Arquivo
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground/70 text-sm mb-3">
                        {file.description}
                      </p>
                      <div className="flex items-center text-sm text-foreground/60 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {file.date}
                        </span>
                        <span className="flex items-center">
                          <FileDown className="h-4 w-4 mr-1" />
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="sm:ml-4 w-full sm:w-auto" asChild>
                      <a href={file.url} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 text-foreground/70 fancy-card">
                <FileText className="h-12 w-12 mx-auto mb-3 text-foreground/30" />
                <p className="text-lg mb-2">Nenhum documento encontrado</p>
                <p className="text-sm mb-4">
                  {searchTerm ? 
                    `Nenhum resultado para "${searchTerm}"` : 
                    `Nenhum documento ${
                      activeFilter === 'all' ? '' : 
                      activeFilter === 'current' ? 'atual' : 'arquivado'
                    } disponível.`
                  }
                </p>
                {(searchTerm || activeFilter !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    <FilterX className="h-4 w-4 mr-2" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}