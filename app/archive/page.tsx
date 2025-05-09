"use client";

import { motion } from 'framer-motion';
import { FileDown, FileText, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { archiveFiles } from '@/data/archive';

export default function ArchivePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <FileText className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Arquivo de Documentos
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Aceda aos documentos históricos e materiais importantes da Praxe UTAD
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {archiveFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="fancy-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-playfair font-semibold mb-2">
                      {file.name}
                    </h2>
                    <p className="text-foreground/70 text-sm mb-3">
                      {file.description}
                    </p>
                    <div className="flex items-center text-sm text-foreground/60 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(file.date).toLocaleDateString('pt-PT')}
                      </span>
                      <span className="flex items-center">
                        <FileDown className="h-4 w-4 mr-1" />
                        {file.size}
                      </span>
                      <span className="text-primary font-medium">
                        {file.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="ml-4" asChild>
                    <a href={file.url} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}